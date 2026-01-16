"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Check, ArrowUpRight } from "lucide-react"
import { displayEvents, getSortedUpcomingEvents } from "@/lib/data/events-data"

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

export default function SiteFooter() {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  const email = "info@necom.lv"

  const sortedUpcomingEvents = getSortedUpcomingEvents()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <footer ref={footerRef} className="bg-neutral-950 text-white relative mx-4 my-4 rounded-2xl">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Top section - CTA */}
        <div
          className={`mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full text-sm text-neutral-400 hover:bg-white/10 transition-all duration-300"
            >
              {email}
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-16" />

        {/* Links grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-20 transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Navigation */}
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Navigation</p>
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
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Events</p>
            <ul className="space-y-3">
              {displayEvents.slice(0, 4).map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.id}`}
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
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Upcoming</p>
            <ul className="space-y-3">
              {sortedUpcomingEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    href={event.link || "#"}
                    className="text-neutral-300 hover:text-white transition-colors text-sm block"
                  >
                    <span className="block">{event.name}</span>
                    <span className="text-xs text-neutral-500">{event.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Social</p>
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
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Legal</p>
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
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 transition-all duration-700 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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
            <div className="text-neutral-500 text-xs leading-relaxed">
              <p>Nords Event Communications SIA</p>
              <p>Reg. No. 40203089546</p>
              <p>Riga, Latvia</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-neutral-600 text-xs">&copy; {new Date().getFullYear()} NECom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
