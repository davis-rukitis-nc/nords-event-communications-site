// Helpers for dated events (calendar, countdown, footer "Upcoming", Event JSON-LD).
// The entries themselves are edited in the CMS (Calendar collection) and loaded via lib/cms.
// Past entries drop off automatically once their end time has passed; pages revalidate hourly.

export type CalendarSeries = "rwch" | "pnr" | "bwda" | "rrm" | "tba"

export interface CalendarEvent {
  id: string
  name: string
  start: string
  end?: string
  /** All-day / multi-day entries show dates only. */
  allDay?: boolean
  venue?: string
  description?: string
  series: CalendarSeries
  link?: string
  soldOut?: boolean
  isToBeAnnounced?: boolean
}

export const TIME_ZONE = "Europe/Riga"

/** Brand colour per series (match the event series brand colours in the CMS). */
export const seriesColor: Record<CalendarSeries, string> = {
  rwch: "#e40521",
  pnr: "#fa4100",
  bwda: "#231F20",
  rrm: "#cc2128",
  tba: "#d4d4d4",
}

function endOf(event: CalendarEvent) {
  return new Date(event.end ?? event.start).getTime() + (event.end ? 0 : 3 * 60 * 60 * 1000)
}

/** Upcoming (not yet finished) events, soonest first. */
export function getUpcomingCalendarEvents(calendarEvents: CalendarEvent[], now: Date = new Date()): CalendarEvent[] {
  return calendarEvents
    .filter((e) => endOf(e) > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

/** Next announced event that has not started yet. */
export function getNextCalendarEvent(calendarEvents: CalendarEvent[], now: Date = new Date()): CalendarEvent | null {
  return getUpcomingCalendarEvents(calendarEvents, now).find((e) => !e.isToBeAnnounced && new Date(e.start) > now) ?? null
}

/** Next upcoming entry of a series, e.g. the next Rimi Riga Marathon. */
export function getNextInSeries(calendarEvents: CalendarEvent[], series: CalendarSeries, now: Date = new Date()) {
  return getUpcomingCalendarEvents(calendarEvents, now).find((e) => e.series === series && !e.isToBeAnnounced) ?? null
}

const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(d)

/** Whole calendar days (Riga time) from `now` until `iso`. */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const diff = Date.parse(dayKey(new Date(iso))) - Date.parse(dayKey(now))
  return Math.max(0, Math.round(diff / 86_400_000))
}

const fmt = (opts: Intl.DateTimeFormatOptions) => {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...opts })
  // Some ICU versions abbreviate September as "Sept".
  return { format: (d: Date) => f.format(d).replace("Sept", "Sep") }
}
const dayMonth = fmt({ day: "numeric", month: "short" })
const time = fmt({ hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
const weekday = fmt({ weekday: "short" })
const fullDate = fmt({ day: "numeric", month: "short", year: "numeric" })

/** "Fri 20 Nov, 19:00" · "15–16 May" · "3 Oct" */
export function formatEventDate(event: CalendarEvent): string {
  const start = new Date(event.start)
  if (event.allDay) {
    if (!event.end || dayKey(new Date(event.end)) === dayKey(start)) return dayMonth.format(start)
    const end = new Date(event.end)
    const [sd, sm] = dayMonth.format(start).split(" ")
    const [ed, em] = dayMonth.format(end).split(" ")
    return sm === em ? `${sd}–${ed} ${sm}` : `${sd} ${sm} – ${ed} ${em}`
  }
  return `${weekday.format(start)} ${dayMonth.format(start)}, ${time.format(start)}`
}

export function formatFullDate(iso: string): string {
  return fullDate.format(new Date(iso))
}

/** "2026 Calendar" or "2026–27 Calendar", from the events shown. */
export function calendarLabel(events: CalendarEvent[]): string {
  if (!events.length) return "Calendar"
  const years = events.map((e) => Number(dayKey(new Date(e.start)).slice(0, 4)))
  const first = Math.min(...years)
  const last = Math.max(...years)
  return first === last ? `${first} Calendar` : `${first}–${String(last).slice(2)} Calendar`
}
