import type { MetadataRoute } from "next"
import { getArticles, getEvents } from "@/lib/cms"

export const revalidate = 3600

const baseUrl = "https://www.necom.lv"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [displayEvents, journalArticles] = await Promise.all([getEvents(), getArticles()])
  const latestArticle = journalArticles.map((a) => a.date).sort().at(-1)

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/events`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/journal`, lastModified: latestArticle, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const eventPages: MetadataRoute.Sitemap = displayEvents.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const journalPages: MetadataRoute.Sitemap = journalArticles.map((article) => ({
    url: `${baseUrl}/journal/${article.id}`,
    lastModified: article.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticPages, ...eventPages, ...journalPages]
}
