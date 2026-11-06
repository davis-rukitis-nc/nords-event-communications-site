import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PartnerCTA() {
  return (
    <div className="rounded-2xl bg-neutral-950 p-8 text-white">
      <h3 className="mb-2 text-2xl font-bold md:text-3xl">Become a Partner</h3>
      <p className="mb-6 max-w-lg text-white/80">
        Join us in creating unforgettable experiences. We offer unique partnership opportunities to connect your brand
        with a passionate audience.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
      >
        Contact Us
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
