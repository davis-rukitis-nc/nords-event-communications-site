"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getHomepageEvents } from "@/lib/data/events-data"

function getShortUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace("www.", "")
  } catch {
    return url
  }
}

export default function EventsShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const homepageEvents = getHomepageEvents()

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-left">
          <h2 className="font-semibold text-foreground mb-4 text-2xl lg:text-3xl">Our Events</h2>
          <p className="text-muted-foreground max-w-2xl text-sm">
            {
              "Explore our world-class events, showcasing the team’s expertise in creating unforgettable experiences and efficient sponsorship packages!"
            }
          </p>
        </div>

        {/* Event Blocks */}
        <div className="space-y-16 md:space-y-24">
          {homepageEvents.map((event, index) => (
            <div
              key={event.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              } ${isVisible ? "animate-fade-in" : ""}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Column */}
              <div
                className={`relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <Image
                  src={event.image || "/placeholder.svg?width=800&height=450"}
                  alt={`${event.name} event showcase image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content Column */}
              <div className={`space-y-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{event.type} Series</span>
                <h3 className="font-semibold text-foreground leading-tight text-3xl">{event.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">{event.description}</p>

                <div className="flex flex-wrap gap-3 items-start my-0">
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center space-x-2 text-primary-foreground bg-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 my-3"
                  >
                    <span className="text-white">Learn more</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  {event.officialSiteUrl && (
                    <div className="flex flex-col my-3 items-center">
                      <a
                        href={event.officialSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-900 bg-gray-100 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-4 h-4" />
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
  )
}
