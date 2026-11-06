import { describe, expect, it } from "vitest"
import {
  calendarEvents,
  calendarLabel,
  daysUntil,
  formatEventDate,
  getNextCalendarEvent,
  getUpcomingCalendarEvents,
} from "@/lib/data/calendar"

const at = (iso: string) => new Date(iso)

describe("calendar data", () => {
  it("has unique ids and valid dates", () => {
    const ids = calendarEvents.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const e of calendarEvents) {
      expect(Number.isNaN(Date.parse(e.start))).toBe(false)
      if (e.end) expect(Date.parse(e.end)).toBeGreaterThanOrEqual(Date.parse(e.start))
    }
  })

  it("drops events once they have finished", () => {
    const upcoming = getUpcomingCalendarEvents(at("2026-11-21T15:00:00+02:00"))
    const ids = upcoming.map((e) => e.id)
    expect(ids).not.toContain("miles-davis-latvian-all-stars-2026")
    expect(ids).not.toContain("baltic-wine-drinks-awards-2026") // ended 14:00
    expect(ids[0]).toBe("top-100-wines-chefs-2026")
  })

  it("keeps an event without an end time for a few hours after it starts", () => {
    const ids = getUpcomingCalendarEvents(at("2026-11-20T20:30:00+02:00")).map((e) => e.id)
    expect(ids).toContain("miles-davis-latvian-all-stars-2026")
  })

  it("never picks a TBA entry as the next event", () => {
    const next = getNextCalendarEvent(at("2027-06-01T00:00:00+03:00"))
    expect(next).toBeNull()
  })

  it("counts whole days in Riga time", () => {
    expect(daysUntil("2027-05-16T23:59:00+03:00", at("2027-05-15T23:30:00+03:00"))).toBe(1)
    expect(daysUntil("2026-11-20T19:00:00+02:00", at("2026-11-20T08:00:00+02:00"))).toBe(0)
  })

  it("formats dates", () => {
    const byId = (id: string) => calendarEvents.find((e) => e.id === id)!
    expect(formatEventDate(byId("miles-davis-latvian-all-stars-2026"))).toBe("Fri 20 Nov, 19:00")
    expect(formatEventDate(byId("rimi-riga-marathon-2027"))).toBe("15–16 May")
    expect(formatEventDate(byId("unannounced-2027-10"))).toBe("3 Oct")
  })

  it("derives the calendar label from the events shown", () => {
    expect(calendarLabel(getUpcomingCalendarEvents(at("2026-11-06T12:00:00+02:00")))).toBe("2026–27 Calendar")
    expect(calendarLabel(getUpcomingCalendarEvents(at("2027-01-10T12:00:00+02:00")))).toBe("2027 Calendar")
  })
})
