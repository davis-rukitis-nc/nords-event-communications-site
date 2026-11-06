"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { type CalendarEvent, formatEventDate, seriesColor } from "@/lib/data/calendar"

interface EventCalendarProps {
  events: CalendarEvent[]
  initialCount?: number
}

export default function EventCalendar({ events, initialCount = 4 }: EventCalendarProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? events : events.slice(0, initialCount)
  const hiddenCount = events.length - initialCount

  if (!events.length) return null

  return (
    <div>
      <ul id="event-calendar-list">
        {visible.map((event) => (
          <li key={event.id} className="flex items-start gap-3 border-b border-neutral-100 py-2.5 last:border-b-0">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: seriesColor[event.series] }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`text-sm leading-tight ${
                    event.isToBeAnnounced ? "italic text-neutral-500" : "font-medium text-neutral-800"
                  }`}
                >
                  {event.name}
                </span>
                {event.link && !event.isToBeAnnounced && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${event.name} (opens in a new tab)`}
                    className="-m-1 shrink-0 p-1 text-neutral-400 transition-colors hover:text-neutral-700"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs tabular-nums text-neutral-500">
                <time dateTime={event.start}>{formatEventDate(event)}</time>
                {event.venue && <span aria-hidden="true">·</span>}
                {event.venue && <span>{event.venue}</span>}
                {event.soldOut && (
                  <span className="ml-0.5 rounded-sm border border-neutral-300 px-1 text-[10px] font-medium uppercase tracking-wide text-neutral-600">
                    Sold out
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="event-calendar-list"
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          {expanded ? "Show less" : `+${hiddenCount} more`}
          <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
