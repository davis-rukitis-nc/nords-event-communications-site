"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { displayEvents } from "@/lib/data/events-data"

interface OtherEventsProps {
  currentEventId: string
}

export default function OtherEvents({ currentEventId }: OtherEventsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Filter out current event and get up to 4 other events
  const otherEvents = displayEvents.filter((event) => event.id !== currentEventId).slice(0, 4)

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

  if (otherEvents.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 bg-gray-50 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Other Events</h2>
          <p className="text-gray-600 max-w-2xl ">
            Discover more premium experiences from our diverse portfolio of events across the Baltics.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherEvents.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className={`group relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 border border-white/10 ${
                isVisible ? "animate-fade-in" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={event.image || "/placeholder.svg?width=400&height=300"}
                  alt={`${event.name} background`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Event type badge */}
              <div className="absolute top-3 left-3">
                <span className="text-xs font-medium text-black bg-white/90 px-2 py-1 rounded-lg">{event.type}</span>
              </div>

              {/* Event logo */}
              <div className="absolute top-3 right-3 w-12 h-6">
                <Image
                  src={event.logo || "/placeholder.svg?width=48&height=24"}
                  alt={`${event.name} logo`}
                  fill
                  className="object-contain filter brightness-0 invert"
                  sizes="48px"
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-base font-semibold text-white mb-2 line-clamp-1">{event.name}</h3>
              </div>

              {/* Arrow Up Right Icon */}
              <div className="absolute bottom-4 right-4 bg-white/20 rounded-full p-2 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        {/* View All Events Link */}
        <div className="mt-12 text-left">
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-700 transition-colors duration-200"
          >
            <span>View All Events</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
