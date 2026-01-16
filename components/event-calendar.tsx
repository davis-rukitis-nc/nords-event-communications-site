"use client"

import { useState } from "react"
import { getSortedCalendarEvents, displayEvents } from "@/lib/data/events-data"

interface EventCalendarProps {
  year?: number
  className?: string
  initialCount?: number
}

function getEventSeriesColor(eventName: string): string {
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

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate || !endDate) return ""

  const start = new Date(startDate)
  const end = new Date(endDate)

  const startDay = start.getDate().toString().padStart(2, "0")
  const endDay = end.getDate().toString().padStart(2, "0")
  const startMonth = start.toLocaleString("en-US", { month: "short" })
  const endMonth = end.toLocaleString("en-US", { month: "short" })

  if (startMonth === endMonth) {
    return `${startDay}–${endDay} ${startMonth}`
  }

  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`
}

export default function EventCalendar({ year = 2026, className = "", initialCount = 3 }: EventCalendarProps) {
  const [expanded, setExpanded] = useState(false)
  const allEvents = getSortedCalendarEvents(year)

  const visibleEvents = expanded ? allEvents : allEvents.slice(0, initialCount)
  const hiddenCount = allEvents.length - initialCount

  return (
    <div className={`${className}`}>
      <div className="relative">
        <div className="space-y-0">
          {visibleEvents.map((event, index) => {
            const color = event.isToBeAnnounced ? "#D1D5DB" : getEventSeriesColor(event.name)
            const dateStr = formatDateRange(event.startDate, event.endDate)

            return (
              <div
                key={event.id}
                className={`relative flex items-start gap-3 py-2.5 ${
                  index !== visibleEvents.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: color }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-sm leading-tight ${
                        event.isToBeAnnounced ? "text-neutral-400 italic" : "text-neutral-800 font-medium"
                      }`}
                    >
                      {event.name}
                    </span>

                    {!event.isToBeAnnounced && event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-neutral-300 hover:text-neutral-500 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  <span className="text-xs text-neutral-400 tabular-nums">{dateStr}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          {expanded ? "Show less" : `+${hiddenCount} more`}
          <svg
            className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}
