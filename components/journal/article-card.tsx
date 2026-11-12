import Link from "next/link"
import Image from "next/image"
import type { JournalArticle } from "@/lib/cms/types"
import { formatArticleDate } from "@/lib/cms/format"

interface ArticleCardProps {
  article: JournalArticle
  /** Compact cards (home) hide the excerpt. */
  compact?: boolean
  sizes?: string
  headingLevel?: "h2" | "h3"
}

export default function ArticleCard({
  article,
  compact = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  headingLevel: Heading = "h3",
}: ArticleCardProps) {
  return (
    <Link href={`/journal/${article.id}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={article.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes={sizes}
        />
      </div>
      <div className="pt-4">
        <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-subtle">
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        </p>
        <Heading className="text-base font-semibold leading-snug text-neutral-950 underline-offset-4 decoration-1 group-hover:underline md:text-lg">
          {article.title}
        </Heading>
        {!compact && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>}
        {article.tags.length > 0 && (
          <p className="mt-3 text-xs text-subtle">{article.tags.slice(0, 2).join(" · ")}</p>
        )}
      </div>
    </Link>
  )
}
