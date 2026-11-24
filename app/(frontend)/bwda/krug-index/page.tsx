import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import {
  primaryVenues,
  international,
  study,
  summarize,
  formatEur,
  BENCHMARK_EUR,
  type IntlReference,
} from "@/lib/data/krug-index"
import KrugExplorer from "@/components/krug-index/krug-explorer"
import DpChart from "@/components/krug-index/dp-chart"
import GuessGame from "@/components/krug-index/guess-game"

// Hidden page: not linked from the site, not in the sitemap, and noindex (here and via the /bwda/* header).
export const metadata: Metadata = generatePageMetadata({
  title: "The Krug Index 2026",
  description:
    "What a bottle of Krug Grande Cuvée costs on the wine lists entered for the 2026 Baltic Wine & Drinks Awards, and what that says about the rest of the list.",
  url: "/bwda/krug-index",
  noIndex: true,
})

const MENUS_URL = "https://menus.balticwinelists.com/2026"
const RESULTS_URL = "https://www.rigawinechampagne.lv/baltic-wine-drinks-awards/winners"

const all = summarize(primaryVenues)
const ed172 = primaryVenues.filter((v) => v.edition === 172).sort((a, b) => a.drinkIn - b.drinkIn)
const cheap172 = ed172[0]
const dear172 = ed172[ed172.length - 1]
const unnumbered = primaryVenues.filter((v) => v.edition === null).length
const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]
const byId = (id: string) => primaryVenues.find((v) => v.id === id)!

/** The local price the EUR figure is built from (tax-inclusive where the menu says so). */
function localPrice(r: IntlReference) {
  if (r.currency === "EUR" && !r.servicePct) return formatEur(r.printedLocal)
  const base = Math.round(r.withChargesLocal / (1 + (r.servicePct ?? 0) / 100))
  const tax = base !== r.printedLocal ? " incl. tax" : ""
  return `${r.currency} ${base.toLocaleString("en-GB")}${tax}${r.servicePct ? ` + ${r.servicePct}% service` : ""}`
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const
const link = "font-medium text-neutral-950 underline decoration-neutral-400 decoration-1 underline-offset-4 hover:decoration-neutral-950"
const h2 = "text-3xl font-bold text-neutral-950 md:text-4xl"
const prose = "max-w-2xl space-y-4 text-lg leading-relaxed text-neutral-600"

export default function KrugIndexPage() {
  const gaspars = byId("W015")
  const ttw = byId("W049")
  const dia = byId("W008")
  const uma = byId("W053")

  return (
    <div className="bg-white">
      <header className="overflow-hidden rounded-b-2xl bg-[#231F20] text-white">
        <div className="h-1.5 w-full bg-[#fad0c5]" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Link
              href="/events/baltic-wine-drinks-awards"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Baltic Wine &amp; Drinks Awards
            </Link>
            <h1 className="mt-6 text-5xl leading-[0.95] font-bold md:text-7xl">The Krug Index 2026</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Krug Grande Cuvée is on {all.n} of the wine lists entered for this year&rsquo;s awards. We wanted to
              know if its price says anything about how expensive the rest of the list is.
            </p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:items-end lg:text-right">
            <p className="text-7xl leading-none font-bold tabular-nums md:text-8xl">{formatEur(BENCHMARK_EUR)}</p>
            <p className="mt-3 max-w-xs text-white/70">
              median price of a bottle. Half the lists are between {formatEur(all.q1)} and {formatEur(all.q3)}.
            </p>
          </div>
        </div>
      </header>

      <section id="map" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={h2}>Krug on {all.n} lists</h2>
          <div className={`mt-5 ${prose}`}>
            <p>
              For each venue we took the price of one regular bottle of Krug Grande Cuvée, including any fixed fee
              for drinking it on site. The median, {formatEur(BENCHMARK_EUR)}, is 100 on the index, so a venue at
              €480 scores 123.
            </p>
            <p>
              It&rsquo;s a price comparison, nothing more. Plenty of the best lists in the awards don&rsquo;t carry
              Krug at all.
            </p>
          </div>
          <div className="mt-12">
            <KrugExplorer />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={h2}>A few things we noticed</h2>
          <ul className="mt-8 max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200 text-lg leading-relaxed text-neutral-700">
            <li className="py-5">
              The 172nd edition costs {formatEur(cheap172.drinkIn)} at {cheap172.name} and{" "}
              {formatEur(dear172.drinkIn)} at {dear172.name}. It&rsquo;s the same bottle.
            </li>
            <li className="py-5">
              Time to Wine in Tallinn prices its list like a shop. Krug is {formatEur(ttw.printed)} on the shelf,
              and {formatEur(ttw.bottleFee)} more if you drink it in the bar.
            </li>
            <li className="py-5">
              {gaspars.name} lists two editions, the 173rd at {formatEur(gaspars.drinkIn)} and the 171st at €425.{" "}
              {words[unnumbered] ?? unnumbered} lists don&rsquo;t say which edition they have.
            </li>
            <li className="py-5">
              DIA&rsquo;s list is a scan. On the same page as Krug: Dom Pérignon 2015 at €360 and Cristal 2015 at
              €430.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={h2}>Krug and Dom Pérignon</h2>
          <div className={`mt-5 ${prose}`}>
            <p>
              {words[study.dpHoldout.n] ?? study.dpHoldout.n} lists carry both Krug and Dom Pérignon 2015, and the
              two prices follow each other closely. Krug is usually a little more expensive, {study.dpPremiumPct}% at
              the median. Lee Brasserie, Lore Bistroo and UMA charge €390 for both.
            </p>
          </div>
          <div className="mt-12">
            <DpChart />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={h2}>The rest of the list</h2>
          <div className={`mt-5 ${prose}`}>
            <p>
              With still wines it didn&rsquo;t work. We matched wines that appear on several lists and ran the same
              test on the {study.stillFlex.n} venues with enough matches. The median of the other venues did better
              than Krug: {Math.round(study.stillFlex.medianMae)} index points off on average, against{" "}
              {Math.round(study.stillFlex.krugMae)} with Krug. With exact vintages there weren&rsquo;t enough matches
              to test at all.
            </p>
            <p>
              Muga Reserva 2021 is a good example. It costs €53 at {dia.name} and €155 at UMA. Krug goes the other way:
              {formatEur(dia.drinkIn)} at {dia.name}, {formatEur(uma.drinkIn)} at UMA.
            </p>
            <p>So Krug is a decent guide to other prestige Champagne. For the reds and whites, read the list.</p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <GuessGame />
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={h2}>Krug elsewhere</h2>
          <div className={`mt-5 ${prose}`}>
            <p>
              For comparison, four restaurants abroad that list the 173rd edition. Prices are from their own menus,
              checked on 24 November 2026, and converted at the ECB rate of 20 November. They aren&rsquo;t part of
              the Baltic median.
            </p>
          </div>
          <div className="relative mt-8 max-w-4xl overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-neutral-950 text-sm text-neutral-500">
                  <th scope="col" className="py-3 pr-4 font-medium">Restaurant</th>
                  <th scope="col" className="py-3 pr-4 font-medium">City</th>
                  <th scope="col" className="py-3 pr-4 font-medium">On the menu</th>
                  <th scope="col" className="py-3 text-right font-medium">In euros</th>
                </tr>
              </thead>
              <tbody>
                {international.map((r) => (
                  <tr key={r.venue} className="border-b border-neutral-200">
                    <th scope="row" className="py-4 pr-4 font-medium text-neutral-950">
                      <a href={r.menuUrl} {...ext} className={link}>
                        {r.venue}
                      </a>
                    </th>
                    <td className="py-4 pr-4 text-neutral-600">{r.city}</td>
                    <td className="py-4 pr-4 text-neutral-600 tabular-nums">{localPrice(r)}</td>
                    <td className="py-4 text-right font-semibold text-neutral-950 tabular-nums">{formatEur(r.eur)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-neutral-600">
            VEA in Hong Kong lists eight editions, from the 162nd to the 173rd. The oldest costs 72% more than the
            newest. O Gaveto goes from €325 for the 173rd to €355 for the 170th.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <h2 className={h2}>How it was done</h2>
            <p className="mt-5 text-neutral-600">
              All prices come from the lists submitted for the 2026 awards, each checked against the original menu
              page. They are listed prices, not what&rsquo;s in the cellar today.
            </p>
          </div>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-8">
            {[
              [
                "Which bottle counts?",
                "One regular Krug Grande Cuvée per venue, from the bottle section of the list. If several editions are listed, we took the newest one. Glasses, magnums, vintage Krug and rosé are left out. Riviera lists its bottle with a year and a Krug iD instead of an edition number, so we show it separately and it doesn’t count towards the median.",
              ],
              [
                "Which charges are included?",
                "A fixed fee for drinking the bottle on site, like Time to Wine’s €15, is included. Stage22’s 10% service charge is not, because the menu says it’s discretionary.",
              ],
              [
                "How was the prediction tested?",
                "We left out one venue at a time and estimated its price from the others, once using its Krug price and once using the median. We did this for Dom Pérignon 2015 (11 venues) and for a set of still wines (8 venues). Both samples are small.",
              ],
              [
                "Why no comparison between countries?",
                "The two hotel restaurants in the index are both in Latvia and both at the top of the range, and two of the Estonian venues are wine bars with a shop. The venue mix explains a lot of the difference, and 21 lists are too few to say anything about prices in each country.",
              ],
              [
                "Is this part of the awards?",
                "No. The jury judges the whole list, and the index doesn’t affect the results. It also doesn’t measure margins, since we don’t know what anyone paid for the wine. We have no connection to Krug or any other producer.",
              ],
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-neutral-950">
                  {q}
                  <span className="text-2xl leading-none font-normal text-neutral-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-lg leading-relaxed text-neutral-600">
            <p>
              Every list from the 2026 awards is on{" "}
              <a href={MENUS_URL} {...ext} className={link}>
                menus.balticwinelists.com
              </a>
              . The jury&rsquo;s results are on{" "}
              <a href={RESULTS_URL} {...ext} className={link}>
                rigawinechampagne.lv
              </a>
              .
            </p>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-neutral-500">
            Prices as printed on the lists submitted for the 2026 Baltic Wine &amp; Drinks Awards, checked 24
            November 2026. Map outlines: Natural Earth. Krug and Dom Pérignon are trademarks of their owners.
          </p>
        </div>
      </section>
    </div>
  )
}
