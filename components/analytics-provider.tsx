"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useCookieConsent, CookieConsent } from "./cookie-consent"

export function AnalyticsProvider() {
  const { consent } = useCookieConsent()
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null)
  const [SpeedInsightsComponent, setSpeedInsightsComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Only load analytics if user has accepted cookies
    if (consent !== "accepted") return

    const loadAnalytics = async () => {
      try {
        const analyticsModule = await import("@vercel/analytics/react")
        setAnalyticsComponent(() => analyticsModule.Analytics)
      } catch (error) {
        // Silently fail - analytics are optional
      }
    }

    const loadSpeedInsights = async () => {
      try {
        const speedModule = await import("@vercel/speed-insights/next")
        setSpeedInsightsComponent(() => speedModule.SpeedInsights)
      } catch (error) {
        // Silently fail - speed insights are optional
      }
    }

    loadAnalytics()
    loadSpeedInsights()
  }, [consent])

  return (
    <>
      {/* Cookie consent banner - always rendered */}
      <CookieConsent />
      {/* Analytics - only rendered when consent is given */}
      {AnalyticsComponent && <AnalyticsComponent />}
      {SpeedInsightsComponent && <SpeedInsightsComponent />}
    </>
  )
}
