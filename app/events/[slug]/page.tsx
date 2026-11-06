import type React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { InstagramIcon, FacebookIcon } from "@/components/brand-icons"
import { displayEvents } from "@/lib/data/events-data"
import EventHeader from "@/components/event-detail/event-header"
import EventStats from "@/components/event-detail/event-stats"
import YouTubeEmbed from "@/components/event-detail/youtube-embed"
import PartnerCTA from "@/components/event-detail/partner-cta"
import OtherEvents from "@/components/event-detail/other-events"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"

interface EventPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  // baltic-brand-forum and world-athletics-riga23 have their own routes.
  return displayEvents
    .filter((event) => !["baltic-brand-forum", "world-athletics-riga23"].includes(event.slug))
    .map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = displayEvents.find((e) => e.slug === slug)

  if (!event) {
    return {
      title: "Event Not Found",
      robots: "noindex, nofollow",
    }
  }

  return generatePageMetadata({
    title: event.name,
    description: event.description,
    keywords: [event.type, "event", "Latvia", "Riga", "premium experience"],
    image: event.image,
    url: `/events/${event.slug}`,
  })
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params

  const event = displayEvents.find((e) => e.slug === slug)

  if (!event) {
    notFound()
  }

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
    { name: event.name, url: `https://www.necom.lv/events/${event.slug}` },
  ])

  const brandColorStyle = event.brandColors?.primary
    ? {
        "--event-brand-primary": event.brandColors.primary,
        "--event-brand-secondary": event.brandColors.secondary || event.brandColors.primary,
        "--event-brand-tertiary": event.brandColors.tertiary || event.brandColors.primary,
      }
    : {}

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <div className="bg-white" style={brandColorStyle as React.CSSProperties}>
        <EventHeader event={event} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 lg:order-first">
              <div>
                <h2 className="text-3xl font-bold text-primary-dark mb-4">About the Event</h2>
                <p className="text-secondary-dark leading-relaxed">{event.longDescription}</p>
              </div>
              {event.youtubeUrl && <YouTubeEmbed url={event.youtubeUrl} title={`YouTube video for ${event.name}`} />}
              <PartnerCTA />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 order-first lg:order-last">
              <div className="bg-neutral-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Event Details</h3>
                <EventStats event={event} />
                {event.officialSiteUrl && (
                  <Link
                    href={event.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 text-white"
                    style={{
                      backgroundColor: event.brandColors?.primary || "#1f2937",
                    }}
                  >
                    <span>Visit Official Site</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                {(event.socialMedia?.instagram || event.socialMedia?.facebook) && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-600 mb-3">Follow on Social Media</h4>
                    <div className="flex gap-3">
                      {event.socialMedia?.instagram && (
                        <Link
                          href={event.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-500 text-white hover:scale-105 transition-transform"
                          aria-label={`Follow ${event.name} on Instagram`}
                        >
                          <InstagramIcon className="w-5 h-5" />
                        </Link>
                      )}
                      {event.socialMedia?.facebook && (
                        <Link
                          href={event.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-500 text-white hover:scale-105 transition-transform"
                          aria-label={`Follow ${event.name} on Facebook`}
                        >
                          <FacebookIcon className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* Other Events Section */}
        <OtherEvents currentEventId={event.id} />
      </div>
    </>
  )
}
