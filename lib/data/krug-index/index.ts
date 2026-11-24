import { venues, dpPairs, international, study } from "./data"
import type { CountryCode, KrugVenue } from "./types"

export type { KrugVenue, DpPair, IntlReference, CountryCode } from "./types"
export { venues, dpPairs, international, study }

/** Linear-interpolation quantile (same as NumPy's default / Excel PERCENTILE.INC). */
export function quantile(values: number[], q: number): number {
  const s = [...values].sort((a, b) => a - b)
  if (s.length === 0) return NaN
  const pos = (s.length - 1) * q
  const lo = Math.floor(pos)
  const hi = Math.ceil(pos)
  return s[lo] + (s[hi] - s[lo]) * (pos - lo)
}

export const median = (values: number[]) => quantile(values, 0.5)

export const primaryVenues: KrugVenue[] = venues.filter((v) => v.scope === "primary")

/** The fixed benchmark. Filters never recalculate it: index 100 is always this number. */
export const BENCHMARK_EUR = median(primaryVenues.map((v) => v.drinkIn))

export const krugIndex = (price: number) => (100 * price) / BENCHMARK_EUR

export function summarize(list: KrugVenue[]) {
  const p = list.map((v) => v.drinkIn)
  return {
    n: p.length,
    median: median(p),
    q1: quantile(p, 0.25),
    q3: quantile(p, 0.75),
    min: Math.min(...p),
    max: Math.max(...p),
  }
}

export const COUNTRY_NAMES: Record<CountryCode, string> = {
  EE: "Estonia",
  LV: "Latvia",
  LT: "Lithuania",
}

export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
}

export const editionLabel = (v: KrugVenue) =>
  v.edition ? `${ordinal(v.edition)} edition` : v.scope === "legacy-id" ? "iD 219 011" : "Edition not stated"

const eur = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
export const formatEur = (n: number) => eur.format(n)

/**
 * Short public notes, each taken from the audited research record (menu page reviewed visually).
 * Kept here rather than in the generated file because they are editorial wording.
 */
export const venueNotes: Record<string, string> = {
  W015: "Also lists the 171st edition, at €425.",
  W021: "A 125 mL glass of the same Krug is €68.",
  W050: "€315 on the shelf, plus €15 to drink it in the bar.",
  W049: "€315 on the shelf, plus €15 to drink it in the bar. From the July 2026 list.",
  W038: "Also lists the 171st edition, at the same €550.",
  W048: "The menu adds a 10% service charge, which it calls discretionary. With it the bottle is €660. The index uses €600.",
  W024: "The file is dated November 2025, but it was submitted for the 2026 awards.",
  W008: "On the same page: Dom Pérignon 2015 at €360 and Cristal 2015 at €430.",
  W044: "From a separate Champagne list.",
  W040: "The list prints this bottle as Grande Cuvée “2006” with Krug iD 219 011. The edition can’t be confirmed, so it isn’t counted in the median.",
}

/**
 * Log–log least-squares fit of Dom Pérignon 2015 on Krug, over the paired lists.
 * Used by the "read a list" tool; the held-out error of this model is study.dpHoldout.krugMae.
 */
export const dpFit = (() => {
  const xs = dpPairs.map((p) => Math.log(p.krug))
  const ys = dpPairs.map((p) => Math.log(p.dp))
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length
  const my = ys.reduce((a, b) => a + b, 0) / ys.length
  let sxy = 0
  let sxx = 0
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my)
    sxx += (x - mx) ** 2
  })
  const slope = sxy / sxx
  return {
    slope,
    intercept: my - slope * mx,
    minKrug: Math.min(...dpPairs.map((p) => p.krug)),
    maxKrug: Math.max(...dpPairs.map((p) => p.krug)),
  }
})()

export const estimateDp = (krug: number) => Math.exp(dpFit.intercept + dpFit.slope * Math.log(krug))
