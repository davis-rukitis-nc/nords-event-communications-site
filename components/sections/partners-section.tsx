import Image from "next/image"
import Link from "next/link"
import { partnerLogos, type Partner } from "@/lib/data/partners-data"

function Logo({ partner, hidden = false }: { partner: Partner; hidden?: boolean }) {
  const img = (
    <Image
      src={partner.logo}
      alt={hidden ? "" : partner.name}
      width={140}
      height={80}
      draggable={false}
      className="h-auto max-h-16 w-auto max-w-[140px] select-none object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  )
  return (
    <li className="flex min-w-[180px] shrink-0 items-center justify-center px-8" aria-hidden={hidden || undefined}>
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

export default function PartnersSection() {
  return (
    <section aria-labelledby="trusted-by" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 id="trusted-by" className="mb-10 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
          Trusted By
        </h2>

        <div className="partners-marquee group/marquee relative overflow-hidden rounded-2xl bg-neutral-100">
          <ul className="partners-track flex w-max items-center py-6">
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
