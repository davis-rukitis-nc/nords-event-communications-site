import Image from "next/image"
import type { Event } from "@/lib/data/events-data"

export default function EventHeader({ event }: { event: Event }) {
  return (
    <header className="relative flex min-h-[60svh] w-full items-end overflow-hidden rounded-b-2xl bg-neutral-900 md:min-h-0 md:aspect-[16/7]">
      <Image src={event.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
      <div className="relative w-full text-white">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-white/80">{event.type}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">{event.name}</h1>
        </div>
      </div>
    </header>
  )
}
