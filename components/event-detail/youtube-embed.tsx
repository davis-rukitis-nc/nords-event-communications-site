"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  url: string
  title: string
}

function getVideoId(url: string): string | null {
  const match = url.match(/(?:embed\/|youtu\.be\/|v=)([\w-]{11})/)
  return match ? match[1] : null
}

/** Click-to-load embed: nothing is requested from YouTube until the visitor presses play. */
export default function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false)
  const id = getVideoId(url)
  if (!id) return null

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-950">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full">
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover opacity-80 transition-opacity group-hover:opacity-90"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  )
}
