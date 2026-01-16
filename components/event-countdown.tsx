"use client"

import { useState, useEffect } from "react"
import { getNextUpcomingEvent, getDaysUntilEvent, displayEvents } from "@/lib/data/events-data"

function getEventColor(eventName: string): string {
  const name = eventName.toLowerCase()

  if (name.includes("marathon") || name.includes("rimi")) {
    const event = displayEvents.find((e) => e.id === "rimi-riga-marathon")
    return event?.brandColors?.primary || "#cc2128"
  }
  if (name.includes("bubble") || name.includes("wine") || name.includes("champagne") || name.includes("top 100")) {
    const event = displayEvents.find((e) => e.id === "riga-wine-champagne")
    return event?.brandColors?.primary || "#e40521"
  }
  if (name.includes("whisky")) {
    const event = displayEvents.find((e) => e.id === "riga-whisky-friends")
    return event?.brandColors?.primary || "#023047"
  }
  if (name.includes("pink noise") || name.includes("music")) {
    const event = displayEvents.find((e) => e.id === "pink-noise-riga")
    return event?.brandColors?.primary || "#fa4100"
  }
  if (name.includes("award")) {
    const event = displayEvents.find((e) => e.id === "baltic-wine-drinks-awards")
    return event?.brandColors?.primary || "#fad0c5"
  }

  return "#6B7280"
}

export default function EventCountdown() {
  const [mounted, setMounted] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  const nextEvent = getNextUpcomingEvent()

  useEffect(() => {
    setMounted(true)
    if (nextEvent?.startDate) {
      setDaysLeft(getDaysUntilEvent(nextEvent.startDate))
    }
  }, [nextEvent?.startDate])

  if (!nextEvent || !mounted) {
    return (
      <div className="bg-neutral-100 rounded-2xl p-6 md:p-8 flex items-center justify-center h-full">
        <p className="text-neutral-500 text-sm">Loading...</p>
      </div>
    )
  }

  const eventColor = getEventColor(nextEvent.name)
  const eventDate = nextEvent.startDate ? new Date(nextEvent.startDate) : null
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : ""

  const content = (
    <>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[20px] border-white/30" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full border-[15px] border-white/20" />
      </div>

      <div className="relative z-10">
        <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Next up</p>
        <h3 className="text-white text-lg md:text-xl font-bold leading-tight">{nextEvent.name}</h3>
        <p className="text-white/70 text-xs mt-1">{formattedDate}</p>
      </div>

      <div className="relative z-10 flex items-end justify-between mt-4">
        <div>
          <span className="text-white text-4xl md:text-5xl font-bold tabular-nums">{daysLeft}</span>
          <span className="text-white/80 text-sm ml-2">days to go</span>
        </div>

        {nextEvent.link && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              window.open(nextEvent.link, "_blank", "noopener,noreferrer")
            }}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            Learn more
          </button>
        )}
      </div>
    </>
  )

  if (nextEvent.link) {
    return (
      <a
        href={nextEvent.link}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: eventColor }}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden"
      style={{ backgroundColor: eventColor }}
    >
      {content}
    </div>
  )
}
