import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { marked } from "marked"
import { journalArticles } from "@/lib/data/journal-data"
import NewsSection from "@/components/sections/news-section"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

marked.setOptions({
  gfm: true,
  breaks: true,
})

interface JournalArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.id,
  }))
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = journalArticles.find((a) => a.id === slug)

  if (!article) {
    return {
      title: "Article Not Found",
      robots: "noindex, nofollow",
    }
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    keywords: [...article.tags, "news", "insights", "events"],
    image: article.image,
    url: `/journal/${article.id}`,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.date,
    section: article.category,
    tags: article.tags,
  })
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params
  const article = journalArticles.find((a) => a.id === slug)

  if (!article) {
    notFound()
  }

  const articleStructuredData = generateArticleStructuredData(article)
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Journal", url: "https://www.necom.lv/journal" },
    { name: article.title, url: `https://www.necom.lv/journal/${article.id}` },
  ])

  const contentHtml = await marked.parse(article.content)

  return (
    <>
      <StructuredData data={[articleStructuredData, breadcrumbData]} />
      <main className="bg-white">
        <header className="relative w-full h-[50vh] md:h-[60vh] rounded-b-2xl overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 w-full text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">{article.category}</p>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">{article.title}</h1>
            </div>
          </div>
        </header>

        <article className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-6 text-sm text-secondary-dark mb-8 border-b pb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>{article.tags.join(", ")}</span>
            </div>
          </div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        <div className="bg-gray-50">
          <NewsSection />
        </div>
      </main>
    </>
  )
}
