import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { Event } from "@/lib/cms/types"

function getShortUrl(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

/** Alternating image/text list of events (home "Our Events" and /events "All Events"). */
export default function EventsList({ events, typeSuffix = "" }: { events: Event[]; typeSuffix?: string }) {
  return (
        <div className="space-y-16 md:space-y-24">
          {events.map((event, index) => {
            const flip = index % 2 === 1
            return (
              <article key={event.id} className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16">
                <Link
                  href={`/events/${event.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`group relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 ${flip ? "lg:col-start-2" : ""}`}
                >
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Link>

                <div className={`space-y-4 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <p className="text-xs font-medium uppercase tracking-widest text-subtle">{event.type}{typeSuffix}</p>
                  <h3 className="text-3xl font-semibold leading-tight text-foreground">{event.name}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{event.description}</p>

                  <div className="flex flex-wrap items-start gap-3 pt-2">
                    <Link
                      href={`/events/${event.slug}`}
                      aria-label={`Learn more about ${event.name}`}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    {event.officialSiteUrl && (
                      <div className="flex flex-col items-center">
                        <a
                          href={event.officialSiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit the ${event.name} website (opens in a new tab)`}
                          className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
                        >
                          Visit Site
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <span className="mt-1.5 text-xs text-subtle">{getShortUrl(event.officialSiteUrl)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
  )
}
