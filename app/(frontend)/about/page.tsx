import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"
import { getAboutPage } from "@/lib/cms"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.about)

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((p, i) => (
        <p key={i} className="text-base text-secondary-dark leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

export default async function AboutPage() {
  const page = await getAboutPage()
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "About", url: "https://www.necom.lv/about" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <div className="bg-white">
        <PageHeader
          title={page.title}
          subtitle={page.subtitle}
          imageUrl={page.headerImage}
        />
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-primary-dark mb-6">{page.missionHeading}</h2>
              <p className="text-lg text-secondary-dark leading-relaxed">{page.missionText}</p>
              {page.missionTagline && (
                <p className="text-lg text-secondary-dark leading-relaxed italic">{page.missionTagline}</p>
              )}
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">{new Date().getFullYear() - 1999}+ years</div>
                <p className="text-secondary-dark">in the industry </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">100K+</div>
                <p className="text-secondary-dark">Annual Participants</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">€20M+</div>
                <p className="text-secondary-dark">Annual Economic Impact</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">10</div>
                <p className="text-secondary-dark">
                  People on the team <span className="block text-xs text-neutral-500">(+2 dogs)</span>
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-primary-dark mb-4">{page.whatWeDoHeading}</h3>
              <Paragraphs items={page.whatWeDo} />
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary-dark mb-4">{page.approachHeading}</h3>
              <Paragraphs items={page.approach} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
