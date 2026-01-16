import Link from "next/link"
import Image from "next/image"
import type { JournalArticle } from "@/lib/data/journal-data"

interface ArticleCardProps {
  article: JournalArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/journal/${article.id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={`Image for ${article.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 bg-gray-50">
          <div className="flex items-center text-xs text-gray-500 mb-2 uppercase tracking-wide">
            <span>{article.category}</span>
            <span className="mx-2">|</span>
            <span>{article.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">{article.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-gray-800 bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
