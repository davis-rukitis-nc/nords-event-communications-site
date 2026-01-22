import type { Metadata } from "next"
import HeroSection from "@/components/sections/hero-section"
import ByNordsMarquee from "@/components/sections/ByNordsMarquee"
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

  // ASCII art comment lines
  const asciiLines = [
    "`7MN.   `7MF'`7MM\"\"\"YMM    .g8\"\"\"bgd                          ",
    "  MMN.    M    MM     7  .dP'     `M                          ",
    "  M YMb   M    MM   d    dM'       ` ,pW\"Wq.`7MMpMMMb.pMMMb.  ",
    "  M  `MN. M    MMmmMM    MM         6W'   `Wb MM    MM    MM  ",
    "  M   `MM.M    MM   Y  , MM.        8M     M8 MM    MM    MM  ",
    "  M     YMM    MM     ,M `Mb.     ,'YA.   ,A9 MM    MM    MM  ",
    ".JML.    YM  .JMMmmmmMMM   `\"bmmmd'  `Ybmd9'.JMML  JMML  JMML. ",
  ]

  const asciiComment = "<!--\n" + asciiLines.join("\n") + "\n-->"

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: asciiComment }}
        aria-hidden="true"
      />
      <StructuredData data={breadcrumbData} />
      <main className="min-h-screen">
        <HeroSection />
        <ByNordsMarquee
          className="bg-[#B79A70]"
          textClassName="text-gray-700 tracking-wide"
          pillClassName="bg-[#111] shadow-sm"
        />
        <AboutSection />
        <NewsSection />
        <EventsShowcaseSection />
        <GetInTouchSection />
        <PartnersSection />
      </main>
    </>
  )
}
