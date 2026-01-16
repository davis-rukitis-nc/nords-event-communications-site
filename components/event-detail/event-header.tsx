import Image from "next/image"
import type { Event } from "@/lib/data/events-data"
import { Calendar } from "lucide-react"

interface EventHeaderProps {
  event: Event
}

export default function EventHeader({ event }: EventHeaderProps) {
  return (
    <header className="relative aspect-[16/9] md:aspect-[16/7] w-full overflow-hidden rounded-b-2xl">
      <Image
        src={event.image || "/placeholder.svg"}
        alt={`Promotional image for ${event.name}`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-6 md:pb-8">
          <div className="flex items-center gap-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-lg backdrop-blur-sm">
              {event.type}
            </span>
            {event.date && (
              <span className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                Next Event: {event.date}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mt-4">{event.name}</h1>
        </div>
      </div>
    </header>
  )
}
