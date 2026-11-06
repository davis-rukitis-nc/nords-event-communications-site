"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { getNavigationEvents } from "@/lib/data/events-data"
import SiteLogo from "@/components/ui/site-logo"

const navItems = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events", hasDropdown: true },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

const navigationEvents = getNavigationEvents()

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openedFor, setOpenedFor] = useState(pathname)
  const menuRef = useRef<HTMLDivElement>(null)
  const eventsButtonRef = useRef<HTMLButtonElement>(null)
  const mobileEventsButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDialogElement>(null)
  const scrollAtOpen = useRef(0)

  // Close menus on route change (state derived during render, no effect needed).
  if (openedFor !== pathname) {
    setOpenedFor(pathname)
    setDesktopOpen(false)
    setMobileOpen(false)
  }

  const closeDesktop = useCallback((returnFocus = false) => {
    setDesktopOpen(false)
    if (returnFocus) eventsButtonRef.current?.focus()
  }, [])

  // Nav background opacity on scroll; close desktop menu after a real scroll.
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (Math.abs(window.scrollY - scrollAtOpen.current) > 80) setDesktopOpen(false)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Desktop menu: Escape and click-outside close it.
  useEffect(() => {
    if (!desktopOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDesktop(true)
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (!menuRef.current?.contains(target) && !eventsButtonRef.current?.contains(target)) closeDesktop()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [desktopOpen, closeDesktop])

  // Mobile events panel is a native modal <dialog>: focus trap, Escape and inert background for free.
  useEffect(() => {
    const dialog = mobileDialogRef.current
    if (!dialog) return
    if (mobileOpen && !dialog.open) dialog.showModal()
    if (!mobileOpen && dialog.open) dialog.close()
  }, [mobileOpen])

  const toggleDesktop = () => {
    scrollAtOpen.current = window.scrollY
    setDesktopOpen((open) => !open)
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-950"
      >
        Skip to content
      </a>

      <SiteLogo />

      {/* Desktop nav */}
      <nav
        aria-label="Main"
        className={`fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 items-center rounded-2xl border border-white/10 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 md:flex ${
          isScrolled ? "bg-black/85" : "bg-black/65"
        }`}
      >
        <ul className="flex items-center gap-1.5">
          {navItems.map((item) => {
            const current = isCurrent(pathname, item.href)
            const base = "block rounded-xl px-3 py-1.5 text-sm font-medium text-white transition-colors"
            return (
              <li key={item.label}>
                {item.hasDropdown ? (
                  <button
                    ref={eventsButtonRef}
                    type="button"
                    onClick={toggleDesktop}
                    aria-expanded={desktopOpen}
                    aria-controls="events-menu"
                    className={`${base} ${desktopOpen || current ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`${base} ${current ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Desktop events menu */}
      <div
        id="events-menu"
        ref={menuRef}
        hidden={!desktopOpen}
        className="fixed left-1/2 top-20 z-40 w-[95vw] max-w-[1000px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/80">Our Events</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/events"
              onClick={() => closeDesktop()}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
            >
              View All
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => closeDesktop(true)}
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close events menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul className="grid max-h-[calc(75vh-60px)] grid-cols-2 gap-4 overflow-y-auto p-6 lg:grid-cols-3">
          {navigationEvents.map((event, index) => (
            <li key={event.id} style={{ animation: `fadeSlideIn 0.3s ease-out ${index * 40}ms both` }}>
              <Link
                href={`/events/${event.slug}`}
                onClick={() => closeDesktop()}
                className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-xl bg-white/5 transition-colors duration-200 hover:bg-white/10"
              >
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/60">{event.type}</span>
                      <div className="relative h-6 w-14">
                        <Image src={event.logo} alt="" fill sizes="56px" className="object-contain brightness-0 invert" />
                      </div>
                    </div>
                    <h3 className="line-clamp-1 text-base font-semibold text-white">{event.name}</h3>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-snug text-white/70">{event.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile bottom nav (CSS-switched, so it is in the server HTML) */}
      <nav
        aria-label="Main"
        className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md md:hidden"
      >
        <ul className="flex">
          {navItems.map((item) => {
            const current = isCurrent(pathname, item.href)
            const cls = `flex w-full items-center justify-center py-3.5 text-xs font-medium ${
              current ? "text-white" : "text-white/75"
            }`
            return (
              <li key={item.label} className="flex-1">
                {item.hasDropdown ? (
                  <button
                    ref={mobileEventsButtonRef}
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={mobileOpen}
                    className={cls}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link href={item.href} aria-current={current ? "page" : undefined} className={cls}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile events panel */}
      <dialog
        ref={mobileDialogRef}
        aria-labelledby="mobile-events-title"
        onClose={() => {
          setMobileOpen(false)
          mobileEventsButtonRef.current?.focus()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false)
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-md md:hidden"
      >
        <div className="absolute inset-x-4 bottom-24 top-16 flex flex-col rounded-2xl border border-white/10 bg-neutral-950">
          <div className="flex items-center justify-between border-b border-white/15 px-6 pb-3 pt-5">
            <h2 id="mobile-events-title" className="text-sm font-medium text-white">
              Our events
            </h2>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-mr-2 rounded-full p-2 text-white transition hover:bg-white/10"
              aria-label="Close events"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <ul className="scrollbar-hide flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {navigationEvents.map((event, index) => (
              <li key={event.id} style={mobileOpen ? { animation: `fadeSlideIn 0.3s ease-out ${index * 50}ms both` } : undefined}>
                <Link
                  href={`/events/${event.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="relative block overflow-hidden rounded-xl bg-white/5 transition-colors hover:bg-white/10"
                >
                  <Image src={event.image} alt="" fill sizes="100vw" className="object-cover opacity-20" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between border-b border-white/10 p-5">
                      <div className="relative h-16 w-28">
                        <Image src={event.logo} alt={event.name} fill sizes="112px" className="object-contain object-left brightness-0 invert" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-white/60">{event.type}</span>
                    </div>
                    <p className="p-5 text-sm leading-snug text-white/75">{event.description}</p>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/events"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 p-5 text-sm font-medium text-white hover:bg-white/10"
              >
                View All Events
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </dialog>
    </>
  )
}
