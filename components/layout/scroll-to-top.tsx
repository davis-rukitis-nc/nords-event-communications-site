"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0)
  }, [pathname]) // Re-run effect whenever the pathname changes

  return <>{children}</>
}
