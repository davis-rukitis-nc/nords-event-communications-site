"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSortedArticles } from "@/lib/data/journal-data"

export default function NewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const latestArticles = getSortedArticles(4)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
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
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap mt-2 sm:mt-0"
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
              className={`rounded-xl overflow-hidden transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
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
                    src={article.image || "/placeholder.svg"}
                    alt={article.title || "Article image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-3 px-0">
                  <div className="flex items-center text-xs text-gray-500 mb-2 uppercase tracking-wide">
                    <span>{article.category}</span>
                    <span className="mx-1">|</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">{article.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 uppercase tracking-wide"
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
