import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import sharp from "sharp"

import { Users } from "./cms/collections/Users"
import { Media } from "./cms/collections/Media"
import { Journal } from "./cms/collections/Journal"
import { CalendarEvents } from "./cms/collections/CalendarEvents"
import { Events } from "./cms/collections/Events"
import { Partners } from "./cms/collections/Partners"
import { migrations } from "./cms/migrations"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const INITIAL_ADMIN_EMAIL = "marathon.data@necom.lv"
const IS_PREVIEW = process.env.VERCEL_ENV === "preview"

/**
 * Neon's URLs use sslmode=require. The Postgres driver already treats that as full certificate
 * verification but warns that the next major version will weaken it. Say verify-full explicitly:
 * same behaviour today, no warning, and it stays strict after future driver upgrades.
 */
function databaseUrl(url = "") {
  return url.replace(/([?&]sslmode=)(require|prefer|verify-ca)\b/, "$1verify-full")
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · NECom CMS" },
    // Built-in avatar instead of Gravatar, so no email hashes are sent to a third party.
    avatar: "default",
    dateFormat: "d MMM yyyy, HH:mm",
  },
  collections: [Journal, CalendarEvents, Events, Partners, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl(process.env.DATABASE_URL) },
    // Schema changes ship as committed migrations; production never auto-pushes.
    push: false,
    migrationDir: path.resolve(dirname, "cms/migrations"),
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Locally (no token) files are stored on disk instead.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Keep the database schema identical with and without Blob (local dev has no token).
      alwaysInsertFields: true,
      collections: {
        media: {
          // Serve files straight from Vercel's CDN instead of through a function on every view.
          disablePayloadAccessControl: true,
          // Previews share the Blob store with production: keep their uploads in their own folder
          // so a test upload can never overwrite a live image with the same name.
          ...(IS_PREVIEW ? { prefix: "preview" } : {}),
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // No random suffix: Payload already makes filenames unique per database, and with a suffix
      // the stored URL did not match the uploaded object (images 404'd).
      addRandomSuffix: false,
    }),
  ],
  async onInit(payload) {
    // Public sign-up is disabled. If there are no users yet, create the first admin from
    // PAYLOAD_INITIAL_ADMIN_PASSWORD. Remove that variable once the password has been changed.
    const password = process.env.PAYLOAD_INITIAL_ADMIN_PASSWORD
    if (!password) return
    const { totalDocs } = await payload.count({ collection: "users", overrideAccess: true })
    if (totalDocs > 0) return
    await payload.create({
      collection: "users",
      data: { email: INITIAL_ADMIN_EMAIL, password, name: "NECom" },
      overrideAccess: true,
      context: { allowSystemCreate: true },
    })
    payload.logger.info(`Created the first admin account (${INITIAL_ADMIN_EMAIL}).`)
  },
})
