import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getAllEvents } from "@/lib/data/events-data"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"
import EventCalendar from "@/components/event-calendar"
import EventCountdown from "@/components/event-countdown"

function getShortUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace("www.", "")
  } catch {
    return url
  }
}

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.events)

export default function EventsPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
  ])

  const allEvents = getAllEvents()

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <main className="bg-white pt-24 md:pt-32">
        <section className="py-8 md:py-12 rounded-2xl bg-neutral-100 mx-4 md:mx-6 lg:mx-8">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Left: Intro text */}
              <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[280px] md:min-h-[320px]">
  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
    Events that move Riga
  </h1>

  <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
    Explore our world-class events, showcasing the team's expertise in creating unforgettable experiences and efficient sponsorship packages!
  </p>
</div>


              {/* Middle: Calendar widget */}
              <div className="bg-white rounded-2xl p-5 md:p-6 flex flex-col h-full min-h-[280px] md:min-h-[320px]">
                <div className="flex items-center gap-2 mb-4 text-neutral-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">2026 Calendar</span>
                </div>
                <div className="flex-1">
                  <EventCalendar year={2026} initialCount={4} />
                </div>
              </div>

              {/* Right: Countdown bento box */}
              <div className="md:col-span-2 lg:col-span-1 h-full min-h-[280px] md:min-h-[320px]">
                <EventCountdown />
              </div>
            </div>
          </div>
        </section>

        {/* All Events List */}
        <section className="py-16 md:py-24">
          <div className="px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 text-left">
              <h2 className="font-semibold text-foreground mb-4 text-2xl lg:text-3xl">All Events</h2>
              <p className="text-muted-foreground max-w-2xl text-sm">
                {"Explore our complete portfolio of world-class events."}
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {allEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Image Column */}
                  <Link
                    href={
                      event.id === "baltic-brand-forum"
                        ? `/events/baltic-brand-forum`
                        : event.id === "world-athletics-road-running-championships-riga23"
                          ? `/events/world-athletics-riga23`
                          : `/events/${event.id}`
                    }
                    className={`relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <Image
                      src={event.image || "/placeholder.svg?width=800&height=450"}
                      alt={`${event.name} event showcase image`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300" />
                  </Link>

                  {/* Content Column */}
                  <div className={`space-y-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{event.type}</span>
                    <h3 className="font-semibold text-foreground leading-tight text-3xl">{event.name}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{event.description}</p>

                    <div className="flex flex-wrap gap-3 items-start my-0">
                      <Link
                        href={
                          event.id === "baltic-brand-forum"
                            ? `/events/baltic-brand-forum`
                            : event.id === "world-athletics-road-running-championships-riga23"
                              ? `/events/world-athletics-riga23`
                              : `/events/${event.id}`
                        }
                        className="inline-flex items-center space-x-2 text-primary-foreground bg-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-800 hover:shadow-lg transition-all duration-200 my-3 group"
                      >
                        <span className="text-white">Learn more</span>
                        <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                      </Link>

                      {event.officialSiteUrl && (
                        <div className="flex flex-col my-3 items-center">
                          <a
                            href={event.officialSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-gray-900 bg-gray-100 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 hover:shadow-md transition-all duration-200 group"
                          >
                            <span>Visit Site</span>
                            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                          <span className="text-xs text-gray-500 mt-1 ml-1">{getShortUrl(event.officialSiteUrl)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
