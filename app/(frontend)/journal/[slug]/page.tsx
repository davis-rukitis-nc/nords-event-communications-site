import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { getArticle, getArticles } from "@/lib/cms"
import { formatArticleDate } from "@/lib/cms/format"
import ArticleBody from "@/components/journal/article-body"
import NewsSection from "@/components/sections/news-section"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

// Articles published later in the CMS get their page on first visit.
export const dynamicParams = true

interface JournalArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return (await getArticles()).map((article) => ({
    slug: article.id,
  }))
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

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
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const articleStructuredData = generateArticleStructuredData(article)
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Journal", url: "https://www.necom.lv/journal" },
    { name: article.title, url: `https://www.necom.lv/journal/${article.id}` },
  ])

  return (
    <>
      <StructuredData data={[articleStructuredData, breadcrumbData]} />
      <div className="bg-white">
        <header className="relative h-[60svh] min-h-[360px] w-full overflow-hidden rounded-b-2xl bg-neutral-900 md:h-[60vh]">
          <Image src={article.image} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
          <div className="absolute bottom-0 w-full text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-12">
              <p className="text-xs font-medium uppercase tracking-widest text-white/80">{article.category}</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-bold md:text-5xl">{article.title}</h1>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <p className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-neutral-200 pb-4 text-sm text-muted-foreground">
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            {article.tags.length > 0 && <span aria-hidden="true">·</span>}
            {article.tags.length > 0 && <span>{article.tags.join(", ")}</span>}
          </p>
          <ArticleBody content={article.content} />
        </article>

        <div className="border-t border-neutral-200">
          <NewsSection excludeId={article.id} />
        </div>
      </div>
    </>
  )
}
