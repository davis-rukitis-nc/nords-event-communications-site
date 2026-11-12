"use client"

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ArrowRight, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import type { Event } from "@/lib/cms/types"
import SiteLogo from "@/components/ui/site-logo"

const navItems = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events", hasDropdown: true },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

// Shared glass surface for the desktop pill, the events panel and the mobile bar.
const glass =
  "bg-neutral-950/[0.92] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.45)]"

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Moves a highlight pill under the active item. Writes styles straight to the DOM
 * (no state), so it never causes extra renders.
 */
function useIndicator(activeIndex: number) {
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator) return

    const place = () => {
      const item = activeIndex >= 0 ? (list.children[activeIndex + 1] as HTMLElement | undefined) : undefined
      if (!item) {
        indicator.style.opacity = "0"
        return
      }
      indicator.style.opacity = "1"
      indicator.style.width = `${item.offsetWidth}px`
      indicator.style.transform = `translateX(${item.offsetLeft}px)`
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(list)
    return () => ro.disconnect()
  }, [activeIndex])

  return { listRef, indicatorRef }
}

export default function Navigation({ events: navigationEvents }: { events: Event[] }) {
  const pathname = usePathname()
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openedFor, setOpenedFor] = useState(pathname)
  const menuRef = useRef<HTMLDivElement>(null)
  const eventsButtonRef = useRef<HTMLButtonElement>(null)
  const mobileEventsButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDialogElement>(null)
  const scrollAtOpen = useRef(0)

  // Close menus on route change (derived during render, no effect needed).
  if (openedFor !== pathname) {
    setOpenedFor(pathname)
    setDesktopOpen(false)
    setMobileOpen(false)
  }

  const routeIndex = navItems.findIndex((item) => isCurrent(pathname, item.href))
  const eventsIndex = navItems.findIndex((item) => item.hasDropdown)
  const { listRef: desktopListRef, indicatorRef: desktopIndicatorRef } = useIndicator(
    desktopOpen ? eventsIndex : routeIndex,
  )
  const { listRef: mobileListRef, indicatorRef: mobileIndicatorRef } = useIndicator(
    mobileOpen ? eventsIndex : routeIndex,
  )

  const closeDesktop = useCallback((returnFocus = false) => {
    setDesktopOpen(false)
    if (returnFocus) eventsButtonRef.current?.focus()
  }, [])

  // Close the desktop menu after a real scroll.
  useEffect(() => {
    if (!desktopOpen) return
    const onScroll = () => {
      if (Math.abs(window.scrollY - scrollAtOpen.current) > 80) setDesktopOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [desktopOpen])

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

      <header>
        <SiteLogo />

        {/* Desktop nav */}
        <nav aria-label="Main" className={`fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 rounded-full p-1 md:block ${glass}`}>
          <ul ref={desktopListRef} className="relative flex items-center">
            <span
              ref={desktopIndicatorRef}
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full bg-white/[0.14] opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            />
            {navItems.map((item) => {
              const current = isCurrent(pathname, item.href)
              const base =
                "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-[-0.005em] transition-colors duration-200"
              const tone = current || (item.hasDropdown && desktopOpen) ? "text-white" : "text-white/70 hover:text-white"
              return (
                <li key={item.label}>
                  {item.hasDropdown ? (
                    <button
                      ref={eventsButtonRef}
                      type="button"
                      onClick={toggleDesktop}
                      aria-expanded={desktopOpen}
                      aria-controls="events-menu"
                      className={`${base} ${tone}`}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`-mr-1 h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${desktopOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link href={item.href} aria-current={current ? "page" : undefined} className={`${base} ${tone}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      {/* Desktop events menu */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-30 hidden bg-black/20 transition-opacity duration-300 md:block ${
          desktopOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="events-menu"
        ref={menuRef}
        hidden={!desktopOpen}
        className={`fixed left-1/2 top-[84px] z-40 w-[min(960px,calc(100vw-3rem))] -translate-x-1/2 origin-top overflow-hidden rounded-3xl p-3 animate-in fade-in zoom-in-[0.98] slide-in-from-top-1 duration-200 ${glass} !bg-neutral-950/[0.96]`}
      >
        <h2 className="sr-only">Our Events</h2>
        <ul className="grid max-h-[calc(100vh-120px)] grid-cols-2 gap-2 overflow-y-auto lg:grid-cols-3">
          {navigationEvents.map((event, index) => (
            <li key={event.id} style={{ animation: `fadeIn 0.35s ease-out ${index * 30}ms both` }}>
              <Link
                href={`/events/${event.slug}`}
                onClick={() => closeDesktop()}
                className="group relative flex h-full min-h-[184px] flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.04] p-5 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover opacity-25 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-white/60">{event.type}</span>
                  {event.logo && (
                    <div className="relative h-6 w-14 shrink-0">
                      <Image src={event.logo} alt="" fill sizes="56px" className="object-contain object-right brightness-0 invert" />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <h3 className="text-base font-semibold text-white">{event.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/65">{event.description}</p>
                </div>
              </Link>
            </li>
          ))}
          <li style={{ animation: `fadeIn 0.35s ease-out ${navigationEvents.length * 30}ms both` }}>
            <Link
              href="/events"
              onClick={() => closeDesktop()}
              className="group flex h-full min-h-[184px] flex-col justify-end rounded-2xl p-5 text-white/80 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              <span className="flex items-center gap-2 text-base font-semibold">
                View All
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile bottom nav (CSS-switched, so it is in the server HTML) */}
      <nav
        aria-label="Main"
        className={`fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 rounded-full p-1 md:hidden ${glass}`}
      >
        <ul ref={mobileListRef} className="relative flex">
          <span
            ref={mobileIndicatorRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 rounded-full bg-white/[0.14] opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
          {navItems.map((item) => {
            const current = isCurrent(pathname, item.href)
            const cls = `relative flex w-full items-center justify-center rounded-full py-3 text-[13px] font-medium transition-colors ${
              current || (item.hasDropdown && mobileOpen) ? "text-white" : "text-white/70"
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
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-md md:hidden"
      >
        <div
          className={`absolute inset-x-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] top-16 flex flex-col overflow-hidden rounded-3xl ${glass} animate-in fade-in slide-in-from-bottom-2 duration-300`}
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-4">
            <h2 id="mobile-events-title" className="text-[11px] font-medium uppercase tracking-widest text-white/60">
              Our events
            </h2>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-mr-2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close events"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <ul className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-3 pb-3">
            {navigationEvents.map((event, index) => (
              <li key={event.id} style={mobileOpen ? { animation: `fadeSlideIn 0.35s cubic-bezier(0.32,0.72,0,1) ${index * 40}ms both` } : undefined}>
                <Link
                  href={`/events/${event.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="relative block overflow-hidden rounded-2xl bg-white/[0.04] transition-colors active:bg-white/[0.08]"
                >
                  <Image src={event.image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative p-5">
                    <div className="flex items-center justify-between gap-3">
                      {event.logo ? (
                        <div className="relative h-12 w-28">
                          <Image src={event.logo} alt={event.name} fill sizes="112px" className="object-contain object-left brightness-0 invert" />
                        </div>
                      ) : (
                        <span className="text-base font-semibold text-white">{event.name}</span>
                      )}
                      <span className="text-[11px] font-medium uppercase tracking-widest text-white/60">{event.type}</span>
                    </div>
                    <p className="mt-4 text-sm leading-snug text-white/75">{event.description}</p>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/events"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl p-5 text-sm font-medium text-white ring-1 ring-inset ring-white/10 active:bg-white/[0.06]"
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
