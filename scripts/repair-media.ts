/**
 * Repairs Media records whose Blob URL returns 404 by uploading the original file
 * (from public/) to exactly the URL stored in the record.
 *
 * Why: the first deploys uploaded with `addRandomSuffix`, so files landed under
 * suffixed names while the records kept the plain URL. Runs in every build and is a
 * no-op once every image resolves. Never changes database records.
 */
import fs from "node:fs"
import path from "node:path"
import { put } from "@vercel/blob"
import { getPayload } from "payload"
import config from "@payload-config"

const token = process.env.BLOB_READ_WRITE_TOKEN
const PUBLIC_DIR = path.resolve(process.cwd(), "public")

function indexPublicFiles(dir: string, index = new Map<string, string>()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) indexPublicFiles(full, index)
    else if (!index.has(entry.name)) index.set(entry.name, full)
  }
  return index
}

const mimeByExt: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
}

async function main() {
  if (!token) {
    console.log("Media repair skipped: no BLOB_READ_WRITE_TOKEN (local storage).")
    process.exit(0)
  }
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: "media", limit: 1000, depth: 0, overrideAccess: true })
  const files = indexPublicFiles(PUBLIC_DIR)

  let ok = 0
  let repaired = 0
  const missing: string[] = []
  for (const doc of docs) {
    const url = doc.url
    if (!url || !url.startsWith("https://")) continue
    const head = await fetch(url, { method: "HEAD" })
    if (head.ok) {
      ok++
      continue
    }
    const filename = doc.filename ?? path.posix.basename(new URL(url).pathname)
    const local = files.get(filename)
    if (!local) {
      missing.push(filename)
      continue
    }
    const pathname = decodeURIComponent(new URL(url).pathname.replace(/^\/+/, ""))
    await put(pathname, fs.readFileSync(local), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: doc.mimeType ?? mimeByExt[path.extname(filename).toLowerCase()],
      token,
    })
    repaired++
  }

  payload.logger.info(`Media check: ${ok} ok, ${repaired} repaired, ${missing.length} without a local original.`)
  if (missing.length) payload.logger.warn(`No local original for: ${missing.join(", ")}`)
  process.exit(0)
}

try {
  await main()
} catch (err) {
  // Never block a deploy on the repair step.
  console.error("Media repair failed:", err)
  process.exit(0)
}
