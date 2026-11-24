"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { primaryVenues, COUNTRY_NAMES, editionLabel, formatEur, krugIndex } from "@/lib/data/krug-index"

/** Fixed starting order so server and client render the same first card. */
const ORDER = [...primaryVenues].sort((a, b) => a.name.localeCompare(b.name)).map((v) => v.id)
const START = ORDER.indexOf("W021") >= 0 ? ORDER.indexOf("W021") : 0

function verdict(off: number) {
  if (off <= 15) return "Sommelier-grade. You could run this list."
  if (off <= 40) return "Close. You've read a few of these."
  if (off <= 90) return "In the right cellar, wrong shelf."
  return "The card had other plans."
}

export default function GuessGame() {
  const [pos, setPos] = useState(START)
  const [guess, setGuess] = useState(400)
  const [revealed, setRevealed] = useState(false)
  const [history, setHistory] = useState<number[]>([])

  const v = primaryVenues.find((x) => x.id === ORDER[pos])!
  const off = Math.abs(guess - v.drinkIn)
  const avg = history.length ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null

  const reveal = () => {
    setRevealed(true)
    setHistory((h) => [...h, off])
  }
  const next = () => {
    let n = pos
    if (ORDER.length > 1) while (n === pos) n = Math.floor(Math.random() * ORDER.length)
    setPos(n)
    setRevealed(false)
    setGuess(400)
  }

  return (
    <div className="rounded-3xl bg-[#231F20] p-6 text-white md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.12em] text-[#fad0c5] uppercase">Guess the Krug</p>
        {avg !== null && (
          <p className="text-xs text-white/60 tabular-nums">
            {history.length} {history.length === 1 ? "round" : "rounds"} · average miss {formatEur(avg)}
          </p>
        )}
      </div>
      <h3 className="mt-4 text-3xl font-bold md:text-4xl">{v.name}</h3>
      <p className="mt-2 text-white/70">
        {v.type} · {v.city}, {COUNTRY_NAMES[v.country]}
      </p>

      <div className="mt-8">
        <label htmlFor="krug-guess" className="text-sm text-white/80">
          What does a bottle of Krug Grande Cuvée cost to drink here?
        </label>
        <div className="mt-3 flex items-center gap-5">
          <input
            id="krug-guess"
            type="range"
            min={250}
            max={850}
            step={5}
            value={guess}
            disabled={revealed}
            onChange={(e) => setGuess(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-[#fad0c5] disabled:cursor-default"
          />
          <output htmlFor="krug-guess" className="w-20 text-right text-3xl font-bold tabular-nums">
            €{guess}
          </output>
        </div>
      </div>

      <div className="mt-8 min-h-[120px]" aria-live="polite">
        {!revealed ? (
          <button
            type="button"
            onClick={reveal}
            className="rounded-full bg-[#fad0c5] px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-white"
          >
            Reveal the list price
          </button>
        ) : (
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">On the 2026 list</p>
              <p className="mt-1 text-5xl font-bold tabular-nums">{formatEur(v.drinkIn)}</p>
              <p className="mt-1 text-sm text-white/60">
                {editionLabel(v)} · index {Math.round(krugIndex(v.drinkIn))}
              </p>
            </div>
            <div className="md:pl-8">
              <p className="text-lg font-semibold">
                {off === 0 ? "Exactly right." : `You were ${formatEur(off)} ${guess > v.drinkIn ? "high" : "low"}.`}{" "}
                <span className="font-normal text-white/80">{verdict(off)}</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-[#fad0c5] px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-white"
                >
                  Next venue
                </button>
                <a
                  href={v.menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:border-white"
                >
                  See the whole list <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
