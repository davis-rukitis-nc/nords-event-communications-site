import type { Metadata } from "next"
import EventHeader from "@/components/event-detail/event-header"
import { InstagramIcon, FacebookIcon } from "@/components/brand-icons"
import RecordsBoard from "@/components/records-board"
import { displayEvents } from "@/lib/data/events-data"
import YouTubeEmbed from "@/components/event-detail/youtube-embed"
import OtherEvents from "@/components/event-detail/other-events"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

const event = displayEvents.find((e) => e.id === "world-athletics-road-running-championships-riga23")!

export const metadata: Metadata = generatePageMetadata({
  title: "World Athletics Road Running Championships Riga 23",
  description: "The Inaugural World Champs of Riga, the World Road Running Capital!",
  keywords: ["athletics", "running", "world championships", "Latvia", "Riga", "sports"],
  url: "/events/world-athletics-riga23",
})

export default function WorldAthleticsRiga23Page() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
    { name: "World Athletics Riga 23", url: "https://www.necom.lv/events/world-athletics-riga23" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <div className="bg-white">
        <EventHeader event={event} title="World Athletics Road Running Championships Riga 23" subtitle={event.description} />

        {/* Content - wider container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content - takes 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary-dark mb-4">About the Event</h2>
                <p className="text-secondary-dark leading-relaxed text-lg">{event.longDescription}</p>
              </div>

              {event.youtubeUrl && (
                <YouTubeEmbed url={event.youtubeUrl} title="World Athletics Riga 23 highlight video" />
              )}

              <RecordsBoard />
            </div>

            {/* Sidebar - only social media archives */}
            <aside className="lg:col-span-1">
              {(event.socialMedia?.instagram || event.socialMedia?.facebook) && (
                <div className="bg-neutral-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary-dark mb-4">Event Archives</h3>
                  <p className="text-sm text-neutral-600 mb-4">Relive the memories from Riga23</p>
                  <div className="flex gap-3">
                    {event.socialMedia?.instagram && (
                      <a
                        href={event.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                        aria-label="View Instagram archive"
                      >
                        <InstagramIcon className="w-5 h-5" />
                      </a>
                    )}
                    {event.socialMedia?.facebook && (
                      <a
                        href={event.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                        aria-label="View Facebook archive"
                      >
                        <FacebookIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        <OtherEvents currentEventId="world-athletics-road-running-championships-riga23" />
      </div>
    </>
  )
}
