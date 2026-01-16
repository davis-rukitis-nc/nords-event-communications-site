import type { Metadata } from "next"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { displayEvents } from "@/lib/data/events-data"
import YouTubeEmbed from "@/components/event-detail/youtube-embed"
import OtherEvents from "@/components/event-detail/other-events"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const SevenSegmentDigit = ({ digit }: { digit: string }) => {
  const patterns: Record<string, boolean[]> = {
    "0": [true, true, true, true, true, true, false],
    "1": [false, true, true, false, false, false, false],
    "2": [true, true, false, true, true, false, true],
    "3": [true, true, true, true, false, false, true],
    "4": [false, true, true, false, false, true, true],
    "5": [true, false, true, true, false, true, true],
    "6": [true, false, true, true, true, true, true],
    "7": [true, true, true, false, false, false, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
  }

  const segments = patterns[digit] || [false, false, false, false, false, false, false]
  const onColor = "bg-amber-400"
  const offColor = "bg-neutral-800"

  return (
    <div className="relative w-4 h-7 md:w-5 md:h-9">
      <div
        className={`absolute top-0 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[0] ? onColor : offColor}`}
      />
      <div
        className={`absolute top-[3px] right-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[1] ? onColor : offColor}`}
      />
      <div
        className={`absolute bottom-[3px] right-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[2] ? onColor : offColor}`}
      />
      <div
        className={`absolute bottom-0 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[3] ? onColor : offColor}`}
      />
      <div
        className={`absolute bottom-[3px] left-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[4] ? onColor : offColor}`}
      />
      <div
        className={`absolute top-[3px] left-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[5] ? onColor : offColor}`}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[6] ? onColor : offColor}`}
      />
    </div>
  )
}

const SeikoClock = ({
  time,
  label,
  athlete,
  country,
}: { time: string; label: string; athlete?: string; country?: string }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-neutral-950 rounded-lg p-2 md:p-3 border border-neutral-800">
        <div className="flex items-center gap-[2px] md:gap-1 justify-center">
          {time.split("").map((char, i) =>
            char === ":" || char === "." ? (
              <div key={i} className="flex flex-col gap-1 px-[2px]">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400" />
                {char === ":" && <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400" />}
              </div>
            ) : (
              <SevenSegmentDigit key={i} digit={char} />
            ),
          )}
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-[10px] md:text-xs text-neutral-300 font-medium">{label}</p>
        {athlete && (
          <p className="text-[9px] md:text-[10px] text-neutral-500 mt-0.5">
            {athlete} {country && <span className="text-neutral-600">({country})</span>}
          </p>
        )}
      </div>
    </div>
  )
}

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
            src={event.image || "/placeholder.svg"}
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

              {/* World Records Section */}
              <div className="bg-neutral-900 rounded-2xl p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-6">
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">3 World Records</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-800 px-3 py-1.5 rounded">
                    Official Times
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <SeikoClock time="4:20.98" label="Women's Road Mile WR" athlete="Diribe Welteji" country="ETH" />
                  <SeikoClock time="3:56.13" label="Men's Road Mile WR" athlete="Hobbs Kessler" country="USA" />
                  <SeikoClock time="1:26:16" label="F65 Half Marathon WR" athlete="Rosa Mota" country="POR" />
                </div>
              </div>
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
                        <Instagram className="w-5 h-5" />
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
