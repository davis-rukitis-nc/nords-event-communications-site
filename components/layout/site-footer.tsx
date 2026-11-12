import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getCalendarEvents, getNavigationEvents } from "@/lib/cms"
import { formatEventDate, getUpcomingCalendarEvents } from "@/lib/data/calendar"
import CopyEmailButton from "./copy-email-button"

const footerNavigationItems = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://instagram.com/necom.lv/", label: "Instagram" },
  { href: "https://linkedin.com/company/necom-lv", label: "LinkedIn" },
  { href: "https://www.facebook.com/necom.lv/", label: "Facebook" },
]

export default async function SiteFooter() {
  const navigationEvents = await getNavigationEvents()
  const calendarEvents = await getCalendarEvents()
  const email = "info@necom.lv"
  const upcoming = getUpcomingCalendarEvents(calendarEvents).slice(0, 4)

  return (
    <footer className="relative mx-4 mb-28 mt-4 rounded-2xl bg-neutral-950 text-white md:mb-4">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section - CTA */}
        <div
          className={`mb-20`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 max-w-2xl leading-tight">
            Contact us
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-sm hover:bg-white hover:text-neutral-950 transition-all duration-300"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <CopyEmailButton
              email={email}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm text-neutral-300 transition-colors duration-300 hover:bg-white/10"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-16" />

        {/* Links grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-20`}
        >
          {/* Navigation */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6">Navigation</p>
            <ul className="space-y-3">
              {footerNavigationItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-neutral-300 hover:text-white transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6">Events</p>
            <ul className="space-y-3">
              {navigationEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6">Upcoming</p>
            <ul className="space-y-3">
              {upcoming.map((event) => (
                <li key={event.id}>
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      <span className="block">{event.name}</span>
                      <span className="text-xs text-neutral-400">{formatEventDate(event)}</span>
                    </a>
                  ) : (
                    <span className="block text-sm text-neutral-300">
                      <span className="block">{event.name}</span>
                      <span className="text-xs text-neutral-400">{formatEventDate(event)}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6">Social</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-6">Legal</p>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8`}
        >
          {/* Logo and company info */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/logo-light.svg"
                alt="NECom"
                width={120}
                height={40}
                className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </Link>
            <div className="text-neutral-400 text-xs leading-relaxed">
              <p>Nords Event Communications SIA</p>
              <p>Reg. No. 50003981501</p>
              <p>Brīvības iela 40–24, Rīga, LV-1050, Latvia</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-neutral-400 text-xs">&copy; {new Date().getFullYear()} NECom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
