"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SiteLogoProps {
  showOnMobile?: boolean
}

export default function SiteLogo({ showOnMobile }: SiteLogoProps) {
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const lastScrollY = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isHomePage) return

    // If showOnMobile prop is provided, use it for mobile visibility
    if (isMobile && showOnMobile !== undefined) {
      setIsVisible(showOnMobile)
      return
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY

      if (isMobile) {
        // Mobile: show on scroll up, hide on scroll down
        if (currentScrollY < 100) {
          setIsVisible(true)
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY.current + 10) {
          setIsVisible(false)
        }
      } else {
        // Desktop: always visible
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHomePage, isMobile, showOnMobile])

  if (isHomePage) return null

  return (
    <div
      className={`
        fixed z-[100] transition-all duration-300
        top-8 left-8
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
      style={{ mixBlendMode: "difference" }}
    >
      <Link href="/" className="block transition-opacity duration-200 hover:opacity-80">
        <Image
          src="/logo-light.svg"
          alt="NECom official logo"
          width={100}
          height={32}
          priority
          sizes="100px"
          draggable={false}
          className="brightness-0 invert"
        />
      </Link>
    </div>
  )
}
