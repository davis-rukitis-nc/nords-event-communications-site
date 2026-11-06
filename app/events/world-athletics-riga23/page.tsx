import type { Metadata } from "next"
import Image from "next/image"
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
  type: "article",
  section: "Sports",
  tags: ["Sports", "Events", "Latvia", "World Athletics"],
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
      <main className="bg-white">
        {/* Header - same style as other event pages */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={event.image}
            alt="World Athletics Road Running Championships Riga 23"
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
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                World Athletics Road Running Championships Riga 23
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">{event.description}</p>
            </div>
          </div>
        </div>

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
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary-dark mb-4">Event Archives</h3>
                  <p className="text-sm text-gray-600 mb-4">Relive the memories from Riga23</p>
                  <div className="flex gap-3">
                    {event.socialMedia?.instagram && (
                      <a
                        href={event.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-500 text-white hover:scale-105 transition-transform"
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
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-500 text-white hover:scale-105 transition-transform"
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
      </main>
    </>
  )
}
