import type { Metadata } from "next"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import NewsSection from "@/components/sections/news-section"
import EventsShowcaseSection from "@/components/sections/events-showcase-section"
import GetInTouchSection from "@/components/sections/get-in-touch-section"
import PartnersSection from "@/components/sections/partners-section"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.home)

export default function HomePage() {
  const breadcrumbData = generateBreadcrumbStructuredData([{ name: "Home", url: "https://www.necom.lv/" }])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <EventsShowcaseSection />
        <GetInTouchSection />
        <PartnersSection />
      </main>
    </>
  )
}
