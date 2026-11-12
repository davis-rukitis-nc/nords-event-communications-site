import fs from "node:fs"
import path from "node:path"
import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres"
import { partnerLogos } from "../../lib/data/legacy/partners-data"

/**
 * Data migration: the partner SVGs were 150×150 squares with the artwork floating in the middle,
 * so logos rendered tiny. public/partners/ now holds versions cropped to the artwork; this swaps
 * the file of each imported partner logo for its cropped version (new file name, so no stale
 * caches). Logos replaced in the CMS since (not square, or not one of ours) are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: "partners", depth: 1, limit: 500, req, overrideAccess: true })
  let replaced = 0
  for (const partner of docs) {
    const logo = partner.logo
    if (!logo || typeof logo !== "object" || logo.mimeType !== "image/svg+xml") continue
    if (!logo.width || logo.width !== logo.height) continue
    const source = partnerLogos.find((p) => p.name === partner.name)?.logo
    // Runs during `payload migrate` in the build; keep the bundler from tracing public/ into functions.
    const file = source && path.join(/* turbopackIgnore: true */ process.cwd(), "public", source)
    if (!file || !fs.existsSync(file)) continue
    await payload.update({
      collection: "media",
      id: logo.id,
      data: {},
      filePath: file,
      req,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    replaced++
  }
  payload.logger.info(`Partner logos replaced with cropped versions: ${replaced}`)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the previous files were only padded versions of the same artwork.
}
