import type { Metadata } from "next"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import NewsSection from "@/components/sections/news-section"
import EventsShowcaseSection from "@/components/sections/events-showcase-section"
import GetInTouchSection from "@/components/sections/get-in-touch-section"
import ByTheNumbersSection from "@/components/sections/by-the-numbers-section"
import PartnersSection from "@/components/sections/partners-section"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { daysUntil, getNextInSeries } from "@/lib/data/calendar"
import { getCalendarEvents, getEvent } from "@/lib/cms"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.home)
export const revalidate = 3600

export default async function HomePage() {
  const marathon = getNextInSeries(await getCalendarEvents(), "rrm")
  const [rimiMarathon, wineChampagne] = await Promise.all([getEvent("rimi-riga-marathon"), getEvent("riga-wine-champagne")])
  const daysToMarathon = marathon ? daysUntil(marathon.end ?? marathon.start) : 0

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
      <div hidden dangerouslySetInnerHTML={{ __html: asciiComment }} />
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <EventsShowcaseSection />
      <GetInTouchSection />
      <ByTheNumbersSection daysToMarathon={daysToMarathon} rimiMarathon={rimiMarathon} wineChampagne={wineChampagne} />
      <PartnersSection />
    </>
  )
}
