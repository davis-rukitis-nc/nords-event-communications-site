export type CountryCode = "EE" | "LV" | "LT"

export interface KrugVenue {
  id: string
  name: string
  city: string
  country: CountryCode
  type: string
  /** Krug Grande Cuvée edition number as printed; null when the menu states none. */
  edition: number | null
  /** The menu line as printed. */
  label: string
  /** Printed bottle price, EUR. */
  printed: number
  /** Mandatory bottle fee for drinking in (EUR), 0 if none. */
  bottleFee: number
  /** Discretionary service charge stated on the menu (%), 0 if none. Not added to the index. */
  discretionaryPct: number
  /** Printed price + mandatory bottle fee: the price the index uses. */
  drinkIn: number
  lon: number
  lat: number
  /** The venue's submitted 2026 list on menus.balticwinelists.com. */
  menuUrl: string
  resultUrl: string | null
  /** "primary" counts toward the benchmark; "legacy-id" is shown only as a sensitivity row. */
  scope: "primary" | "legacy-id"
}

export interface DpPair {
  id: string
  krug: number
  dp: number
}

export interface IntlReference {
  venue: string
  city: string
  country: string
  edition: number
  currency: string
  printedLocal: number
  withChargesLocal: number
  eur: number
  servicePct: number | null
  menuDate: string
  menuUrl: string
}

interface Holdout {
  n: number
  krugMae: number
  medianMae: number
}

export interface KrugStudyStats {
  dpHoldout: Holdout
  dpHoldoutNoMax: Holdout
  dpPearson: number
  dpSpearman: number
  dpPearsonNoMax: number
  dpSpearmanNoMax: number
  dpPremiumPct: number
  /** Still wines only, vintage-flexible basket; errors in index points. */
  stillFlex: Holdout
}
