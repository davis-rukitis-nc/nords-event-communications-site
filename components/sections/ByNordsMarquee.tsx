"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

type ByNordsMarqueeProps = {
  phrases?: string[] // marquee phrases (will rotate)
  logoSrc?: string
  speed?: number // base px per frame (requestAnimationFrame)
  pageScrollBoost?: number // how much page scroll adds to marquee movement
  repeatCount?: number // how many phrase+logo pairs per "set" before tripling
  className?: string
  textClassName?: string
  pillClassName?: string
  pauseOnHover?: boolean
}

export default function ByNordsMarquee({
  phrases = [
    "Moved by Nords Event Communications",
    "Inspired by Nords Event Communications",
    "Elevated by Nords Event Communications",
  ],
  logoSrc = "/logo-light.svg",
  speed = 0.25, // slower baseline
  pageScrollBoost = 0.35, // faster when the page scrolls
  repeatCount = 10,
  className = "",
  textClassName = "",
  pillClassName = "",
  pauseOnHover = false,
}: ByNordsMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const scrollPosRef = useRef(0)
  const isPausedRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)

  const prefersReducedMotionRef = useRef(false)

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      prefersReducedMotionRef.current = mq.matches
    }
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  // Build one "set" of phrase + logo, then triple it for seamless wrap
  const items = useMemo(() => {
    const oneSet: Array<{ type: "text" | "logo"; key: string; text?: string }> = []

    for (let i = 0; i < repeatCount; i++) {
      const phrase = phrases[i % phrases.length] ?? ""
      oneSet.push({ type: "text", key: `t-${i}`, text: phrase })
      oneSet.push({ type: "logo", key: `l-${i}` })
    }

    return [...oneSet, ...oneSet, ...oneSet]
  }, [repeatCount, phrases])

  // Keep ref in sync
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Start in the middle set so wrapping is invisible
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const setInitial = () => {
      const singleSetWidth = el.scrollWidth / 3
      scrollPosRef.current = singleSetWidth
      el.scrollLeft = singleSetWidth
    }

    const id = requestAnimationFrame(() => {
      setInitial()
      requestAnimationFrame(setInitial)
    })

    return () => cancelAnimationFrame(id)
  }, [items])

  const wrapIfNeeded = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const singleSetWidth = el.scrollWidth / 3

    // Forward wrap
    if (scrollPosRef.current >= singleSetWidth * 2) {
      scrollPosRef.current -= singleSetWidth
    }

    // Backward wrap (important for page-scroll boost upwards)
    if (scrollPosRef.current < singleSetWidth) {
      scrollPosRef.current += singleSetWidth
    }

    el.scrollLeft = scrollPosRef.current
  }, [])

  const animate = useCallback(() => {
    const el = scrollRef.current
    if (!el) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const reduced = prefersReducedMotionRef.current
    const paused = isPausedRef.current

    if (!paused && !reduced) {
      scrollPosRef.current += speed
      wrapIfNeeded()
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [speed, wrapIfNeeded])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // Boost marquee movement when the user scrolls the page
  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const el = scrollRef.current
      if (!el) return
      if (isPausedRef.current) return
      if (prefersReducedMotionRef.current) return

      const y = window.scrollY
      let delta = y - lastY
      lastY = y

      // Clamp so trackpads / momentum don’t cause crazy jumps
      delta = Math.max(-120, Math.min(120, delta))

      scrollPosRef.current += delta * pageScrollBoost
      wrapIfNeeded()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pageScrollBoost, wrapIfNeeded])

  const srSummary = useMemo(() => phrases.join(" "), [phrases])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Screen reader friendly summary */}
      <span className="sr-only">{srSummary}</span>

      <div
        ref={scrollRef}
        aria-hidden="true"
        className={[
          "flex items-center whitespace-nowrap",
          "overflow-x-hidden select-none",
          // Taller strip + bigger breathing room:
          "py-4 md:py-5",
          // hide scrollbars (no plugin needed):
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
          willChange: "scroll-position",
          // Premium edge fade (still full-width, no margins)
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onMouseEnter={
          pauseOnHover
            ? () => {
                setIsPaused(false)
                isPausedRef.current = false
              }
            : undefined
        }
        onMouseLeave={
          pauseOnHover
            ? () => {
                setIsPaused(false)
                isPausedRef.current = false
              }
            : undefined
        }
        onFocusCapture={
          pauseOnHover
            ? () => {
                setIsPaused(false)
                isPausedRef.current = false
              }
            : undefined
        }
        onBlurCapture={
          pauseOnHover
            ? () => {
                setIsPaused(false)
                isPausedRef.current = false
              }
            : undefined
        }
      >
        <div className="flex items-center gap-10 md:gap-14 pr-14">
          {items.map((item, idx) => {
            if (item.type === "text") {
              return (
                <span
                  key={`${item.key}-${idx}`}
                  className={[
                    "flex-shrink-0",
                    // Bigger text:
                    "text-sm md:text-base lg:text-lg",
                    "font-semibold tracking-wide text-gray-900",
                    textClassName,
                  ].join(" ")}
                >
                  {item.text}
                </span>
              )
            }

            return (
              <span
                key={`${item.key}-${idx}`}
                className={[
                  "flex-shrink-0 inline-flex items-center justify-center rounded-full",
                  // Bigger pill:
                  "px-4 py-2 md:px-5 md:py-2.5",
                  "bg-gray-900",
                  "ring-1 ring-white/10",
                  pillClassName,
                ].join(" ")}
              >
                <Image
                  src={logoSrc}
                  alt="Nords logo"
                  width={110}
                  height={28}
                  className="h-5 md:h-6 w-auto"
                  sizes="110px"
                  draggable={false}
                  priority={false}
                />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
