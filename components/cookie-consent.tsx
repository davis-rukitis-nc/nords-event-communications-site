"use client"

import { useState, useEffect } from "react"

const COOKIE_CONSENT_KEY = "necom-cookie-consent"

type ConsentStatus = "pending" | "accepted" | "declined"

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>("pending")

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setConsent("accepted")
  }

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    setConsent("declined")
  }

  return { consent, acceptCookies, declineCookies }
}

export function CookieConsent() {
  const { consent, acceptCookies, declineCookies } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay for smoother appearance after page load
    if (consent === "pending") {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [consent])

  if (consent !== "pending" || !isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up" style={{ animationDuration: "0.3s" }}>
      <div className="max-w-3xl mx-auto">
        <div
          className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-white/10"
          style={{
            background: "rgba(23, 23, 23, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Text content */}
          <p className="text-xs md:text-sm text-neutral-400">
            We use privacy-focused analytics.{" "}
            <a
              href="/privacy"
              className="text-neutral-200 underline underline-offset-2 hover:text-white transition-colors"
            >
              Learn more
            </a>
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={declineCookies}
              className="px-3 py-1 text-xs font-medium text-neutral-500 hover:text-white transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-1 text-xs font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export consent check for use in other components
export function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return "pending"
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (stored === "accepted" || stored === "declined") return stored
  return "pending"
}
