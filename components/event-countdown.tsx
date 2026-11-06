import { type CalendarEvent, formatFullDate, seriesColor } from "@/lib/data/calendar"

// Server component: values are computed at render (pages revalidate hourly).
export default function EventCountdown({ event, daysLeft }: { event: CalendarEvent | null; daysLeft: number }) {
  if (!event) return null

  const content = (
    <>
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/80">Next up</p>
        <h3 className="text-lg font-bold leading-tight text-white md:text-xl">{event.name}</h3>
        <p className="mt-1 text-xs text-white/75">{formatFullDate(event.start)}</p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <p>
          <span className="text-4xl font-bold tabular-nums text-white md:text-5xl">{daysLeft}</span>
          <span className="ml-2 text-sm text-white/80">days to go</span>
        </p>
        {event.link && <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white">Learn more</span>}
      </div>
    </>
  )

  const className = "flex h-full flex-col justify-between rounded-2xl p-6 md:p-8"
  const style = { backgroundColor: seriesColor[event.series] }

  return event.link ? (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-opacity hover:opacity-95`}
      style={style}
    >
      {content}
    </a>
  ) : (
    <div className={className} style={style}>
      {content}
    </div>
  )
}
