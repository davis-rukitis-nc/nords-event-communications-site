// Single source for dated events (calendar, countdown, footer "Upcoming", Event JSON-LD).
// Past entries drop off automatically once their end time has passed; pages revalidate hourly.
// Times are local Riga time, written with their UTC offset (EET +02:00 / EEST +03:00).

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

const RWCH = "https://rigawinechampagne.lv/"
const PNR = "https://pinknoiseriga.com/"

export const calendarEvents: CalendarEvent[] = [
  {
    id: "miles-davis-latvian-all-stars-2026",
    name: "Cookin’ with the Miles Davis Latvian All-Stars",
    start: "2026-11-20T19:00:00+02:00",
    venue: "Hanzas Perons",
    description: "A Miles Davis tribute dinner-concert by Riga Wine & Champagne with Pink Noise Riga.",
    series: "rwch",
    link: RWCH,
    soldOut: true,
  },
  {
    id: "baltic-wine-drinks-awards-2026",
    name: "Baltic Wine & Drinks Awards 2026",
    start: "2026-11-21T11:00:00+02:00",
    end: "2026-11-21T14:00:00+02:00",
    venue: "Hanzas Perons",
    description: "The awards ceremony for the Baltic wine and drinks competition.",
    series: "bwda",
    link: "https://rigawinechampagne.lv/baltic-wine-drinks-awards/about",
  },
  {
    id: "top-100-wines-chefs-2026",
    name: "TOP 100 Wines + Chefs",
    start: "2026-11-21T17:00:00+02:00",
    end: "2026-11-21T23:00:00+02:00",
    venue: "Hanzas Perons",
    description:
      "The main Riga Wine & Champagne festival evening, a large tasting of 100 top wines paired with chefs’ food.",
    series: "rwch",
    link: RWCH,
  },
  {
    id: "les-amis-de-bordeaux-2026",
    name: "Les Amis de Bordeaux: a millennium feast",
    start: "2026-11-22T13:00:00+02:00",
    end: "2026-11-22T16:00:00+02:00",
    venue: "B7 restaurant",
    description: "A Bordeaux-themed long lunch, supported by Rietumu Banka.",
    series: "rwch",
    link: RWCH,
  },
  {
    id: "jason-hunter-sextet-2026",
    name: "Jason Hunter Sextet – Miles Davis 100: The Sound of a Century",
    start: "2026-11-27T20:00:00+02:00",
    venue: "M/House of JAZZ",
    description: "A Pink Noise Riga club concert marking Miles Davis’s centenary.",
    series: "pnr",
    link: PNR,
  },
  {
    id: "intars-busulis-lush-life-2026",
    name: "Intars Busulis Lush Life Quintet Vol. 2",
    start: "2026-11-28T18:00:00+02:00",
    venue: "Mūzikas nams Daile",
    description: "The second Pink Noise Riga jazz-standards concert from Intars Busulis.",
    series: "pnr",
    link: PNR,
  },
  {
    id: "sanyu-2026",
    name: "SANYU",
    start: "2026-11-28T20:00:00+02:00",
    venue: "M/House of JAZZ",
    description: "A Pink Noise Riga club concert.",
    series: "pnr",
    link: PNR,
  },
  {
    id: "jlco-wynton-marsalis-2026",
    name: "Jazz at Lincoln Center Orchestra with Wynton Marsalis",
    start: "2026-11-29T18:00:00+02:00",
    venue: "Dailes teātris",
    description:
      "The headline concert of the Pink Noise Riga Autumn Session and Marsalis’s first time performing in Latvia.",
    series: "pnr",
    link: PNR,
    soldOut: true,
  },
  {
    id: "bubble-parade-2027",
    name: "Burbuļu parāde (Bubble Parade)",
    start: "2027-04-03T17:00:00+03:00",
    end: "2027-04-03T23:00:00+03:00",
    venue: "Hanzas Perons",
    description: "The Riga Wine & Champagne spring tasting of sparkling wine and champagne.",
    series: "rwch",
    link: RWCH,
  },
  {
    id: "rimi-riga-marathon-2027",
    name: "Rimi Riga Marathon 2027",
    start: "2027-05-15T00:00:00+03:00",
    end: "2027-05-16T23:59:00+03:00",
    allDay: true,
    venue: "Riga",
    description: "The big annual running weekend in Riga.",
    series: "rrm",
    link: "https://rimirigamarathon.com/",
  },
  {
    id: "unannounced-2027-10",
    name: "Unannounced project",
    start: "2027-10-03T00:00:00+03:00",
    allDay: true,
    series: "tba",
    isToBeAnnounced: true,
  },
]

/** Brand colour per series (kept in sync with lib/data/events-data.ts brandColors). */
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
export function getUpcomingCalendarEvents(now: Date = new Date()): CalendarEvent[] {
  return calendarEvents
    .filter((e) => endOf(e) > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

/** Next announced event that has not started yet. */
export function getNextCalendarEvent(now: Date = new Date()): CalendarEvent | null {
  return getUpcomingCalendarEvents(now).find((e) => !e.isToBeAnnounced && new Date(e.start) > now) ?? null
}

export function getCalendarEvent(id: string) {
  return calendarEvents.find((e) => e.id === id)
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
