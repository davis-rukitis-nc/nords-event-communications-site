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
    pool: { connectionString: process.env.DATABASE_URL || "" },
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
      // Serve files straight from Vercel's CDN instead of through a function on every view.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
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
