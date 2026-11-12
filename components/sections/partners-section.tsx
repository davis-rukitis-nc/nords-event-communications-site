import Image from "next/image"
import Link from "next/link"
import { getPartners } from "@/lib/cms"
import type { Partner } from "@/lib/cms/types"

// Every logo gets roughly the same area, so long wordmarks and compact marks look equally heavy.
const LOGO_AREA = 4800 // px² at desktop size; phones show 75%
const MAX_W = 200
const MAX_H = 60

function logoSize(ratio = 2.5) {
  let h = Math.min(Math.sqrt(LOGO_AREA / ratio), MAX_H)
  let w = h * ratio
  if (w > MAX_W) [w, h] = [MAX_W, MAX_W / ratio]
  return { w: Math.round(w), h: Math.round(h) }
}

function Logo({ partner, hidden = false }: { partner: Partner; hidden?: boolean }) {
  const { w, h } = logoSize(partner.logoRatio)
  const img = (
    <Image
      src={partner.logo}
      alt={hidden ? "" : partner.name}
      width={w}
      height={h}
      draggable={false}
      style={{ "--w": `${w}px`, "--h": `${h}px` } as React.CSSProperties}
      className="h-[calc(var(--h)*0.75)] w-[calc(var(--w)*0.75)] select-none object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-(--h) md:w-(--w)"
    />
  )
  return (
    <li className="flex min-w-[190px] shrink-0 items-center justify-center px-6 md:min-w-[260px] md:px-10" aria-hidden={hidden || undefined}>
      {partner.link ? (
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          className="group flex items-center justify-center"
        >
          {img}
        </a>
      ) : (
        <span className="group">{img}</span>
      )}
    </li>
  )
}

export default async function PartnersSection() {
  const partnerLogos = await getPartners()
  return (
    <section aria-labelledby="trusted-by" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 id="trusted-by" className="mb-10 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          Trusted By
        </h2>

        <div className="partners-marquee group/marquee relative overflow-hidden rounded-2xl bg-neutral-100">
          <ul className="partners-track flex w-max items-center py-8 md:py-12">
            {partnerLogos.map((p) => (
              <Logo key={p.name} partner={p} />
            ))}
            {partnerLogos.map((p) => (
              <Logo key={`${p.name}-clone`} partner={p} hidden />
            ))}
          </ul>
        </div>

        <div className="mt-14 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Join our network of trusted partners and create unforgettable experiences together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  )
}
