"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { getNavigationEvents } from "@/lib/data/events-data"
import SiteLogo from "@/components/ui/site-logo"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktopEventsOpen, setIsDesktopEventsOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const eventsButtonRef = useRef<HTMLButtonElement>(null)
  const lastScrollY = useRef(0)
  const [showMobileLogo, setShowMobileLogo] = useState(true)
  const lastScrollYMobile = useRef(0)

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/events", label: "Events", hasDropdown: true },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ]

  const closeDesktopEvents = useCallback(() => {
    setIsDesktopEventsOpen(false)
    setShouldAnimate(false)
  }, [])

  const toggleDesktopEvents = useCallback(() => {
    if (isDesktopEventsOpen) {
      closeDesktopEvents()
    } else {
      setIsDesktopEventsOpen(true)
      setShouldAnimate(true)
      lastScrollY.current = window.scrollY
    }
  }, [isDesktopEventsOpen, closeDesktopEvents])

  // Prevent background scroll when mobile events open
  useEffect(() => {
    document.body.style.overflow = isMobileEventsOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileEventsOpen])

  // Track scroll for desktop nav opacity
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScrollClose = () => {
      if (isDesktopEventsOpen && Math.abs(window.scrollY - lastScrollY.current) > 50) {
        closeDesktopEvents()
      }
    }
    if (isDesktopEventsOpen) {
      window.addEventListener("scroll", handleScrollClose, { passive: true })
    }
    return () => window.removeEventListener("scroll", handleScrollClose)
  }, [isDesktopEventsOpen, closeDesktopEvents])

  useEffect(() => {
    const handleMobileScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 50) {
        setShowMobileLogo(true)
      } else if (currentScrollY < lastScrollYMobile.current) {
        setShowMobileLogo(true)
      } else if (currentScrollY > lastScrollYMobile.current) {
        setShowMobileLogo(false)
      }
      lastScrollYMobile.current = currentScrollY
    }
    window.addEventListener("scroll", handleMobileScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleMobileScroll)
  }, [])

  // Determine view size and reset menus on crossover
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const mobile = !e.matches
      setIsMobileView(mobile)
      setIsDesktopEventsOpen(false)
      setIsMobileEventsOpen(false)
      setShouldAnimate(false)
    }
    handler(mq)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        eventsButtonRef.current &&
        !eventsButtonRef.current.contains(target)
      ) {
        closeDesktopEvents()
      }
    }
    if (isDesktopEventsOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isDesktopEventsOpen, closeDesktopEvents])

  useEffect(() => {
    closeDesktopEvents()
    setIsMobileEventsOpen(false)
  }, [pathname, closeDesktopEvents])

  const openMobileEvents = () => {
    setIsMobileEventsOpen(true)
    setShouldAnimate(true)
  }
  const closeMobileEvents = () => {
    setIsMobileEventsOpen(false)
    setShouldAnimate(false)
  }

  const navigationEvents = getNavigationEvents()

  return (
    <>
      <SiteLogo showOnMobile={showMobileLogo} />

      {/* Desktop Nav */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center rounded-2xl backdrop-blur-md transition-all duration-300 shadow-xl border border-white/10 px-3 py-1.5 ${
          isScrolled ? "bg-black/80" : "bg-black/60"
        }`}
      >
        <ul className="flex items-center space-x-1.5">
          {navItems.map((item) => (
            <li key={item.label} className="relative">
              {item.hasDropdown ? (
                <button
                  ref={eventsButtonRef}
                  onClick={toggleDesktopEvents}
                  className={`text-sm font-medium transition-colors px-3 rounded-xl py-1.5 ${
                    isDesktopEventsOpen ? "text-white bg-white/20" : "text-white hover:text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors px-3 rounded-xl py-1.5 ${
                    pathname === item.href
                      ? "text-white bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Mega Menu */}
      {isDesktopEventsOpen && (
        <div
          ref={menuRef}
          className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1000px] max-h-[75vh] bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 z-40 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-sm font-medium text-white/80 uppercase tracking-wider">Our Events</h2>
            <button
              onClick={closeDesktopEvents}
              className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close events menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(75vh-60px)] p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {navigationEvents.map((event, index) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  onClick={closeDesktopEvents}
                  className="relative rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 overflow-hidden min-h-[220px] flex flex-col justify-between group"
                  style={{
                    animationDelay: shouldAnimate ? `${index * 50}ms` : "0ms",
                    opacity: shouldAnimate ? 0 : 1,
                    animation: shouldAnimate ? `fadeSlideIn 0.3s ease-out ${index * 50}ms forwards` : "none",
                  }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      fill
                      className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                  </div>
                  <div className="relative z-10 p-4 flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded">
                          {event.type}
                        </span>
                        <div className="w-14 h-6 relative">
                          <Image
                            src={event.logo || "/placeholder.svg"}
                            alt={`${event.name} logo`}
                            fill
                            className="object-contain filter brightness-0 invert"
                          />
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-white line-clamp-1">{event.name}</h3>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 leading-snug mt-4">{event.description}</p>
                  </div>
                </Link>
              ))}

              <Link
                href="/events"
                onClick={closeDesktopEvents}
                className="relative rounded-xl bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-white/40 transition-all duration-200 overflow-hidden min-h-[220px] flex flex-col items-center justify-center group"
                style={{
                  animationDelay: shouldAnimate ? `${navigationEvents.length * 50}ms` : "0ms",
                  opacity: shouldAnimate ? 0 : 1,
                  animation: shouldAnimate
                    ? `fadeSlideIn 0.3s ease-out ${navigationEvents.length * 50}ms forwards`
                    : "none",
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-sm font-medium text-white">View All</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      {isMobileView && (
        <nav className="fixed bottom-6 inset-x-4 z-50 w-auto flex justify-between bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 px-6 py-3 md:hidden">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <button
                key={item.label}
                onClick={openMobileEvents}
                className={`text-xs font-medium ${pathname === item.href ? "text-white" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs font-medium ${pathname === item.href ? "text-white" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      )}

      {/* Mobile Events Overlay */}
      {isMobileEventsOpen && isMobileView && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-x-4 top-20 bottom-20 bg-black/80 rounded-2xl border border-white/10 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 z-20 px-6 pt-6 pb-2 bg-black/80 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-white">Our events</h2>
                <button
                  onClick={closeMobileEvents}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition"
                  aria-label="Close events"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <hr className="border-t border-white/20 mt-2" />
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-6 pt-4">
              <div className="space-y-6">
                {navigationEvents.map((event, index) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    onClick={closeMobileEvents}
                    className="block"
                    style={{
                      animationDelay: shouldAnimate ? `${index * 75}ms` : "0ms",
                      opacity: shouldAnimate ? 0 : 1,
                      animation: shouldAnimate ? `fadeSlideIn 0.3s ease-out ${index * 75}ms forwards` : "none",
                    }}
                  >
                    <div className="relative rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 overflow-hidden">
                      <div className="absolute inset-0 rounded-xl">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.name}
                          fill
                          className="object-cover opacity-20"
                        />
                      </div>
                      <div className="relative z-10 flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                          <div className="w-28 h-28 relative">
                            <Image
                              src={event.logo || "/placeholder.svg"}
                              alt={`${event.name} logo`}
                              fill
                              className="object-contain filter brightness-0 invert"
                            />
                          </div>
                          <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded">
                            {event.type}
                          </span>
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-white/70 leading-snug">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/events"
                  onClick={closeMobileEvents}
                  className="block"
                  style={{
                    animationDelay: shouldAnimate ? `${navigationEvents.length * 75}ms` : "0ms",
                    opacity: shouldAnimate ? 0 : 1,
                    animation: shouldAnimate
                      ? `fadeSlideIn 0.3s ease-out ${navigationEvents.length * 75}ms forwards`
                      : "none",
                  }}
                >
                  <div className="relative rounded-xl bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-white/40 transition-all duration-200 overflow-hidden p-8">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white block">View All Events</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
