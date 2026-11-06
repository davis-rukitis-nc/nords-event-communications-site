import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSortedArticles } from "@/lib/data/journal-data"
import ArticleCard from "@/components/journal/article-card"

export default function NewsSection({ excludeId }: { excludeId?: string }) {
  const latestArticles = getSortedArticles(5)
    .filter((a) => a.id !== excludeId)
    .slice(0, 4)

  return (
    <section aria-labelledby="journal-latest" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <h2 id="journal-latest" className="mb-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Journal
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              {"Stay updated with the latest insights and stories from our events!"}
            </p>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-neutral-950 underline-offset-4 hover:underline"
          >
            Read All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} compact sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
          ))}
        </div>
      </div>
    </section>
  )
}
