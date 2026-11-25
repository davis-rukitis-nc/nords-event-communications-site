import { describe, expect, it } from "vitest"
import {
  venues,
  primaryVenues,
  dpPairs,
  BENCHMARK_EUR,
  krugIndex,
  quantile,
  summarize,
  ordinal,
} from "@/lib/data/krug-index"

// Figures published in the Baltic Wine & Drinks Awards Krug Index 2026 research report (snapshot 24 Nov 2026).
describe("Krug Index data", () => {
  it("reproduces the primary benchmark", () => {
    const s = summarize(primaryVenues)
    expect(s.n).toBe(21)
    expect(BENCHMARK_EUR).toBe(390)
    expect(s.q1).toBe(350)
    expect(s.q3).toBe(480)
    expect(s.min).toBe(315)
    expect(s.max).toBe(800)
  })

  it("keeps Riviera's iD bottle out of the benchmark but reproduces the broad sensitivity", () => {
    expect(venues.filter((v) => v.scope === "legacy-id").map((v) => v.name)).toEqual(["Riviera"])
    expect(summarize(venues).median).toBe(396)
  })

  it("has one row per venue and drink-in = printed + mandatory fee", () => {
    expect(new Set(venues.map((v) => v.id)).size).toBe(venues.length)
    for (const v of venues) expect(v.drinkIn).toBe(v.printed + v.bottleFee)
  })

  it("links every venue to its 2026 list", () => {
    for (const v of venues) expect(v.menuUrl).toMatch(/^https:\/\/menus\.balticwinelists\.com\/2026\/[a-z0-9-]+\/[a-z-]+$/)
  })

  it("matches the country medians", () => {
    const m = (c: string) => summarize(primaryVenues.filter((v) => v.country === c)).median
    expect([m("EE"), m("LT"), m("LV")]).toEqual([360, 410, 480])
  })

  it("pairs every Dom Pérignon 2015 row with a primary venue at the same Krug price", () => {
    expect(dpPairs).toHaveLength(11)
    for (const p of dpPairs) expect(primaryVenues.find((v) => v.id === p.id)?.drinkIn).toBe(p.krug)
  })

  it("computes helpers correctly", () => {
    expect(krugIndex(402)).toBeCloseTo(103.08, 2)
    expect(quantile([1, 2, 3, 4], 0.25)).toBe(1.75)
    expect([1, 2, 3, 4, 11, 12, 13, 172].map(ordinal)).toEqual(["1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "172nd"])
  })
})

describe("Dom Pérignon estimate", () => {
  it("is increasing and close to the observed pairs", async () => {
    const { estimateDp, dpFit } = await import("@/lib/data/krug-index")
    expect(dpFit.slope).toBeGreaterThan(0)
    expect(estimateDp(800)).toBeGreaterThan(estimateDp(390))
    const mae = dpPairs.reduce((s, p) => s + Math.abs(estimateDp(p.krug) - p.dp), 0) / dpPairs.length
    expect(mae).toBeLessThan(30) // in-sample; the held-out error in the report is €26
  })
})
