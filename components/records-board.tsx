// World-record timing board (Riga23). Seven-segment digits drawn as SVG so the
// segments meet cleanly at every size.

type WorldRecord = { time: string; label: string; athlete: string; country: string }

export const riga23Records: WorldRecord[] = [
  { time: "4:20.98", label: "Women's Road Mile WR", athlete: "Diribe Welteji", country: "ETH" },
  { time: "3:56.13", label: "Men's Road Mile WR", athlete: "Hobbs Kessler", country: "USA" },
  { time: "1:26:16", label: "F65 Half Marathon WR", athlete: "Rosa Mota", country: "POR" },
]

// Segment order: a (top), b (top right), c (bottom right), d (bottom), e (bottom left), f (top left), g (middle)
const DIGITS: Record<string, number> = {
  "0": 0b1111110,
  "1": 0b0110000,
  "2": 0b1101101,
  "3": 0b1111001,
  "4": 0b0110011,
  "5": 0b1011011,
  "6": 0b1011111,
  "7": 0b1110000,
  "8": 0b1111111,
  "9": 0b1111011,
}

const T = 0.9 // half thickness
const h = (y: number, x1 = 1.4, x2 = 10.6) =>
  `${x1},${y} ${x1 + T},${y - T} ${x2 - T},${y - T} ${x2},${y} ${x2 - T},${y + T} ${x1 + T},${y + T}`
const v = (x: number, y1: number, y2: number) =>
  `${x},${y1} ${x + T},${y1 + T} ${x + T},${y2 - T} ${x},${y2} ${x - T},${y2 - T} ${x - T},${y1 + T}`

const SEGMENTS = [h(1), v(11, 1.4, 10.1), v(11, 10.9, 19.6), h(20), v(1, 10.9, 19.6), v(1, 1.4, 10.1), h(10.5)]

function Digit({ char }: { char: string }) {
  const mask = DIGITS[char] ?? 0
  return (
    <svg viewBox="-0.2 -0.2 12.4 21.4" className="h-full w-auto">
      {SEGMENTS.map((points, i) => (
        <polygon
          key={i}
          points={points}
          className={mask & (1 << (6 - i)) ? "fill-amber-400" : "fill-white/[0.06]"}
        />
      ))}
    </svg>
  )
}

function Separator({ char }: { char: ":" | "." }) {
  return (
    <svg viewBox="0 -0.2 3 21.4" className="h-full w-auto">
      {char === ":" ? (
        <>
          <circle cx="1.5" cy="6.5" r="1.1" className="fill-amber-400" />
          <circle cx="1.5" cy="14.5" r="1.1" className="fill-amber-400" />
        </>
      ) : (
        <circle cx="1.5" cy="19.9" r="1.1" className="fill-amber-400" />
      )}
    </svg>
  )
}

function Display({ time }: { time: string }) {
  return (
    <div className="flex h-9 items-stretch justify-center gap-[3px] md:h-11" aria-hidden="true">
      {time.split("").map((char, i) =>
        char === ":" || char === "." ? <Separator key={i} char={char} /> : <Digit key={i} char={char} />,
      )}
    </div>
  )
}

export default function RecordsBoard({ subtitle }: { subtitle?: string }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:mb-6">
        <div>
          <p className="text-xl font-bold text-white md:text-2xl">3 World Records</p>
          {subtitle && <p className="text-xs text-neutral-400 md:text-sm">{subtitle}</p>}
        </div>
        <span className="text-xs uppercase tracking-wider text-neutral-500">Official Times</span>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
        {riga23Records.map((record) => (
          <li key={record.label} className="flex flex-col">
            <div className="rounded-lg border border-white/5 bg-black px-3 py-4 md:py-5">
              <Display time={record.time} />
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-neutral-300">
                {record.label} <span className="sr-only">{record.time}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-500">
                {record.athlete} <span className="text-neutral-600">({record.country})</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
