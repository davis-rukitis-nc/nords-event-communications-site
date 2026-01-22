"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

type ByNordsMarqueeProps = {
  text?: string
  logoSrc?: string
  speed?: number // px per frame (requestAnimationFrame)
  repeatCount?: number // how many (text+logo) pairs per set before tripling
  className?: string
  textClassName?: string
  pillClassName?: string
  pauseOnHover?: boolean
}

export default function ByNordsMarquee({
  text = "By Nords Event Communications.",
  logoSrc = "/logo-light.svg",
  speed = 0.6,
  repeatCount = 12,
  className = "",
  textClassName = "",
  pillClassName = "",
  pauseOnHover = true,
}: ByNordsMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const scrollPosRef = useRef(0)
  const isPausedRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)

  // Build one "set" of alternating text + logo, then triple it for seamless wrap
  const items = useMemo(() => {
    const oneSet: Array<{ type: "text" | "logo"; key: string }> = []
    for (let i = 0; i < repeatCount; i++) {
      oneSet.push({ type: "text", key: `t-${i}` })
      oneSet.push({ type: "logo", key: `l-${i}` })
    }
    return [...oneSet, ...oneSet, ...oneSet]
  }, [repeatCount])

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

    // wait a tick for layout
    const id = requestAnimationFrame(() => {
      setInitial()
      requestAnimationFrame(setInitial)
    })

    return () => cancelAnimationFrame(id)
  }, [items])

  const animate = useCallback(() => {
    const el = scrollRef.current
    if (!el) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    if (!isPausedRef.current) {
      scrollPosRef.current += speed
      const singleSetWidth = el.scrollWidth / 3

      // Wrap forward seamlessly (middle -> right -> back to middle)
      if (scrollPosRef.current >= singleSetWidth * 2) {
        scrollPosRef.current -= singleSetWidth
      }

      el.scrollLeft = scrollPosRef.current
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [speed])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        ref={scrollRef}
        className={[
          "flex items-center whitespace-nowrap",
          "overflow-x-hidden",
          "select-none",
          // small line height / no outer margins:
          "py-2",
          // hide scrollbars (no plugin needed):
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
          willChange: "scroll-position",
        }}
        onMouseEnter={
          pauseOnHover
            ? () => {
                setIsPaused(true)
                isPausedRef.current = true
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
      >
        <div className="flex items-center gap-6 pr-6">
          {items.map((item, idx) => {
            if (item.type === "text") {
              return (
                <span
                  key={`${item.key}-${idx}`}
                  className={`flex-shrink-0 text-xs md:text-sm font-medium text-gray-900 ${textClassName}`}
                >
                  {text}
                </span>
              )
            }

            return (
              <span
                key={`${item.key}-${idx}`}
                className={`flex-shrink-0 inline-flex items-center justify-center rounded-full bg-gray-900 px-3 py-1 ${pillClassName}`}
              >
                <Image
                  src={logoSrc}
                  alt="Nords logo"
                  width={72}
                  height={18}
                  className="h-4 w-auto"
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
