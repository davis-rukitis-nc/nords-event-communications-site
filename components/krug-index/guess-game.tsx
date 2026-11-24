"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { primaryVenues, COUNTRY_NAMES, editionLabel, formatEur } from "@/lib/data/krug-index"

/** Fixed starting order so server and client render the same first card. */
const ORDER = [...primaryVenues].sort((a, b) => a.name.localeCompare(b.name)).map((v) => v.id)
const START = Math.max(0, ORDER.indexOf("W021"))

export default function GuessGame() {
  const [pos, setPos] = useState(START)
  const [guess, setGuess] = useState(400)
  const [revealed, setRevealed] = useState(false)
  const [misses, setMisses] = useState<number[]>([])

  const v = primaryVenues.find((x) => x.id === ORDER[pos])!
  const off = Math.abs(guess - v.drinkIn)
  const avg = misses.length ? Math.round(misses.reduce((a, b) => a + b, 0) / misses.length) : null

  const reveal = () => {
    setRevealed(true)
    setMisses((m) => [...m, off])
  }
  const next = () => {
    let n = pos
    if (ORDER.length > 1) while (n === pos) n = Math.floor(Math.random() * ORDER.length)
    setPos(n)
    setRevealed(false)
    setGuess(400)
  }

  return (
    <div className="rounded-2xl bg-[#f1f1f1] p-6 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-bold text-neutral-950 md:text-3xl">Your turn</h2>
        {avg !== null && (
          <p className="text-sm text-neutral-500 tabular-nums">
            {misses.length} {misses.length === 1 ? "guess" : "guesses"}, {formatEur(avg)} off on average
          </p>
        )}
      </div>
      <p className="mt-2 text-neutral-600">How much is a bottle of Krug Grande Cuvée here?</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="text-xl font-semibold text-neutral-950">{v.name}</p>
          <p className="text-neutral-600">
            {v.type}, {v.city}, {COUNTRY_NAMES[v.country]}
          </p>
          <label htmlFor="krug-guess" className="sr-only">
            Your guess in euros
          </label>
          <div className="mt-6 flex items-center gap-5">
            <input
              id="krug-guess"
              type="range"
              min={250}
              max={850}
              step={5}
              value={guess}
              disabled={revealed}
              onChange={(e) => setGuess(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-neutral-950 disabled:cursor-default"
            />
            <output htmlFor="krug-guess" className="w-20 text-right text-2xl font-bold text-neutral-950 tabular-nums">
              €{guess}
            </output>
          </div>
        </div>

        <div aria-live="polite">
          {!revealed ? (
            <button
              type="button"
              onClick={reveal}
              className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Check
            </button>
          ) : (
            <div>
              <p className="text-lg text-neutral-800">
                It&rsquo;s <strong className="text-neutral-950">{formatEur(v.drinkIn)}</strong> ({editionLabel(v).toLowerCase()}).{" "}
                {off === 0 ? "Spot on." : `You were ${formatEur(off)} ${guess > v.drinkIn ? "over" : "under"}.`}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Another one
                </button>
                <a
                  href={v.menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-neutral-800 underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-950"
                >
                  {v.name} wine list <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
