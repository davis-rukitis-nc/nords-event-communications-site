"use client"

import { useMemo, useState } from "react"
import { dpPairs, venues, study, formatEur } from "@/lib/data/krug-index"
import { useWidth } from "./use-width"

const nameOf = (id: string) => venues.find((v) => v.id === id)?.name ?? id
const MAX_ID = dpPairs.reduce((a, b) => (b.krug > a.krug ? b : a)).id

export default function DpChart() {
  const [dropMax, setDropMax] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [ref, width] = useWidth<HTMLDivElement>()

  const rows = dropMax ? dpPairs.filter((p) => p.id !== MAX_ID) : dpPairs
  const h = dropMax ? study.dpHoldoutNoMax : study.dpHoldout

  const lo = 250
  const hi = dropMax ? 650 : 850
  const height = Math.min(420, Math.max(280, width * 0.62))
  const box = { l: 46, r: width - 12, t: 14, b: height - 40 }
  const px = (n: number) => box.l + ((n - lo) / (hi - lo)) * (box.r - box.l)
  const py = (n: number) => box.b - ((n - lo) / (hi - lo)) * (box.b - box.t)
  const ticks = []
  for (let t = 300; t <= hi; t += 100) ticks.push(t)

  // Points sharing the same coordinates are drawn once, with a count.
  const points = useMemo(() => {
    const m = new Map<string, { krug: number; dp: number; ids: string[] }>()
    for (const r of rows) {
      const k = `${r.krug}|${r.dp}`
      const cur = m.get(k)
      if (cur) cur.ids.push(r.id)
      else m.set(k, { krug: r.krug, dp: r.dp, ids: [r.id] })
    }
    return [...m.values()]
  }, [rows])

  const tip = points.find((p) => p.ids.join() === hover)

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <figure className="min-w-0 rounded-2xl border border-neutral-200 p-5 md:p-6 lg:col-span-8">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase">
            Krug Grande Cuvée vs Dom Pérignon 2015, same list
          </span>
          <span className="text-xs text-neutral-500">{rows.length} venues</span>
        </figcaption>
        <div ref={ref} className="relative mt-4">
          <svg width={width} height={height} className="block" role="img" aria-label="Scatter plot of Krug Grande Cuvée price against Dom Pérignon 2015 price at the same venue. Details in the table below.">
            {ticks.map((t) => (
              <g key={t}>
                <line x1={box.l} x2={box.r} y1={py(t)} y2={py(t)} stroke="#ececec" />
                <text x={box.l - 8} y={py(t)} dy="0.35em" textAnchor="end" className="fill-neutral-500 text-[11px] tabular-nums">
                  €{t}
                </text>
                <text x={px(t)} y={box.b + 18} textAnchor="middle" className="fill-neutral-500 text-[11px] tabular-nums">
                  €{t}
                </text>
              </g>
            ))}
            <line x1={px(lo)} y1={py(lo)} x2={px(hi)} y2={py(hi)} stroke="#9c695a" strokeWidth={1.25} />
            <text
              x={px(620) + 10}
              y={py(620) + 14}
              className="fill-[#7a5245] text-[11px] font-semibold"
            >
              same price
            </text>
            <text x={box.r} y={box.b + 34} textAnchor="end" className="fill-neutral-600 text-[11px] font-medium">
              Krug Grande Cuvée →
            </text>
            <text x={box.l} y={box.t - 2} className="fill-neutral-600 text-[11px] font-medium" dx={6}>
              ↑ Dom Pérignon 2015
            </text>
            {points.map((p) => {
              const key = p.ids.join()
              const on = hover === key
              return (
                <g
                  key={key}
                  tabIndex={0}
                  role="img"
                  aria-label={`${p.ids.map(nameOf).join(", ")}: Krug ${formatEur(p.krug)}, Dom Pérignon 2015 ${formatEur(p.dp)}`}
                  onMouseEnter={() => setHover(key)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(key)}
                  onBlur={() => setHover(null)}
                  className="cursor-default outline-none"
                >
                  <circle cx={px(p.krug)} cy={py(p.dp)} r={14} fill="transparent" />
                  <circle
                    cx={px(p.krug)}
                    cy={py(p.dp)}
                    r={on ? 8 : 6.5}
                    fill={on ? "#fad0c5" : "#231F20"}
                    stroke={on ? "#231F20" : "#ffffff"}
                    strokeWidth={2}
                  />
                  {p.ids.length > 1 && (
                    <text x={px(p.krug) - 10} y={py(p.dp) - 8} textAnchor="end" className="fill-neutral-700 text-[11px] font-semibold">
                      ×{p.ids.length}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
          {tip && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white shadow-lg"
              style={{ left: Math.min(Math.max(px(tip.krug), 90), width - 90), top: py(tip.dp) - 14 }}
            >
              <div className="font-semibold">{tip.ids.map(nameOf).join(", ")}</div>
              <div className="text-white/70 tabular-nums">
                Krug {formatEur(tip.krug)} · DP 2015 {formatEur(tip.dp)}
              </div>
            </div>
          )}
        </div>
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-medium text-neutral-800">The paired prices</summary>
          <table className="mt-3 w-full text-left">
            <thead>
              <tr className="border-b border-neutral-300 text-xs tracking-[0.12em] text-neutral-500 uppercase">
                <th className="py-2 font-semibold">Venue</th>
                <th className="py-2 text-right font-semibold">Krug</th>
                <th className="py-2 text-right font-semibold">DP 2015</th>
              </tr>
            </thead>
            <tbody>
              {[...rows]
                .sort((a, b) => a.krug - b.krug)
                .map((r) => (
                  <tr key={r.id} className="border-b border-neutral-100">
                    <td className="py-2">{nameOf(r.id)}</td>
                    <td className="py-2 text-right tabular-nums">{formatEur(r.krug)}</td>
                    <td className="py-2 text-right tabular-nums">{formatEur(r.dp)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </details>
      </figure>

      <div className="flex flex-col gap-4 lg:col-span-4">
        <p className="text-sm leading-relaxed text-neutral-600">
          The test: hide one venue, then guess its Dom Pérignon price from the others. Once with that venue&rsquo;s
          Krug price as a clue, once with a plain median. Repeat for every venue.
        </p>
        <div className="rounded-2xl bg-[#fad0c5] p-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-700 uppercase">Guess using Krug</p>
          <p className="mt-1 text-4xl font-bold text-neutral-950 tabular-nums">
            €{Math.round(h.krugMae)} <span className="text-base font-medium text-neutral-700">off on average</span>
          </p>
        </div>
        <div className="rounded-2xl bg-[#f1f1f1] p-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-600 uppercase">Guess using the median</p>
          <p className="mt-1 text-4xl font-bold text-neutral-950 tabular-nums">
            €{Math.round(h.medianMae)} <span className="text-base font-medium text-neutral-600">off on average</span>
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={dropMax}
            onChange={(e) => setDropMax(e.target.checked)}
            className="size-4 accent-neutral-950"
          />
          Leave out the €800 bottle
        </label>
        <p className="text-xs leading-relaxed text-neutral-500">
          Correlation {dropMax ? study.dpPearsonNoMax : study.dpPearson} (Pearson), rank correlation{" "}
          {dropMax ? study.dpSpearmanNoMax : study.dpSpearman}. Eleven venues is a small sample: a strong clue for
          prestige Champagne on these lists, not a law.
        </p>
      </div>
    </div>
  )
}
