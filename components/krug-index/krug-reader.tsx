"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { primaryVenues, dpFit, estimateDp, krugIndex, formatEur, study } from "@/lib/data/krug-index"

const round5 = (n: number) => Math.round(n / 5) * 5

/**
 * "Reading a list?" A guest enters the Krug price they see; the tool places it among the 2026 lists
 * and estimates Dom Pérignon 2015 from the fitted relationship. No venue is singled out.
 */
export default function KrugReader() {
  const [price, setPrice] = useState(450)

  const idx = Math.round(krugIndex(price))
  const below = primaryVenues.filter((v) => v.drinkIn < price).length
  const same = primaryVenues.filter((v) => v.drinkIn === price).length
  const dp = round5(estimateDp(price))
  const outside = price < dpFit.minKrug || price > dpFit.maxKrug
  const nearest = [...primaryVenues]
    .sort((a, b) => Math.abs(a.drinkIn - price) - Math.abs(b.drinkIn - price) || a.name.localeCompare(b.name))
    .slice(0, 3)
    .sort((a, b) => a.drinkIn - b.drinkIn)

  const n = primaryVenues.length
  const position =
    below === 0 && same === 0
      ? "Lower than every list in the 2026 awards."
      : below === n
        ? "Higher than every list in the 2026 awards."
        : `Higher than ${below} of the ${n} lists in the 2026 awards${same ? `, the same as ${same === 1 ? "one" : same}` : ""}.`

  return (
    <div className="rounded-2xl bg-[#f1f1f1] p-6 md:p-10">
      <h2 className="text-2xl font-bold text-neutral-950 md:text-3xl">Reading a wine list?</h2>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Put in the price of a bottle of Krug Grande Cuvée on the list in front of you.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <label htmlFor="krug-price" className="text-sm text-neutral-600">
            Krug Grande Cuvée, one bottle
          </label>
          <div className="mt-2 flex items-center gap-5">
            <input
              id="krug-price"
              type="range"
              min={250}
              max={900}
              step={5}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-neutral-950"
            />
            <output htmlFor="krug-price" className="w-24 text-right text-3xl font-bold text-neutral-950 tabular-nums">
              €{price}
            </output>
          </div>
        </div>

        <dl className="divide-y divide-neutral-300 border-y border-neutral-300 lg:col-span-7" aria-live="polite">
          <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-neutral-600">Krug Index</dt>
            <dd className="text-neutral-800">
              <strong className="text-neutral-950">{idx}</strong>. {position}
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-neutral-600">Dom Pérignon 2015</dt>
            <dd className="text-neutral-800">
              Probably around <strong className="text-neutral-950">{formatEur(dp)}</strong>, if it&rsquo;s on the
              list. On the 2026 lists this kind of estimate was off by about €{Math.round(study.dpHoldout.krugMae)}.
              {outside && (
                <span className="text-neutral-500">
                  {" "}
                  Treat it loosely: no list we checked had Krug at this price.
                </span>
              )}
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-neutral-600">Reds and whites</dt>
            <dd className="text-neutral-800">Krug doesn&rsquo;t tell you much here. Read the list.</dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-neutral-600">Similar Krug prices</dt>
            <dd>
              <ul className="space-y-1">
                {nearest.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <a
                      href={v.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-neutral-950 underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-950"
                    >
                      {v.name}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">wine list (opens in new tab)</span>
                    </a>
                    <span className="text-neutral-600 tabular-nums">
                      {v.city}, {formatEur(v.drinkIn)}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
