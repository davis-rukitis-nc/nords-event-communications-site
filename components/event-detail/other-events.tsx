import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { displayEvents } from "@/lib/data/events-data"

export default function OtherEvents({ currentEventId }: { currentEventId: string }) {
  const otherEvents = displayEvents.filter((event) => event.id !== currentEventId).slice(0, 4)
  if (otherEvents.length === 0) return null

  return (
    <section aria-labelledby="other-events" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <h2 id="other-events" className="mb-3 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
            Explore Other Events
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Discover more premium experiences from our diverse portfolio of events across the Baltics.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {otherEvents.map((event) => (
            <li key={event.id}>
              <Link
                href={`/events/${event.slug}`}
                className="group relative block aspect-[3/2] overflow-hidden rounded-xl bg-neutral-900"
              >
                <Image
                  src={event.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                <span className="absolute left-4 top-4 text-[11px] font-medium uppercase tracking-widest text-white/85">
                  {event.type}
                </span>
                {event.logo && (
                  <div className="absolute right-4 top-3.5 h-6 w-14">
                    <Image src={event.logo} alt="" fill className="object-contain object-right brightness-0 invert" sizes="56px" />
                  </div>
                )}
                <h3 className="absolute inset-x-4 bottom-4 line-clamp-2 text-base font-semibold text-white">{event.name}</h3>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            View All Events
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
