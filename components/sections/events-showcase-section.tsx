import EventsList from "@/components/events-list"
import { getHomepageEvents } from "@/lib/cms"

export default async function EventsShowcaseSection() {
  const homepageEvents = await getHomepageEvents()

  return (
    <section aria-labelledby="our-events" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10 md:mb-14">
          <h2 id="our-events" className="mb-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Our Events
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {
              "Explore our world-class events, showcasing the team’s expertise in creating unforgettable experiences and efficient sponsorship packages!"
            }
          </p>
        </div>

        <EventsList events={homepageEvents} typeSuffix=" Series" />
      </div>
    </section>
  )
}
