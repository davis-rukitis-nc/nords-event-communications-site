import type { Metadata } from "next"
import Image from "next/image"
import { displayEvents } from "@/lib/data/events-data"
import YouTubeEmbed from "@/components/event-detail/youtube-embed"
import OtherEvents from "@/components/event-detail/other-events"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

const event = displayEvents.find((e) => e.id === "baltic-brand-forum")!

export const metadata: Metadata = generatePageMetadata({
  title: "Baltic Brand Forum",
  description: "The leading inspirational platform for marketing & brand professionals in the Baltics!",
  keywords: ["marketing", "branding", "conference", "Latvia", "Baltics", "advertising"],
  url: "/events/baltic-brand-forum",
  type: "article",
  section: "Advertisement",
  tags: ["Advertisement", "Events", "Latvia"],
})

export default function BalticBrandForumPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
    { name: "Baltic Brand Forum", url: "https://www.necom.lv/events/baltic-brand-forum" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <main className="bg-white">
        {/* Header */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src="https://rimirigamarathon.com/wp-content/uploads/2025/12/BBF-26.09-FIRST-LOOK2-13_websize.jpg"
            alt="Baltic Brand Forum"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-6 md:pb-12">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-4 uppercase tracking-wide">
                {event.type}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Baltic Brand Forum</h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">{event.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-4">About the Event</h2>
              <p className="text-secondary-dark leading-relaxed text-lg">
                Created by our friends at{" "}
                <a
                  href="https://www.magicagency.lv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Magic Agency
                </a>
                , Baltic Brand Forum has become the leading inspirational platform for marketing & brand professionals
                in the Baltics. And we've certainly helped by producing the event since forever.
              </p>
            </div>

            {event.youtubeUrl && <YouTubeEmbed url={event.youtubeUrl} title="Baltic Brand Forum highlight video" />}
          </div>
        </div>

        <OtherEvents currentEventId="baltic-brand-forum" />
      </main>
    </>
  )
}
