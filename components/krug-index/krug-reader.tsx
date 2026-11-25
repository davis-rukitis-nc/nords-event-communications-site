"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { primaryVenues, dpFit, estimateDp, krugIndex, formatEur, study, BENCHMARK_EUR } from "@/lib/data/krug-index"
import { useWidth } from "./use-width"

const MIN = 250
const MAX = 900
const N = primaryVenues.length
const round5 = (n: number) => Math.round(n / 5) * 5
const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n))

/**
 * "Reading a wine list?" A guest enters the Krug price they see; the tool places it among the 2026 lists
 * and estimates Dom Pérignon 2015 from the fitted relationship. No venue is singled out.
 * Every result cell has a fixed shape so the block doesn't jump while the slider moves.
 */
export default function KrugReader() {
  const [price, setPrice] = useState(450)
  const [draft, setDraft] = useState("450")

  const set = (n: number) => {
    const v = clamp(Math.round(n))
    setPrice(v)
    setDraft(String(v))
  }

  const idx = Math.round(krugIndex(price))
  const below = primaryVenues.filter((v) => v.drinkIn < price).length
  const same = primaryVenues.filter((v) => v.drinkIn === price).length
  const dp = round5(estimateDp(price))
  const outside = price < dpFit.minKrug || price > dpFit.maxKrug
  const nearest = [...primaryVenues]
    .sort((a, b) => Math.abs(a.drinkIn - price) - Math.abs(b.drinkIn - price) || a.name.localeCompare(b.name))
    .slice(0, 3)
    .sort((a, b) => a.drinkIn - b.drinkIn || a.name.localeCompare(b.name))

  const rank =
    below === 0 && same === 0
      ? `Lower than all ${N} lists`
      : below === N
        ? `Higher than all ${N} lists`
        : `Higher than ${below} of ${N} lists`

  return (
    <div className="rounded-2xl bg-[#f1f1f1] p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-950 md:text-3xl">Reading a wine list?</h2>
          <p className="mt-2 max-w-xl text-neutral-600">Find Krug Grande Cuvée on it and put in the bottle price.</p>
        </div>
        <label className="flex items-center gap-1 rounded-full bg-white px-4 py-2 ring-1 ring-neutral-300 focus-within:ring-2 focus-within:ring-neutral-950">
          <span className="text-2xl font-bold text-neutral-950" aria-hidden>
            €
          </span>
          <span className="sr-only">Krug Grande Cuvée bottle price in euros</span>
          <input
            type="number"
            inputMode="numeric"
            min={MIN}
            max={MAX}
            step={5}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value)
              const n = Number(e.target.value)
              if (e.target.value !== "" && n >= MIN && n <= MAX) setPrice(Math.round(n))
            }}
            onBlur={() => set(Number(draft) || price)}
            className="w-20 [appearance:textfield] bg-transparent text-2xl font-bold text-neutral-950 tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </label>
      </div>

      <PriceStrip price={price} onPick={set} />
      <input
        type="range"
        min={MIN}
        max={MAX}
        step={5}
        value={price}
        onChange={(e) => set(Number(e.target.value))}
        aria-label="Krug Grande Cuvée bottle price"
        aria-valuetext={formatEur(price)}
        className="mt-1 block h-2 w-full cursor-pointer accent-neutral-950"
      />
      <div className="mt-2 flex justify-between text-xs text-neutral-500 tabular-nums">
        <span>€{MIN}</span>
        <span className="hidden sm:inline">Each dot is one of the {N} lists in the 2026 awards</span>
        <span>€{MAX}</span>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl bg-neutral-300 md:grid-cols-3" aria-live="polite">
        <div className="flex min-h-[150px] flex-col bg-white p-5">
          <p className="text-sm text-neutral-500">Krug Index</p>
          <p className="mt-1 text-4xl font-bold text-neutral-950 tabular-nums">{idx}</p>
          <p className="mt-auto pt-3 text-sm text-neutral-700">
            {rank}
            <span className="block text-neutral-500">{same ? `${same} at exactly this price` : " "}</span>
          </p>
        </div>
        <div className="flex min-h-[150px] flex-col bg-white p-5">
          <p className="text-sm text-neutral-500">Dom Pérignon 2015, probably</p>
          <p className="mt-1 text-4xl font-bold text-neutral-950 tabular-nums">{formatEur(dp)}</p>
          <p className="mt-auto pt-3 text-sm text-neutral-700">
            Usually within about €{Math.round(study.dpHoldout.krugMae)}
            <span className="block text-neutral-500">{outside ? "Outside the prices we saw" : " "}</span>
          </p>
        </div>
        <div className="flex min-h-[150px] flex-col bg-white p-5">
          <p className="text-sm text-neutral-500">Closest Krug prices in 2026</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {nearest.map((v) => (
              <li key={v.id} className="flex items-baseline justify-between gap-3">
                <a
                  href={v.menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 items-center gap-1 font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
                >
                  <span className="truncate">{v.name}</span>
                  <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                  <span className="sr-only">wine list (opens in new tab)</span>
                </a>
                <span className="shrink-0 text-neutral-600 tabular-nums">{formatEur(v.drinkIn)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-sm text-neutral-600">
        The reds and whites are another matter. Krug says little about them, so read the list.
      </p>
    </div>
  )
}

/** All 2026 prices as dots on the slider's own scale, with the chosen price marked. */
function PriceStrip({ price, onPick }: { price: number; onPick: (n: number) => void }) {
  const [ref, width] = useWidth<HTMLDivElement>()
  // Keep the strip aligned with the native range thumb (about 16px wide).
  const inset = 8
  const x = (p: number) => inset + ((p - MIN) / (MAX - MIN)) * (width - 2 * inset)
  const R = 4.5
  const step = 2 * R + 2
  const levels = 6
  const height = 22 + levels * step

  const dots = useMemo(() => {
    const out: { id: string; name: string; p: number; cx: number; level: number }[] = []
    for (const v of [...primaryVenues].sort((a, b) => a.drinkIn - b.drinkIn || a.name.localeCompare(b.name))) {
      const cx = x(v.drinkIn)
      let level = 0
      while (out.some((o) => o.level === level && Math.abs(o.cx - cx) < step)) level++
      out.push({ id: v.id, name: v.name, p: v.drinkIn, cx, level: Math.min(level, levels - 1) })
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const base = height - 4
  return (
    <div ref={ref} className="mt-8">
      <svg width={width} height={height} className="block" aria-hidden>
        <line x1={x(BENCHMARK_EUR)} x2={x(BENCHMARK_EUR)} y1={12} y2={base} stroke="#9c695a" strokeWidth={1} />
        {Math.abs(x(price) - x(BENCHMARK_EUR)) > 26 && (
          <text x={x(BENCHMARK_EUR)} y={8} textAnchor="middle" className="fill-[#7a5245] text-[10px] font-semibold">
            median
          </text>
        )}
        {dots.map((d) => (
          <circle
            key={d.id}
            cx={d.cx}
            cy={base - R - d.level * step}
            r={R}
            fill={d.p <= price ? "#231F20" : "#bdbdbd"}
            className="cursor-pointer"
            onClick={() => onPick(d.p)}
          >
            <title>{`${d.name}, ${formatEur(d.p)}`}</title>
          </circle>
        ))}
        <line x1={x(price)} x2={x(price)} y1={0} y2={height} stroke="#231F20" strokeWidth={2} />
      </svg>
    </div>
  )
}
