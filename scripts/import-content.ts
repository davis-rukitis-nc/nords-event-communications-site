/**
 * One-time import of the site's existing content into Payload.
 *
 *   pnpm seed            # imports into an empty database
 *   IMPORT_FORCE=1 pnpm seed   # deletes CMS content first (not users), then imports
 *
 * The build runs it with IMPORT_IF_EMPTY=1: it imports only into an empty database
 * (first preview / first production deploy) and never touches existing content.
 *
 * Reads the former TypeScript data files in lib/data/ and the images in public/,
 * uploads every image once to the Media collection (Vercel Blob in production)
 * and converts journal Markdown/HTML into the rich-text editor format.
 */
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { marked, type Token, type Tokens } from "marked"
import { getPayload, type Payload } from "payload"
import config from "@payload-config"
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical"

import { displayEvents } from "../lib/data/legacy/events-data"
import { partnerLogos } from "../lib/data/legacy/partners-data"
import { calendarEvents } from "../lib/data/legacy/calendar"
import { journalArticles } from "../lib/data/legacy/journal-data"
import { privacyDefaults, termsDefaults } from "../lib/cms/page-defaults"

const PUBLIC_DIR = path.resolve(process.cwd(), "public")
const force = process.argv.includes("--force") || process.env.IMPORT_FORCE === "1"
const ctx = { disableRevalidate: true }

// ---------------------------------------------------------------- media

const mediaCache = new Map<string, { id: number; url: string }>()

async function uploadImage(payload: Payload, publicPath: string, alt = "") {
  const clean = decodeURIComponent(publicPath.split("?")[0])
  const cached = mediaCache.get(clean)
  if (cached) return cached
  const filePath = path.join(PUBLIC_DIR, clean)
  if (!fs.existsSync(filePath)) throw new Error(`Image not found: ${filePath}`)
  const doc = await payload.create({ collection: "media", data: { alt }, filePath, context: ctx, overrideAccess: true })
  const entry = { id: doc.id as number, url: doc.url as string }
  mediaCache.set(clean, entry)
  return entry
}

// ---------------------------------------------------------------- rich text

type Node = Record<string, unknown> & { type: string; children?: Node[] }

const blockId = () => crypto.randomBytes(12).toString("hex")

async function rewriteHtmlImages(payload: Payload, html: string) {
  const srcs = [...html.matchAll(/src="(\/images\/[^"]+)"/g)].map((m) => m[1])
  let out = html
  for (const src of srcs) {
    const media = await uploadImage(payload, src)
    out = out.replaceAll(`src="${src}"`, `src="${media.url}"`)
  }
  return out
}

function rawHtmlBlock(html: string): Node {
  return {
    type: "block",
    version: 2,
    format: "",
    fields: { id: blockId(), blockName: "", blockType: "rawHtml", html: html.trim() },
  }
}

function uploadNode(mediaId: number): Node {
  return { type: "upload", version: 3, format: "", id: blockId(), fields: null, relationTo: "media", value: mediaId }
}

// The Markdown converter keeps the padding spaces of table cells (" Riga "); trim them.
function trimTableCells(nodes: Node[], inCell = false) {
  for (const n of nodes) {
    const cell = inCell || n.type === "tablecell"
    if (cell && n.type === "text" && typeof n.text === "string") n.text = n.text.trim()
    if (n.children) trimTableCells(n.children, cell)
  }
}

// Markdown hard breaks (a line ending in "\\") arrive as U+2028 and become editor line breaks.
const LINE_BREAK = "\u2028"
function splitLineBreaks(nodes: Node[]) {
  for (const n of nodes) {
    if (!n.children) continue
    n.children = n.children.flatMap((c) =>
      c.type === "text" && typeof c.text === "string" && c.text.includes(LINE_BREAK)
        ? c.text.split(LINE_BREAK).flatMap((text, i) => [
            ...(i > 0 ? [{ type: "linebreak", version: 1 } as Node] : []),
            ...(text ? [{ ...c, text }] : []),
          ])
        : [c],
    )
    splitLineBreaks(n.children)
  }
}

async function markdownToLexical(
  payload: Payload,
  markdown: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any = payload.collections.journal.config.fields.find((f) => "name" in f && f.name === "content"),
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorConfig = await editorConfigFactory.fromField({ field: field as any })
  const md = (src: string): Node[] =>
    (convertMarkdownToLexical({ editorConfig, markdown: src }).root.children as unknown as Node[]) ?? []

  const children: Node[] = []
  let pending: string[] = []
  const flush = () => {
    const src = pending.join("")
    pending = []
    if (!src.trim()) return
    // Drop empty paragraphs the converter creates from blank lines.
    children.push(...md(src).filter((n) => !(n.type === "paragraph" && !n.children?.length)))
  }

  for (const token of marked.lexer(markdown) as Token[]) {
    if (token.type === "html") {
      flush()
      children.push(rawHtmlBlock(await rewriteHtmlImages(payload, token.raw)))
      continue
    }
    // A paragraph that is only an image becomes an image node in the editor.
    if (token.type === "paragraph") {
      const inline = (token as Tokens.Paragraph).tokens.filter((t) => !(t.type === "text" && !t.raw.trim()))
      if (inline.length === 1 && inline[0].type === "image") {
        flush()
        const img = inline[0] as Tokens.Image
        const media = await uploadImage(payload, img.href, img.text)
        children.push(uploadNode(media.id))
        continue
      }
      // Paragraphs with inline HTML are kept as HTML.
      if ((token as Tokens.Paragraph).tokens.some((t) => t.type === "html")) {
        flush()
        children.push(rawHtmlBlock(await rewriteHtmlImages(payload, marked.parse(token.raw) as string)))
        continue
      }
    }
    // Quotes: quote text, then a line break, then the attribution (Lexical quotes are a single block).
    if (token.type === "blockquote") {
      flush()
      const paras = (token as Tokens.Blockquote).tokens.filter((t) => t.type === "paragraph") as Tokens.Paragraph[]
      const inner: Node[] = []
      paras.forEach((p, i) => {
        if (i > 0) inner.push({ type: "linebreak", version: 1 }, { type: "linebreak", version: 1 })
        const para = md(p.raw)[0]
        inner.push(...(para?.children ?? []))
      })
      children.push({ type: "quote", version: 1, format: "", indent: 0, direction: null, children: inner })
      continue
    }
    pending.push(token.raw)
  }
  flush()
  trimTableCells(children)

  return {
    root: { type: "root", version: 1, format: "", indent: 0, direction: null, children },
  }
}

// ---------------------------------------------------------------- import

const normaliseCategory = (c: string) => (c === "Food & Drink" ? "Food & Drinks" : c)

// ---------------------------------------------------------------- pages

/** Fills Privacy and Terms with the launch texts while they are still empty (or on IMPORT_FORCE). */
async function seedLegalPages(payload: Payload) {
  for (const [slug, defaults] of [
    ["privacy-page", privacyDefaults],
    ["terms-page", termsDefaults],
  ] as const) {
    const current = await payload.findGlobal({ slug, depth: 0, overrideAccess: true })
    const hasContent = Boolean((current.content as { root?: { children?: unknown[] } } | null)?.root?.children?.length)
    if (hasContent && !force) continue
    const field = payload.globals.config.find((g) => g.slug === slug)?.fields.find((f) => "name" in f && f.name === "content")
    const content = await markdownToLexical(payload, defaults.markdown.replace(/\\\n/g, LINE_BREAK), field)
    splitLineBreaks(content.root.children)
    await payload.updateGlobal({
      slug,
      data: {
        title: defaults.title,
        subtitle: defaults.subtitle,
        lastUpdated: new Date(`${defaults.lastUpdated}T12:00:00Z`).toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: content as any,
      },
      overrideAccess: true,
      context: ctx,
    })
    payload.logger.info(`Page imported: ${defaults.title}`)
  }
}

async function main() {
  const payload = await getPayload({ config })
  await seedLegalPages(payload)

  const existing = await payload.count({ collection: "journal", overrideAccess: true })
  if (existing.totalDocs > 0 && process.env.IMPORT_IF_EMPTY === "1") {
    payload.logger.info("Content import skipped: the CMS already has content.")
    process.exit(0)
  }
  if (existing.totalDocs > 0 && !force) {
    payload.logger.error("The CMS already has content. Run with IMPORT_FORCE=1 to wipe CMS content (not users) and re-import.")
    process.exit(1)
  }
  if (force) {
    for (const collection of ["journal", "calendar-events", "events", "partners", "media"] as const) {
      await payload.delete({ collection, where: { id: { exists: true } }, overrideAccess: true, context: ctx })
    }
  }

  // Partners
  for (const p of partnerLogos) {
    const logo = await uploadImage(payload, p.logo, `${p.name} logo`)
    await payload.create({
      collection: "partners",
      data: { name: p.name, logo: logo.id, link: p.link },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`Partners: ${partnerLogos.length}`)

  // Event series
  for (const e of displayEvents) {
    const image = await uploadImage(payload, e.image, "")
    const logo = e.logo ? await uploadImage(payload, e.logo, `${e.name} logo`) : undefined
    await payload.create({
      collection: "events",
      data: {
        name: e.name,
        slug: e.slug,
        type: e.type as "Sports",
        description: e.description,
        longDescription: e.longDescription,
        image: image.id,
        logo: logo?.id,
        yearStarted: e.yearStarted,
        annualParticipants: e.annualParticipants,
        youtubeUrl: e.youtubeUrl,
        officialSiteUrl: e.officialSiteUrl,
        brandColors: e.brandColors,
        socialMedia: e.socialMedia,
        startDate: e.startDate ? new Date(e.startDate).toISOString() : undefined,
        showInNavigation: e.showInNavigation !== false,
        showOnHomepage: e.showOnHomepage !== false,
        isOneTimeEvent: Boolean(e.isOneTimeEvent),
      },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`Event series: ${displayEvents.length}`)

  // Calendar
  for (const c of calendarEvents) {
    await payload.create({
      collection: "calendar-events",
      data: {
        name: c.name,
        start: new Date(c.start).toISOString(),
        start_tz: "Europe/Riga",
        end: c.end ? new Date(c.end).toISOString() : undefined,
        end_tz: c.end ? "Europe/Riga" : undefined,
        allDay: Boolean(c.allDay),
        venue: c.venue,
        description: c.description,
        series: c.series,
        link: c.link,
        soldOut: Boolean(c.soldOut),
        isToBeAnnounced: Boolean(c.isToBeAnnounced),
      },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`Calendar entries: ${calendarEvents.length}`)

  // Journal
  for (const a of journalArticles) {
    const image = await uploadImage(payload, a.image, "")
    const content = await markdownToLexical(payload, a.content)
    await payload.create({
      collection: "journal",
      data: {
        title: a.title,
        slug: a.id,
        date: new Date(`${a.date}T12:00:00Z`).toISOString(),
        category: normaliseCategory(a.category) as "Sports",
        image: image.id,
        excerpt: a.excerpt,
        tags: a.tags,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: content as any,
        _status: "published",
      },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`Journal articles: ${journalArticles.length}`)
  payload.logger.info(`Images uploaded: ${mediaCache.size}`)
  process.exit(0)
}

try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
