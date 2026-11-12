import type { Metadata } from "next"
import EventsList from "@/components/events-list"
import { getCalendarEvents, getEvents } from "@/lib/cms"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData, generateCalendarEventStructuredData } from "@/lib/seo/structured-data"
import EventCalendar from "@/components/event-calendar"
import EventCountdown from "@/components/event-countdown"
import { calendarLabel, daysUntil, getNextCalendarEvent, getUpcomingCalendarEvents } from "@/lib/data/calendar"

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.events)

export default async function EventsPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Events", url: "https://www.necom.lv/events" },
  ])

  const [allEvents, calendarEvents] = await Promise.all([getEvents(), getCalendarEvents()])
  const upcoming = getUpcomingCalendarEvents(calendarEvents)
  const nextEvent = getNextCalendarEvent(calendarEvents)

  return (
    <>
      <StructuredData
        data={[
          breadcrumbData,
          ...upcoming.filter((e) => !e.isToBeAnnounced).map(generateCalendarEventStructuredData),
        ]}
      />
      <div className="bg-white pt-28 md:pt-36">
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="flex flex-col justify-between gap-6 md:min-h-[300px]">
              <h1 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Events that move Riga</h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Explore our world-class events, showcasing the team's expertise in creating unforgettable experiences and
                efficient sponsorship packages!
              </p>
            </div>

            <div className="flex flex-col border-t border-neutral-950 pt-4">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
                {calendarLabel(upcoming)}
              </h2>
              <EventCalendar events={upcoming} initialCount={4} />
            </div>

            <div className="min-h-[260px] md:col-span-2 lg:col-span-1 lg:min-h-[300px]">
              <EventCountdown event={nextEvent} daysLeft={nextEvent ? daysUntil(nextEvent.start) : 0} />
            </div>
          </div>
        </section>

        {/* All Events List */}
        <section className="py-16 md:py-24">
          <div className="px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14">
              <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">All Events</h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {"Explore our complete portfolio of world-class events."}
              </p>
            </div>

            <EventsList events={allEvents} />
          </div>
        </section>
      </div>
    </>
  )
}
