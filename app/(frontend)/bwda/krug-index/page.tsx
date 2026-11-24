import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
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
    "What one bottle of Krug Grande Cuvée tells you about a Baltic wine list. Research on the menus submitted to the 2026 Baltic Wine & Drinks Awards.",
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
const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
const byId = (id: string) => primaryVenues.find((v) => v.id === id)!

/** How the EUR figure was built: the base the service charge applies to (tax-inclusive where the menu says so). */
function intlBasis(r: IntlReference) {
  if (r.currency === "EUR" && !r.servicePct) return "as listed"
  const base = Math.round(r.withChargesLocal / (1 + (r.servicePct ?? 0) / 100))
  const tax = base !== r.printedLocal ? " incl. tax" : ""
  return `${r.currency} ${base.toLocaleString("en-GB")}${tax}${r.servicePct ? ` + ${r.servicePct}% service` : ""}`
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase ${className}`}>{children}</p>
  )
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold text-neutral-950 md:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-neutral-600">{children}</div>}
    </div>
  )
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const
const inlineLink = "font-medium text-neutral-950 underline decoration-1 underline-offset-4 hover:decoration-2"

export default function KrugIndexPage() {
  const gaspars = byId("W015")
  const ttwKopli = byId("W049")
  const dia = byId("W008")
  const uma = byId("W053")

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative overflow-hidden rounded-b-2xl bg-[#231F20] text-white">
        <div className="h-1.5 w-full bg-[#fad0c5]" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Link
              href="/events/baltic-wine-drinks-awards"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#fad0c5] uppercase hover:text-white"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Baltic Wine &amp; Drinks Awards · 2026 research
            </Link>
            <h1 className="mt-6 text-5xl leading-[0.95] font-bold md:text-7xl lg:text-8xl">The Krug Index</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Can one bottle tell you how expensive the rest of the wine list will be? We followed Krug Grande
              Cuvée through the lists entered for the 2026 awards. It knew a lot about Dom Pérignon. About the Rioja,
              much less.
            </p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:items-end lg:text-right">
            <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
              Median price to drink it in
            </p>
            <p className="mt-2 text-7xl leading-none font-bold tabular-nums md:text-8xl">{formatEur(BENCHMARK_EUR)}</p>
            <p className="mt-3 text-white/70">
              {all.n} venues · {formatEur(all.min)} to {formatEur(all.max)}
            </p>
          </div>
        </div>
      </header>

      {/* Key numbers */}
      <section aria-label="Key numbers" className="border-b border-neutral-200">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 md:grid-cols-4 lg:px-8">
          {[
            ["Venues in the index", String(all.n), "Estonia, Latvia, Lithuania"],
            ["Index 100", formatEur(BENCHMARK_EUR), "the median bottle"],
            ["Middle half", `${formatEur(all.q1)}–${formatEur(all.q3)}`, "half the lists sit here"],
            ["Cheapest to dearest", `×${(all.max / all.min).toFixed(1)}`, `${formatEur(all.min)} → ${formatEur(all.max)}`],
          ].map(([label, value, sub]) => (
            <div key={label} className="border-l border-neutral-950 pl-4">
              <dt className="text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase">{label}</dt>
              <dd className="mt-2 text-3xl font-bold text-neutral-950 tabular-nums md:text-4xl">{value}</dd>
              <dd className="mt-1 text-sm text-neutral-500">{sub}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Explorer */}
      <section id="map" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow="Follow the bottle" title="One bottle, 21 lists">
            <p>
              One regular bottle of Krug Grande Cuvée per venue, at the price a guest pays to drink it there. An index
              of 100 is the median, {formatEur(BENCHMARK_EUR)}. It is a price, not a score: plenty of great lists
              don&rsquo;t carry Krug at all.
            </p>
          </SectionHead>
          <div className="mt-12">
            <KrugExplorer />
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="bg-[#f1f1f1] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow="Read the small print" title="Same Champagne, different stories" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 md:p-8">
              <p className="text-5xl font-bold text-neutral-950 tabular-nums">
                {formatEur(dear172.drinkIn - cheap172.drinkIn)}
              </p>
              <h3 className="mt-4 text-xl font-bold text-neutral-950">Same edition, different bill</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">
                The 172nd edition alone runs from {formatEur(cheap172.drinkIn)} at {cheap172.name} to{" "}
                {formatEur(dear172.drinkIn)} at {dear172.name}. Identical bottle, a gap that would buy a second one
                and change.
              </p>
            </article>
            <article className="rounded-2xl bg-white p-6 md:p-8">
              <p className="text-5xl font-bold text-neutral-950 tabular-nums">+{formatEur(ttwKopli.bottleFee)}</p>
              <h3 className="mt-4 text-xl font-bold text-neutral-950">Shelf price, then a fee</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">
                Time to Wine&rsquo;s two Tallinn bars price the list like a shop: {formatEur(ttwKopli.printed)} on the
                shelf, plus {formatEur(ttwKopli.bottleFee)} to have it opened at the table. The index counts{" "}
                {formatEur(ttwKopli.drinkIn)}, the price you&rsquo;d actually pay to drink it there.
              </p>
            </article>
            <article className="rounded-2xl bg-white p-6 md:p-8">
              <p className="text-5xl font-bold text-neutral-950 tabular-nums">3 editions</p>
              <h3 className="mt-4 text-xl font-bold text-neutral-950">Which Krug, exactly?</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">
                Every edition is a different blend. {gaspars.name} lists the 173rd at {formatEur(gaspars.drinkIn)}{" "}
                and the 171st at €425. Krug itself currently presents the 174th, 173rd and 172nd, so &ldquo;the current one&rdquo; depends on whom you ask. {words[unnumbered] ?? unnumbered} lists don&rsquo;t say which edition they pour.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* DP */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow="The next bottle over" title="Know the Krug, know the Dom?">
            <p>
              On the {study.dpHoldout.n} lists that carry both, Krug and Dom Pérignon 2015 move together closely. Krug
              is usually a touch dearer: the median gap is {study.dpPremiumPct}%. Three venues price them identically
              at €390.
            </p>
          </SectionHead>
          <div className="mt-12">
            <DpChart />
          </div>
        </div>
      </section>

      {/* Rioja test */}
      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <SectionHead eyebrow="The wider list" title="Then the Rioja arrived">
              <p>
                The real question was never Champagne. It was whether Krug tells you what the reds and whites will
                cost. Across a basket of still wines found on several lists, it didn&rsquo;t: a plain median guessed
                better than Krug did.
              </p>
            </SectionHead>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#f1f1f1] p-5">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-600 uppercase">Median guess</p>
                <p className="mt-1 text-3xl font-bold text-neutral-950 tabular-nums">
                  {study.stillFlex.medianMae.toFixed(1)}
                </p>
                <p className="text-sm text-neutral-600">index points off</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-5">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-600 uppercase">Krug guess</p>
                <p className="mt-1 text-3xl font-bold text-neutral-950 tabular-nums">
                  {study.stillFlex.krugMae.toFixed(1)}
                </p>
                <p className="text-sm text-neutral-600">index points off</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              {study.stillFlex.n} venues with enough matching still wines, vintages allowed to differ. With exact
              vintages, too few lists overlapped to run the test at all.
            </p>
          </div>
          <div className="lg:col-span-6 lg:pt-16">
            <div className="rounded-2xl bg-[#231F20] p-6 text-white md:p-8">
              <Eyebrow className="!text-[#fad0c5]">Exhibit A · Muga Reserva 2021</Eyebrow>
              <div className="mt-6 divide-y divide-white/15">
                {[
                  { v: dia, muga: 53 },
                  { v: uma, muga: 155 },
                ].map(({ v, muga }) => (
                  <div key={v.id} className="grid grid-cols-3 gap-4 py-4">
                    <p className="font-semibold">{v.name}</p>
                    <p className="text-right tabular-nums">
                      <span className="block text-[11px] tracking-[0.12em] text-white/60 uppercase">Muga</span>
                      <span className="text-2xl font-bold">{formatEur(muga)}</span>
                    </p>
                    <p className="text-right tabular-nums">
                      <span className="block text-[11px] tracking-[0.12em] text-white/60 uppercase">Krug</span>
                      <span className="text-2xl font-bold">{formatEur(v.drinkIn)}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-white/75">
                Same Rioja, nearly three times the price at UMA. Yet UMA&rsquo;s Krug is the cheaper of the two. For
                the still wines, turn the page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <GuessGame />
        </div>
      </section>

      {/* International */}
      <section className="bg-[#f1f1f1] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow="For scale" title="Four tables further afield">
            <p>
              The 173rd edition on official menus elsewhere, converted at one fixed ECB rate (20 Nov 2026), with any
              service charge the menu states. Reference points, not a league table, and not part of the Baltic
              median.
            </p>
          </SectionHead>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {international.map((r) => (
              <article key={r.venue} className="flex flex-col rounded-2xl bg-white p-6">
                <Eyebrow>
                  {r.city} · {r.country}
                </Eyebrow>
                <p className="mt-4 text-4xl font-bold text-neutral-950 tabular-nums">{formatEur(r.eur)}</p>
                <p className="mt-1 text-sm text-neutral-500 tabular-nums">
                  {intlBasis(r)}
                </p>
                <h3 className="mt-4 text-lg font-bold text-neutral-950">{r.venue}</h3>
                <a href={r.menuUrl} {...ext} className={`mt-auto pt-4 text-sm ${inlineLink}`}>
                  Official menu
                </a>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-neutral-500">
            VEA in Hong Kong lists eight editions, from the 162nd to the 173rd; the oldest costs 72% more than the
            newest. O Gaveto&rsquo;s ladder is gentler: €325 for the 173rd up to €355 for the 170th. Observed 24
            November 2026; menus can change.
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Method" title="How we counted">
              <p className="text-base">
                Prices come from the wine lists submitted for the 2026 awards, each checked against the original
                menu page. A snapshot of listed prices, not live stock.
              </p>
            </SectionHead>
          </div>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-8">
            {[
              [
                "What qualifies?",
                "One regular white Krug Grande Cuvée per venue, in the bottle section of the list (750 mL stated or the evident bottle format). Where several editions appear, the newest numbered one counts. Glasses, magnums, vintage and rosé Krug are left out. Riviera’s bottle is printed with a year and a Krug iD rather than an edition, so it is shown separately and doesn’t move the median.",
              ],
              [
                "Which charges count?",
                "A mandatory fee for drinking a bottle in, like Time to Wine’s €15, is added. A service charge the menu calls discretionary (Stage22’s 10%) is not. Corkage for your own bottle never applies here.",
              ],
              [
                "Does Krug predict the list?",
                "We hid each venue in turn and guessed its prices from the others, with and without its Krug price. For Dom Pérignon 2015 Krug helped a lot. For still wines a plain median did better. Eleven and eight venues are small samples, so read both as clues, not laws.",
              ],
              [
                "Why not compare countries?",
                "The Latvian venues in the index include both hotel restaurants, which sit at the top; two of the Estonian ones are bar-shops. The mix of venues explains much of the gap, and the sample is too small to say anything about national price levels.",
              ],
              [
                "What this isn’t",
                "Not a quality ranking and not part of the jury’s results: the awards judge the whole list, and some of the best ones carry no Krug at all. Not a measure of margin, since we don’t know what anyone paid for the bottle. Not affiliated with Krug or any producer.",
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

      {/* Onward */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href={MENUS_URL}
              {...ext}
              className="group flex flex-col justify-between rounded-2xl bg-[#fad0c5] p-8 transition-colors hover:bg-[#f7c1b3] md:p-10"
            >
              <Eyebrow className="!text-neutral-700">All 2026 lists</Eyebrow>
              <div className="mt-10">
                <p className="text-3xl font-bold text-neutral-950 md:text-4xl">Read the lists yourself</p>
                <p className="mt-3 max-w-md text-neutral-700">
                  Every wine and drinks list entered for the 2026 awards, as submitted. Find your own Krug.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-neutral-950">
                  menus.balticwinelists.com <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </a>
            <a
              href={RESULTS_URL}
              {...ext}
              className="group flex flex-col justify-between rounded-2xl bg-[#231F20] p-8 text-white transition-colors hover:bg-neutral-800 md:p-10"
            >
              <Eyebrow className="!text-[#fad0c5]">The awards</Eyebrow>
              <div className="mt-10">
                <p className="text-3xl font-bold md:text-4xl">See who the jury picked</p>
                <p className="mt-3 max-w-md text-white/75">
                  The 2026 Baltic Wine &amp; Drinks Awards results: wine lists, drinks lists and retailers.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                  2026 results <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </a>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-neutral-500">
            BW&amp;DA wine-list research · source snapshot 24 November 2026 · prices as printed on the submitted 2026
            lists · international menus observed 24 November 2026, converted at ECB reference rates of 20 November
            2026 · map outlines Natural Earth. Krug and Dom Pérignon are trademarks of their owners.
          </p>
        </div>
      </section>
    </div>
  )
}
