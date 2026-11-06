import type { Metadata } from "next"
import { getSortedArticles } from "@/lib/data/journal-data"
import ArticleCard from "@/components/journal/article-card"
import PageHeader from "@/components/layout/page-header"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.journal)

export default function JournalPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Journal", url: "https://www.necom.lv/journal" },
  ])

  const sortedArticles = getSortedArticles()

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <div className="bg-white">
        <PageHeader
          title="Journal"
          subtitle="Insights, stories, and news from the world of Nords Event Communications."
          imageUrl="/images/pages/journal-header.jpg"
        />

        <div className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {sortedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} headingLevel="h2" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
