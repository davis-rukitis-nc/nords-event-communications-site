"use client"

import { useLayoutEffect, useRef, useState } from "react"

/** Measures an element's content width so SVG charts can draw at true pixel size (text stays legible). */
export function useWidth<T extends HTMLElement>(fallback = 640) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(fallback)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setWidth(Math.max(280, Math.round(el.clientWidth)))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, width] as const
}
