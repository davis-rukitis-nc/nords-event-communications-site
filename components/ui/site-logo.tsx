"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Fixed logo for inner pages. The home hero renders its own logo.
// Mobile: hides while scrolling down, returns on scroll up. Desktop: always visible.
export default function SiteLogo() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 100 || y < lastY.current) setHidden(false)
      else if (y > lastY.current + 10) setHidden(true)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname === "/") return null

  return (
    <div
      className={`fixed left-6 top-6 z-[60] mix-blend-difference transition-[opacity,transform] duration-300 md:left-8 md:top-8 md:translate-y-0 md:opacity-100 ${
        hidden ? "pointer-events-none -translate-y-4 opacity-0 md:pointer-events-auto" : "translate-y-0 opacity-100"
      }`}
    >
      <Link href="/" aria-label="NECom home" className="block transition-opacity duration-200 hover:opacity-80">
        <Image
          src="/logo-light.svg"
          alt=""
          width={100}
          height={32}
          priority
          draggable={false}
          className="brightness-0 invert"
        />
      </Link>
    </div>
  )
}
