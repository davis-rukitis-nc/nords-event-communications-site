/**
 * Media upkeep, run in every build. Never changes database records and never fails a build.
 *
 * 1. Repair: a Media record whose Blob URL returns 404 gets the original file (from public/)
 *    uploaded to exactly the URL stored in the record.
 * 2. Cleanup (production only): the first deploys uploaded with `addRandomSuffix`, leaving
 *    copies like `photo-AbC123…xyz.jpg` next to the `photo.jpg` the record uses. Those copies
 *    are deleted. Only names that are a used file plus a random suffix are touched; preview/
 *    files and anything else are left alone (and listed in the log).
 *
 * Both steps are no-ops once everything is in order.
 */
import fs from "node:fs"
import path from "node:path"
import { del, list, put } from "@vercel/blob"
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

const blobPath = (url: string) => decodeURIComponent(new URL(url).pathname.replace(/^\/+/, ""))

// `photo-<random suffix>.jpg` → `photo.jpg`. Vercel's random suffixes are long alphanumeric strings.
const withoutSuffix = (pathname: string) => pathname.replace(/-[A-Za-z0-9]{20,40}(\.[A-Za-z0-9]+)$/, "$1")

async function removeSuffixedCopies(used: Set<string>) {
  const stale: string[] = []
  const unknown: string[] = []
  let cursor: string | undefined
  do {
    const page = await list({ cursor, limit: 1000, token })
    for (const blob of page.blobs) {
      if (blob.pathname.startsWith("preview/") || used.has(blob.pathname)) continue
      const original = withoutSuffix(blob.pathname)
      if (original !== blob.pathname && used.has(original)) stale.push(blob.url)
      else unknown.push(blob.pathname)
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  for (let i = 0; i < stale.length; i += 100) await del(stale.slice(i, i + 100), { token })
  return { removed: stale.length, unknown }
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

  // In previews, URLs live under preview/; the same file may already exist at the production path.
  const productionUrl = (url: string) => url.replace(/\/preview\//, "/")

  async function check(doc: (typeof docs)[number]) {
    const url = doc.url
    if (!url || !url.startsWith("https://")) return
    if ((await fetch(url, { method: "HEAD" })).ok) {
      ok++
      return
    }
    const filename = doc.filename ?? path.posix.basename(new URL(url).pathname)
    const local = files.get(filename)
    let body: Buffer | undefined = local ? fs.readFileSync(local) : undefined
    if (!body && productionUrl(url) !== url) {
      const res = await fetch(productionUrl(url))
      if (res.ok) body = Buffer.from(await res.arrayBuffer())
    }
    if (!body) {
      missing.push(filename)
      return
    }
    await put(blobPath(url), body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: doc.mimeType ?? mimeByExt[path.extname(filename).toLowerCase()],
      token,
    })
    repaired++
  }

  // Check a few at a time instead of one by one.
  const queue = [...docs]
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      for (let doc = queue.shift(); doc; doc = queue.shift()) await check(doc)
    }),
  )

  payload.logger.info(`Media check: ${ok} ok, ${repaired} repaired, ${missing.length} without a local original.`)
  if (missing.length) payload.logger.warn(`No local original for: ${missing.join(", ")}`)

  if (process.env.VERCEL_ENV === "production") {
    const used = new Set(docs.flatMap((d) => (d.url?.startsWith("https://") ? [blobPath(d.url)] : [])))
    const { removed, unknown } = await removeSuffixedCopies(used)
    payload.logger.info(`Blob cleanup: ${removed} leftover copies removed.`)
    if (unknown.length) payload.logger.info(`Blob files not used by any Media record (kept): ${unknown.join(", ")}`)
  }
  process.exit(0)
}

try {
  await main()
} catch (err) {
  // Never block a deploy on the repair step.
  console.error("Media repair failed:", err)
  process.exit(0)
}
