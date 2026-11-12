// Server-side content access. Pages are statically generated and refreshed when content
// changes in the admin (see cms/hooks/revalidate.ts) and at least hourly for date logic.
import { cache } from "react"
import { getPayload } from "payload"
import config from "@payload-config"
import type { Media } from "@/payload-types"
import type { CalendarEvent } from "@/lib/data/calendar"
import type { Event, JournalArticle, Partner } from "./types"

export type { Event, JournalArticle, Partner } from "./types"

const getCMS = cache(() => getPayload({ config }))

const mediaUrl = (m: number | Media | null | undefined) => (m && typeof m === "object" ? (m.url ?? "") : "")
const mediaAlt = (m: number | Media | null | undefined) => (m && typeof m === "object" ? (m.alt ?? "") : "")
const opt = <T,>(v: T | null | undefined) => (v === null ? undefined : v)

// ---------------------------------------------------------------- events

export const getEvents = cache(async (): Promise<Event[]> => {
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: "events", sort: "_order", limit: 100, depth: 1 })
  return docs.map((d) => ({
    id: d.slug,
    slug: d.slug,
    name: d.name,
    type: d.type,
    description: d.description,
    image: mediaUrl(d.image),
    imageAlt: mediaAlt(d.image),
    logo: mediaUrl(d.logo) || undefined,
    startDate: opt(d.startDate),
    yearStarted: opt(d.yearStarted),
    annualParticipants: opt(d.annualParticipants),
    youtubeUrl: opt(d.youtubeUrl),
    officialSiteUrl: opt(d.officialSiteUrl),
    longDescription: opt(d.longDescription),
    brandColors: d.brandColors ?? undefined,
    socialMedia: d.socialMedia ?? undefined,
    showInNavigation: d.showInNavigation !== false,
    showOnHomepage: d.showOnHomepage !== false,
    isOneTimeEvent: Boolean(d.isOneTimeEvent),
  }))
})

export async function getEvent(slug: string) {
  return (await getEvents()).find((e) => e.slug === slug)
}

export async function getNavigationEvents() {
  return (await getEvents()).filter((e) => e.showInNavigation !== false)
}

export async function getHomepageEvents() {
  return (await getEvents()).filter((e) => e.showOnHomepage !== false)
}

// ---------------------------------------------------------------- calendar

export const getCalendarEvents = cache(async (): Promise<CalendarEvent[]> => {
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: "calendar-events", sort: "start", limit: 500, depth: 0 })
  return docs.map((d) => ({
    id: String(d.id),
    name: d.name,
    start: d.start,
    end: opt(d.end),
    allDay: Boolean(d.allDay),
    venue: opt(d.venue),
    description: opt(d.description),
    series: d.series,
    link: opt(d.link),
    soldOut: Boolean(d.soldOut),
    isToBeAnnounced: Boolean(d.isToBeAnnounced),
  }))
})

// ---------------------------------------------------------------- partners

export const getPartners = cache(async (): Promise<Partner[]> => {
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: "partners", sort: "_order", limit: 200, depth: 1 })
  return docs.map((d) => ({ name: d.name, logo: mediaUrl(d.logo), link: opt(d.link) }))
})

// ---------------------------------------------------------------- journal

export const getArticles = cache(async (): Promise<JournalArticle[]> => {
  const payload = await getCMS()
  const { docs } = await payload.find({
    collection: "journal",
    sort: "-date",
    limit: 500,
    depth: 2,
    where: { _status: { equals: "published" } },
  })
  return docs.map((d) => ({
    id: d.slug,
    date: d.date.slice(0, 10),
    category: d.category,
    title: d.title,
    tags: (d.tags as string[] | null) ?? [],
    image: mediaUrl(d.image),
    excerpt: d.excerpt,
    content: d.content as JournalArticle["content"],
  }))
})

export async function getArticle(slug: string) {
  return (await getArticles()).find((a) => a.id === slug)
}

export async function getLatestArticles(limit: number) {
  return (await getArticles()).slice(0, limit)
}
