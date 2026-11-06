# NECom — Nords Event Communications

Website for NECom, an event agency in Riga. Live at [necom.lv](https://www.necom.lv).

## Stack

- Next.js 16 (App Router, static pages revalidated hourly) · React 19 · TypeScript
- Tailwind CSS 4 — tokens live in `app/globals.css`
- Vercel hosting, Vercel Web Analytics + Speed Insights (cookieless, so no consent banner)
- Vitest (unit) and Playwright (e2e); CI in `.github/workflows/ci.yml`

## Getting started

Requires Node 20.9+ and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | |
|---|---|
| `pnpm build` / `pnpm start` | production build / serve |
| `pnpm lint` | ESLint (next/core-web-vitals + TypeScript) |
| `pnpm type-check` | `tsc --noEmit` |
| `pnpm test:unit` | Vitest, files in `__tests__/` |
| `pnpm test:e2e` | Playwright smoke tests against `pnpm start` (build first) |

## Where things live

```
app/                     routes (events/[slug], journal/[slug], about, contact, …)
components/
  sections/              home page sections
  event-detail/          event page parts (header, stats, video facade, …)
  layout/                footer, page header
  journal/               article card
  records-board.tsx      Riga23 seven-segment world-record board
lib/
  data/events-data.ts    event series (pages, nav, cards)
  data/calendar.ts       dated events: calendar, countdown, footer "Upcoming", Event JSON-LD
  data/journal-data.ts   journal articles (Markdown/HTML in `content`)
  data/partners-data.ts  partner logos
  seo/                   metadata helper + JSON-LD
public/
  images/{events,logos,pages,team,journal,hero}/
  video/                 hero video (1080p desktop, 720p mobile)
  partners/              partner logos (SVG)
```

## Common tasks

**Add a dated event** — append to `calendarEvents` in `lib/data/calendar.ts` (Riga time with its UTC offset,
e.g. `2027-04-03T17:00:00+03:00`). It appears in the /events calendar, the countdown and the footer, and
disappears by itself once it has ended. Set `soldOut: true` for the "Sold out" tag, `isToBeAnnounced: true` for TBA.

**Add a journal article** — add an object to `journalArticles` in `lib/data/journal-data.ts`; put images in
`public/images/journal/` and reference them as `/images/journal/<file>`.

**Add an event series page** — add to `displayEvents` in `lib/data/events-data.ts` (image in
`public/images/events/`, logo in `public/images/logos/`); `/events/<slug>` is generated automatically.

**Hero video** — re-encode from a master with:

```bash
ffmpeg -i master.mp4 -an -c:v libx264 -preset slower -tune film -crf 24 -maxrate 2.2M -bufsize 4.4M -pix_fmt yuv420p -movflags +faststart public/video/hero-1080.mp4
```

```bash
ffmpeg -i master.mp4 -an -vf scale=-2:720 -c:v libx264 -preset slower -tune film -crf 25 -maxrate 1.2M -bufsize 2.4M -pix_fmt yuv420p -movflags +faststart public/video/hero-720.mp4
```

## License

Proprietary. All rights reserved by Nords Event Communications.
