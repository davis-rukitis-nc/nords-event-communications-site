"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion"

type Connection = { saveData?: boolean }

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [inView, setInView] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const saveData =
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { connection?: Connection }).connection?.saveData === true
  const playVideo = !reduceMotion && !saveData
  const isPlaying = !userPaused

  // Pause when the hero is off-screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    if (inView && isPlaying) video.play().catch(() => {})
    else video.pause()
  }, [inView, isPlaying, videoReady])

  return (
    <section ref={sectionRef} className="relative h-svh min-h-[520px] w-full overflow-hidden bg-black">
      <Image
        src="/images/hero/hero-still-sq.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-80"}`}
      />

      {playVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-80" : "opacity-0"
          }`}
        >
          <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/video/hero-1080.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/35" />

      <div className="absolute left-6 top-6 z-30 md:left-8 md:top-[30px]">
        <Image
          src="/logo-light.svg"
          alt="NECom"
          width={100}
          height={32}
          priority
          draggable={false}
          className="brightness-0 invert"
        />
      </div>

      {playVideo && videoReady && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute right-6 top-6 z-30 flex items-center justify-center rounded-xl border border-white/10 bg-black/60 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80 md:bottom-16 md:right-8 md:top-auto"
        >
          {isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
        </button>
      )}

      <div className="absolute bottom-36 left-6 right-6 z-10 max-w-xl md:bottom-16 md:left-8">
        <h1 className="font-heading animate-fade-in text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
          Moved. Inspired. Elevated.
        </h1>
      </div>
    </section>
  )
}
