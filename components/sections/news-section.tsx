import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSortedArticles } from "@/lib/data/journal-data"

export default function NewsSection() {

  const latestArticles = getSortedArticles(4)


  return (
    <section
      className={`py-16 md:py-24`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-foreground mb-4 text-2xl lg:text-3xl">Journal</h2>
            <p className="text-muted-foreground max-w-2xl text-sm">
              {"Stay updated with the latest insights and stories from our events!"}
            </p>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors whitespace-nowrap mt-2 sm:mt-0"
          >
            Read All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Static Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article, index) => (
            <div
              key={article.id}
              className={`rounded-xl overflow-hidden transition-opacity duration-500`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Link
                href={`/journal/${article.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <div className="relative aspect-[4/2.5] overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title || "Article image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-3 px-0">
                  <div className="flex items-center text-xs text-neutral-500 mb-2 uppercase tracking-wide">
                    <span>{article.category}</span>
                    <span className="mx-1">|</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2 leading-snug">{article.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-800 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
