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
  W015: "The same list also carries the 171st edition at €425. The index uses the newest numbered edition.",
  W021: "The bottle price sits in a 750 mL column on the by-the-glass page. A 125 mL pour of the same Krug is €68.",
  W050: "€315 is the shelf price. Drinking the bottle in the bar adds a €15 bottle fee.",
  W049: "€315 is the shelf price. Drinking the bottle in the bar adds a €15 bottle fee. Taken from the July 2026 list.",
  W038: "The 171st edition is listed too, also at €550.",
  W048: "The menu says a 10% discretionary service charge will be added. With it the bottle comes to €660; the index leaves it out.",
  W024: "The file name carries an 11-2025 date; it was submitted for the 2026 awards.",
  W008: "A scanned list. On the same page: Dom Pérignon 2015 at €360 and Cristal 2015 at €430.",
  W044: "Listed in a separate Champagne appendix to the wine list.",
  W040: "Printed as Grande Cuvée “2006” with Krug iD 219 011. The edition can't be confirmed from the menu, so this bottle stays out of the €390 benchmark.",
}
