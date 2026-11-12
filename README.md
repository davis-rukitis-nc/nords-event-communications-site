# NECom — Nords Event Communications

Website for NECom, an event agency in Riga. Live at [necom.lv](https://www.necom.lv).

## Stack

- Next.js 16 (App Router, statically generated pages) · React 19 · TypeScript
- **Payload CMS 3** inside the same app: admin panel at `/admin`, content in **Neon Postgres** (Frankfurt), images on **Vercel Blob** (Frankfurt)
- Tailwind CSS 4 — tokens live in `app/(frontend)/globals.css`
- Vercel hosting (functions in `fra1`), Vercel Web Analytics + Speed Insights (cookieless, so no consent banner)
- Vitest (unit) and Playwright (e2e); CI in `.github/workflows/ci.yml`

## Editing content

Log in at **necom.lv/admin**. Everything below is edited there; publishing refreshes the live site within seconds.

| Section | What it controls |
|---|---|
| **Journal** | Articles. Drafts autosave; “Publish changes” makes them live. Tables, images and “HTML blocks” for custom layouts are available in the editor. |
| **Calendar** | Dated events for the /events calendar, the countdown and the footer. Past entries disappear by themselves. |
| **Event series** | The pages under /events, the Events menu and the home-page list. Drag rows to reorder. |
| **Partners** | The “Trusted By” logos. Drag rows to reorder. |
| **Media** | All uploaded images. Add alt text for accessibility. |
| **Pages** | Texts and header photos of About, Contact, Privacy Policy and Terms of Service. |
| **Users** | Admin accounts. There is no public sign-up; an existing admin adds new users here. |

Still in code (bespoke design): the hero, “By the Numbers”, the records board and the number blocks on About and Contact.

## Getting started

Requires Node 22+, pnpm 10 and Docker (for a local Postgres).

```bash
docker run -d --name necom-pg -e POSTGRES_PASSWORD=localdev -e POSTGRES_DB=necom -p 5432:5432 postgres:17-alpine
```

Create `.env` (git-ignored):

```
DATABASE_URL=postgres://postgres:localdev@127.0.0.1:5432/necom
PAYLOAD_SECRET=<any long random string>
PAYLOAD_INITIAL_ADMIN_PASSWORD=<password for marathon.data@necom.lv on first start>
```

```bash
pnpm install
pnpm build        # migrates the database, imports the content if empty, builds
pnpm dev          # http://localhost:3000, admin at /admin
```

Without `BLOB_READ_WRITE_TOKEN`, uploads are stored in `./media` locally.

| Script | |
|---|---|
| `pnpm build` | `payload migrate` → content import if the database is empty → `next build` |
| `pnpm migrate:create <name>` | Create a migration after changing collections in `cms/` |
| `pnpm generate:types` / `generate:importmap` | Regenerate `payload-types.ts` / the admin import map after config changes |
| `pnpm seed` | Import the original content (refuses if content exists; `IMPORT_FORCE=1` wipes CMS content first) |
| `pnpm lint` / `type-check` / `test:unit` / `test:e2e` | Checks (e2e runs against `pnpm start`, build first) |

## Environment variables (Vercel)

| Name | Set by | Purpose |
|---|---|---|
| `DATABASE_URL` (+ `DATABASE_*`) | Neon integration | Postgres connection. Preview deployments get their own database branch. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Image uploads |
| `PAYLOAD_SECRET` | Manually | Signs admin logins. Rotating it logs everyone out. |
| `PAYLOAD_INITIAL_ADMIN_PASSWORD` | Manually, temporarily | Creates `marathon.data@necom.lv` on an empty database. Delete it after the first login and password change. |

## Where things live

```
app/(frontend)/          the public site (own root layout)
app/(payload)/           Payload admin + REST API (generated, don't edit)
cms/collections/         CMS schema: Journal, CalendarEvents, Events, Partners, Media, Users
cms/globals/             single pages: About, Contact, Privacy, Terms
cms/migrations/          database migrations (commit them)
payload.config.ts        Payload config: Postgres, Blob storage, first-admin bootstrap
lib/cms/                 server-side content queries used by pages
lib/data/calendar.ts     calendar helpers (filtering, formatting, countdown)
lib/data/legacy/         the original content files, kept as the import source
scripts/import-content.ts  one-time content import (also fills Privacy/Terms while empty)
scripts/media-maintenance.ts  build step: repairs missing Blob files, removes leftover copies
lib/cms/page-defaults.ts the launch texts of the fixed pages (defaults/fallback)
components/              UI components
public/                  static assets (hero video, partner SVGs, legacy images)
```

## Changing the CMS schema

1. Edit a collection in `cms/collections/` (or a global in `cms/globals/`).
2. `pnpm generate:types && pnpm generate:importmap`
3. `pnpm migrate:create <short-name>` and commit the new file in `cms/migrations/`.
4. Deploys run the migration automatically before building.

## Hero video

Re-encode from a master with:

```bash
ffmpeg -i master.mp4 -an -c:v libx264 -preset slower -tune film -crf 24 -maxrate 2.2M -bufsize 4.4M -pix_fmt yuv420p -movflags +faststart public/video/hero-1080.mp4
```

```bash
ffmpeg -i master.mp4 -an -vf scale=-2:720 -c:v libx264 -preset slower -tune film -crf 25 -maxrate 1.2M -bufsize 2.4M -pix_fmt yuv420p -movflags +faststart public/video/hero-720.mp4
```

## License

Proprietary. All rights reserved by Nords Event Communications.
