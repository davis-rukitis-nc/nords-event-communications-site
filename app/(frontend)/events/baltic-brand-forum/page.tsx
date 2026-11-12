import type { Metadata } from "next"
import EventHeader from "@/components/event-detail/event-header"
import { notFound } from "next/navigation"
import { getEvent } from "@/lib/cms"
import YouTubeEmbed from "@/components/event-detail/youtube-embed"
import OtherEvents from "@/components/event-detail/other-events"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"


export const metadata: Metadata = generatePageMetadata({
  title: "Baltic Brand Forum",
  description: "The leading inspirational platform for marketing & brand professionals in the Baltics!",
  keywords: ["marketing", "branding", "conference", "Latvia", "Baltics", "advertising"],
  url: "/events/baltic-brand-forum",
})

export default async function BalticBrandForumPage() {
  const event = await getEvent("baltic-brand-forum")
  if (!event) notFound()

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
    { name: "Baltic Brand Forum", url: "https://www.necom.lv/events/baltic-brand-forum" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <div className="bg-white">
        <EventHeader event={event} title="Baltic Brand Forum" subtitle={event.description} />

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
                  className="text-neutral-950 underline decoration-1 underline-offset-4 hover:decoration-2"
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
      </div>
    </>
  )
}
