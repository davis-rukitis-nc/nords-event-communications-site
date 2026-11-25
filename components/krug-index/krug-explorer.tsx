"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, ArrowDown, ArrowUp } from "lucide-react"
import {
  venues,
  dpPairs,
  BENCHMARK_EUR,
  COUNTRY_NAMES,
  krugIndex,
  ordinal,
  formatEur,
  summarize,
  venueNotes,
  type CountryCode,
  type KrugVenue,
} from "@/lib/data/krug-index"
import { countryShapes, project, MAP_FRAME } from "@/lib/data/krug-index/geo"
import { useWidth } from "./use-width"

type CountryFilter = "all" | CountryCode
type EditionFilter = "all" | "none" | number
type SortKey = "name" | "city" | "edition" | "drinkIn"

const EDITIONS = [...new Set(venues.map((v) => v.edition).filter((e): e is number => e !== null))].sort((a, b) => b - a)

const chip =
  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
const chipOn = "border-neutral-950 bg-neutral-950 text-white"
const chipOff = "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"

export default function KrugExplorer() {
  const [country, setCountry] = useState<CountryFilter>("all")
  const [edition, setEdition] = useState<EditionFilter>("all")
  const [withLegacy, setWithLegacy] = useState(false)
  const [city, setCity] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "drinkIn", dir: 1 })

  const filtered = useMemo(
    () =>
      venues.filter(
        (v) =>
          (withLegacy || v.scope === "primary") &&
          (country === "all" || v.country === country) &&
          (edition === "all" || (edition === "none" ? v.edition === null : v.edition === edition)),
      ),
    [country, edition, withLegacy],
  )

  // A city chosen on the map narrows the list further; drop it if the filters removed that city.
  const activeCity = city && filtered.some((v) => v.city === city) ? city : null
  const shown = activeCity ? filtered.filter((v) => v.city === activeCity) : filtered
  const selected = shown.find((v) => v.id === selectedId) ?? null

  const sorted = useMemo(() => {
    const val = (v: KrugVenue) =>
      sort.key === "drinkIn" ? v.drinkIn : sort.key === "edition" ? (v.edition ?? 0) : v[sort.key].toLowerCase()
    return [...shown].sort((a, b) => {
      const x = val(a)
      const y = val(b)
      return (x < y ? -1 : x > y ? 1 : a.name.localeCompare(b.name)) * sort.dir
    })
  }, [shown, sort])

  const summary = shown.length ? summarize(shown) : null

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: 1 }))

  const select = (id: string | null) => setSelectedId((cur) => (cur === id ? null : id))

  return (
    <div>
      {/* Filters: one row above everything they control */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3" role="group" aria-label="Filter venues">
        <div className="flex flex-wrap gap-2">
          {(["all", "EE", "LV", "LT"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={country === c}
              onClick={() => {
                setCountry(c)
                setCity(null)
              }}
              className={`${chip} ${country === c ? chipOn : chipOff}`}
            >
              {c === "all" ? "All Baltics" : COUNTRY_NAMES[c]}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <span className="text-neutral-500">Edition</span>
          <select
            value={String(edition)}
            onChange={(e) => {
              const v = e.target.value
              setEdition(v === "all" || v === "none" ? v : Number(v))
            }}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium"
          >
            <option value="all">All editions</option>
            {EDITIONS.map((e) => (
              <option key={e} value={e}>
                {ordinal(e)} only
              </option>
            ))}
            <option value="none">Not stated on menu</option>
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={withLegacy}
            onChange={(e) => setWithLegacy(e.target.checked)}
            className="size-4 accent-neutral-950"
          />
          Include Riviera (edition unclear)
        </label>
      </div>

      <p className="mt-4 text-sm text-neutral-500" aria-live="polite">
        {summary ? (
          <>
            {summary.n} {summary.n === 1 ? "venue" : "venues"}
            {activeCity ? ` in ${activeCity}` : ""}, median {formatEur(summary.median)}.
          </>
        ) : (
          "No venue matches these filters."
        )}
        {activeCity && (
          <button
            type="button"
            onClick={() => setCity(null)}
            className="ml-2 font-medium text-neutral-900 underline decoration-1 underline-offset-4"
          >
            Show all cities
          </button>
        )}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <BalticMap venues={filtered} activeCity={activeCity} onCity={(c) => setCity((cur) => (cur === c ? null : c))} />
        </div>
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <PriceLadder venues={shown} selectedId={selected?.id ?? null} onSelect={select} />
          <VenueCard venue={selected} onClose={() => setSelectedId(null)} />
        </div>
      </div>

      {/* The table is the accessible, complete view of the same data */}
      <div className="relative mt-12 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm sm:min-w-[640px]">
          <caption className="sr-only">
            Krug Grande Cuvée drink-in prices by venue, lists submitted to the 2026 Baltic Wine &amp; Drinks Awards. Index 100 ={" "}
            {formatEur(BENCHMARK_EUR)}.
          </caption>
          <thead>
            <tr className="border-b border-neutral-950 text-sm text-neutral-500">
              <SortHeader label="Venue" k="name" sort={sort} onSort={toggleSort} />
              <SortHeader label="City" k="city" sort={sort} onSort={toggleSort} className="hidden sm:table-cell" />
              <SortHeader label="Edition" k="edition" sort={sort} onSort={toggleSort} className="hidden sm:table-cell" />
              <th scope="col" className="hidden py-3 pr-4 text-right font-medium sm:table-cell">
                Listed
              </th>
              <SortHeader label="Price" k="drinkIn" sort={sort} onSort={toggleSort} align="right" />
              <th scope="col" className="py-3 pr-4 text-right font-medium">
                Index
              </th>
              <th scope="col" className="py-3 text-right font-semibold">
                <span className="sr-only">Links</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v) => {
              const idx = Math.round(krugIndex(v.drinkIn))
              const isSel = v.id === selected?.id
              return (
                <tr
                  key={v.id}
                  className={`border-b border-neutral-200 ${isSel ? "bg-[#fad0c5]/50" : "hover:bg-neutral-50"}`}
                >
                  <th scope="row" className="py-3 pr-4 font-medium text-neutral-950">
                    <button
                      type="button"
                      onClick={() => select(v.id)}
                      aria-pressed={isSel}
                      className="text-left underline decoration-neutral-300 decoration-1 underline-offset-4 hover:decoration-neutral-950"
                    >
                      {v.name}
                    </button>
                    <span className="block text-xs font-normal text-neutral-500 sm:hidden">{v.city}</span>
                    {v.scope === "legacy-id" && (
                      <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                        not counted
                      </span>
                    )}
                  </th>
                  <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell">{v.city}</td>
                  <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell">{v.edition ?? (v.scope === "legacy-id" ? "iD" : "—")}</td>
                  <td className="hidden py-3 pr-4 text-right text-neutral-600 tabular-nums sm:table-cell">
                    {formatEur(v.printed)}
                    {v.bottleFee > 0 && <span className="text-neutral-500"> + {formatEur(v.bottleFee)}</span>}
                  </td>
                  <td className="py-3 pr-4 text-right font-semibold text-neutral-950 tabular-nums">
                    {formatEur(v.drinkIn)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums">
                    <IndexBadge value={idx} />
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <a
                      href={v.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-950"
                    >
                      Wine list <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">for {v.name} (opens in new tab)</span>
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SortHeader({
  label,
  k,
  sort,
  onSort,
  align = "left",
  className = "",
}: {
  label: string
  k: SortKey
  sort: { key: SortKey; dir: 1 | -1 }
  onSort: (k: SortKey) => void
  align?: "left" | "right"
  className?: string
}) {
  const active = sort.key === k
  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
      className={`py-3 pr-4 font-medium ${align === "right" ? "text-right" : ""} ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1 ${active ? "text-neutral-950" : "hover:text-neutral-800"}`}
      >
        {label}
        {active &&
          (sort.dir === 1 ? <ArrowUp className="size-3" aria-hidden /> : <ArrowDown className="size-3" aria-hidden />)}
      </button>
    </th>
  )
}

export function IndexBadge({ value }: { value: number }) {
  const diff = value - 100
  return (
    <span className="inline-flex min-w-[3.25rem] items-baseline justify-end gap-1 font-semibold text-neutral-950">
      {value}
      <span className="text-[11px] font-medium text-neutral-500">
        {diff === 0 ? "=" : diff > 0 ? `+${diff}` : `−${Math.abs(diff)}`}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ map */

function BalticMap({
  venues: list,
  activeCity,
  onCity,
}: {
  venues: KrugVenue[]
  activeCity: string | null
  onCity: (city: string) => void
}) {
  const clusters = useMemo(() => {
    const by = new Map<string, KrugVenue[]>()
    for (const v of list) by.set(v.city, [...(by.get(v.city) ?? []), v])
    return [...by.entries()].map(([name, vs]) => {
      const lon = vs.reduce((s, v) => s + v.lon, 0) / vs.length
      const lat = vs.reduce((s, v) => s + v.lat, 0) / vs.length
      const [x, y] = project(lon, lat)
      return { name, vs, x, y, median: summarize(vs).median }
    })
  }, [list])

  const labels: Record<string, string> = { Estonia: "ESTONIA", Latvia: "LATVIA", Lithuania: "LITHUANIA" }
  const labelPos: Record<string, [number, number]> = {
    Estonia: [25.9, 58.75],
    Latvia: [26.2, 56.62],
    Lithuania: [23.9, 55.55],
  }

  return (
    <figure className="overflow-hidden rounded-2xl bg-[#f1f1f1]">
      <svg
        viewBox={`0 0 ${MAP_FRAME.width} ${MAP_FRAME.height}`}
        className="block h-auto w-full"
        role="group"
        aria-label="Map of the Baltic states with venues grouped by city. Choose a city to filter the list."
      >
        <rect width={MAP_FRAME.width} height={MAP_FRAME.height} fill="#e4e6e8" />
        {countryShapes.map((c) => (
          <path
            key={c.name}
            d={c.d}
            fill={c.focus ? "#ffffff" : "#f1f1f1"}
            stroke={c.focus ? "#bdbdbd" : "#d4d4d4"}
            strokeWidth={c.focus ? 1 : 0.8}
            strokeLinejoin="round"
          />
        ))}
        {Object.entries(labelPos).map(([name, [lon, lat]]) => {
          const [x, y] = project(lon, lat)
          return (
            <text
              key={name}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-neutral-400 text-[11px] font-semibold tracking-[0.25em]"
              aria-hidden
            >
              {labels[name]}
            </text>
          )
        })}
        {clusters.map((c) => {
          const r = 11 + 3.2 * Math.sqrt(c.vs.length)
          const active = activeCity === c.name
          const dim = activeCity && !active
          const labelLeft = c.name === "Rīga" || c.name === "Kaunas"
          return (
            <g
              key={c.name}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`${c.name}: ${c.vs.length} ${c.vs.length === 1 ? "venue" : "venues"}, median ${formatEur(c.median)}`}
              onClick={() => onCity(c.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onCity(c.name)
                }
              }}
              className="cursor-pointer outline-none [&:focus-visible>circle:first-of-type]:stroke-neutral-950"
              opacity={dim ? 0.45 : 1}
            >
              {/* One hit area over the dot and its label, so either can be tapped */}
              <rect
                x={labelLeft ? c.x - r - 100 : c.x - r - 6}
                y={c.y - r - 6}
                width={2 * r + 106}
                height={2 * r + 12}
                rx={8}
                fill="transparent"
              />
              <circle cx={c.x} cy={c.y} r={r + 8} fill="transparent" stroke="transparent" strokeWidth={2} />
              <circle
                cx={c.x}
                cy={c.y}
                r={r}
                fill={active ? "#fad0c5" : "#231F20"}
                stroke={active ? "#231F20" : "#ffffff"}
                strokeWidth={2}
              />
              <text
                x={c.x}
                y={c.y}
                dy="0.35em"
                textAnchor="middle"
                className={`text-[13px] font-bold ${active ? "fill-neutral-950" : "fill-white"}`}
              >
                {c.vs.length}
              </text>
              <text
                x={labelLeft ? c.x - r - 6 : c.x + r + 6}
                y={c.y - 3}
                textAnchor={labelLeft ? "end" : "start"}
                className="fill-neutral-950 text-[13px] font-semibold"
              >
                {c.name}
              </text>
              <text
                x={labelLeft ? c.x - r - 6 : c.x + r + 6}
                y={c.y + 12}
                textAnchor={labelLeft ? "end" : "start"}
                className="fill-neutral-500 text-[11px] font-medium"
              >
                median {formatEur(c.median)}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="flex flex-wrap justify-between gap-2 px-4 py-3 text-[11px] text-neutral-500">
        <span>Grouped by city. Tap a city to filter.</span>
        <span>Outlines: Natural Earth</span>
      </figcaption>
    </figure>
  )
}

/* --------------------------------------------------------------- ladder */

const LO = 290
const HI = 830

function PriceLadder({
  venues: list,
  selectedId,
  onSelect,
}: {
  venues: KrugVenue[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = useState<string | null>(null)
  const padL = 12
  const padR = 12
  const x = (p: number) => padL + ((p - LO) / (HI - LO)) * (width - padL - padR)
  const R = 8
  const step = 2 * R + 3

  // Stack dots that would overlap into columns, cheapest first.
  const placed = useMemo(() => {
    const out: { v: KrugVenue; cx: number; level: number }[] = []
    for (const v of [...list].sort((a, b) => a.drinkIn - b.drinkIn || a.name.localeCompare(b.name))) {
      const cx = x(v.drinkIn)
      let level = 0
      while (out.some((o) => o.level === level && Math.abs(o.cx - cx) < step)) level++
      out.push({ v, cx, level })
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, width])

  const levels = Math.max(3, ...placed.map((p) => p.level + 1))
  const top = 34
  const base = top + levels * step + 4
  const height = base + 30
  const ticks = [300, 400, 500, 600, 700, 800]
  const tip = placed.find((p) => p.v.id === (hover ?? selectedId))

  return (
    <div className="rounded-2xl border border-neutral-200 p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium text-neutral-700">Price of a bottle</h3>
        <span className="text-xs text-neutral-500">each dot is one venue</span>
      </div>
      <div ref={ref} className="relative mt-3">
        <svg width={width} height={height} className="block overflow-visible" role="group" aria-label="Price ladder">
          <line x1={x(BENCHMARK_EUR)} x2={x(BENCHMARK_EUR)} y1={18} y2={base} stroke="#9c695a" strokeWidth={1.5} />
          <text x={x(BENCHMARK_EUR)} y={12} textAnchor="middle" className="fill-[#7a5245] text-[11px] font-semibold">
            median {formatEur(BENCHMARK_EUR)}
          </text>
          <line x1={padL} x2={width - padR} y1={base} y2={base} stroke="#d4d4d4" />
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={base} y2={base + 5} stroke="#d4d4d4" />
              <text x={x(t)} y={base + 18} textAnchor="middle" className="fill-neutral-500 text-[11px] tabular-nums">
                €{t}
              </text>
            </g>
          ))}
          {placed.map(({ v, cx, level }) => {
            const cy = base - R - 3 - level * step
            const isSel = v.id === selectedId
            const legacy = v.scope === "legacy-id"
            return (
              <g
                key={v.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`${v.name}, ${v.city}: ${formatEur(v.drinkIn)}, index ${Math.round(krugIndex(v.drinkIn))}`}
                onClick={() => onSelect(v.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelect(v.id)
                  }
                }}
                onMouseEnter={() => setHover(v.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(v.id)}
                onBlur={() => setHover(null)}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-neutral-950"
              >
                <circle cx={cx} cy={cy} r={R + 5} fill="transparent" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSel ? R + 1.5 : R}
                  fill={isSel ? "#fad0c5" : legacy ? "#ffffff" : "#231F20"}
                  stroke={isSel || legacy ? "#231F20" : "#ffffff"}
                  strokeWidth={2}
                />
              </g>
            )
          })}
        </svg>
        {tip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-950 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg"
            style={{
              left: Math.min(Math.max(tip.cx, 80), width - 80),
              top: base - R - 3 - tip.level * step - 14,
            }}
          >
            <span className="font-semibold">{tip.v.name}</span>
            <span className="text-white/70">
              {" "}
              · {formatEur(tip.v.drinkIn)} · index {Math.round(krugIndex(tip.v.drinkIn))}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- venue card */

function VenueCard({ venue: v, onClose }: { venue: KrugVenue | null; onClose: () => void }) {
  if (!v) {
    return (
      <div className="flex min-h-[220px] flex-1 flex-col justify-center rounded-2xl bg-[#f1f1f1] p-6 md:p-8">
        <p className="max-w-md text-neutral-600">
          Choose a venue on the chart or in the table to see the details and its full 2026 wine list.
        </p>
      </div>
    )
  }
  const idx = krugIndex(v.drinkIn)
  const delta = v.drinkIn - BENCHMARK_EUR
  const dp = dpPairs.find((p) => p.id === v.id)
  const note = venueNotes[v.id]

  return (
    <article className="flex-1 rounded-2xl border border-neutral-200 p-6 md:p-8" aria-live="polite">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-neutral-950 md:text-3xl">{v.name}</h3>
          <p className="mt-1 text-neutral-600">
            {v.type}, {v.city}, {COUNTRY_NAMES[v.country]}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-2 py-1 text-sm text-neutral-500 hover:bg-black/5 hover:text-neutral-900"
        >
          Close
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-5">
        <div>
          <p className="text-sm text-neutral-500">Price</p>
          <p className="mt-1 text-2xl font-bold text-neutral-950 tabular-nums md:text-3xl">{formatEur(v.drinkIn)}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-500">Index</p>
          <p className="mt-1 text-2xl font-bold text-neutral-950 tabular-nums md:text-3xl">{Math.round(idx)}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-500">vs median</p>
          <p className="mt-1 text-2xl font-bold text-neutral-950 tabular-nums md:text-3xl">
            {delta === 0 ? "±€0" : `${delta > 0 ? "+" : "−"}${formatEur(Math.abs(delta))}`}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-neutral-800">
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-neutral-600">On the list</dt>
          <dd>{v.label}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-neutral-600">Edition</dt>
          <dd>{v.edition ? `${ordinal(v.edition)}` : v.scope === "legacy-id" ? "Krug iD 219 011" : "Not stated"}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-neutral-600">Listed</dt>
          <dd>
            {formatEur(v.printed)}
            {v.bottleFee > 0 ? `, plus ${formatEur(v.bottleFee)} to drink it on site` : ""}
          </dd>
        </div>
        {dp && (
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-neutral-600">Dom Pérignon</dt>
            <dd>{formatEur(dp.dp)} for the 2015</dd>
          </div>
        )}
      </dl>
      {note && <p className="mt-4 leading-relaxed text-neutral-600">{note}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={v.menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          2026 wine list <ArrowUpRight className="size-4" aria-hidden />
        </a>
        {v.resultUrl && (
          <a
            href={v.resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-950/30 px-4 py-2 text-sm font-semibold text-neutral-950 hover:border-neutral-950"
          >
            Baltic Wine &amp; Drinks Awards result <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  )
}
