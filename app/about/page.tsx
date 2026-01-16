import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  ...generatePageMetadata(pageMetaConfigs.about),
  robots: {
    index: false,
    follow: true,
  },
}

export default function AboutPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "About", url: "https://www.necom.lv/about" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <main className="bg-white">
        <PageHeader
          title="About Us"
          subtitle="Nords Event Communications (NECom) is an event production, marketing and sponsorship agency creating experiences that are moving Riga and Latvia - literally and figuratively! Can you keep up?"
          imageUrl="https://rimirigamarathon.com/wp-content/uploads/2025/07/0RK_6989.jpg"
        />
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Our Mission</h2>
              <p className="text-lg text-secondary-dark leading-relaxed">
                Events that move, inspire, elevate Riga and Latvia.
              </p>
              <p className="text-lg text-secondary-dark leading-relaxed italic">Notikumi, kas (ie)kustina Rīgu!</p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">{new Date().getFullYear() - 1999}+ years</div>
                <p className="text-secondary-dark">in the industry </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">100K+</div>
                <p className="text-secondary-dark">Annual Participants</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">€20M+</div>
                <p className="text-secondary-dark">Annual Economic Impact</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-primary-dark mb-2">10</div>
                <p className="text-secondary-dark">
                  People on the team <span className="block text-xs text-neutral-500">(+2 dogs)</span>
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-primary-dark mb-4">What We Do</h3>
              <p className="text-base text-secondary-dark leading-relaxed">
                26 years in the business of creating, shaping, selling, packaging, re-inventing the Baltic region's most
                celebrated events.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-primary-dark mb-4">Our Approach</h3>
              <p className="text-base text-secondary-dark leading-relaxed">
                We know our way with the sponsors. We help them grow once they join our events. No bullshit. A proven
                track record. Wanna try us out?
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
