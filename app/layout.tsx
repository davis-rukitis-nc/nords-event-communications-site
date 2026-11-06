import type { Metadata, Viewport } from "next"
import type React from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import SiteFooter from "@/components/layout/site-footer"
import StructuredData from "@/components/seo/structured-data"
import { organizationStructuredData, websiteStructuredData } from "@/lib/seo/structured-data"
import { baseSEOConfig } from "@/lib/seo/meta-config"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

// Footer "Upcoming" and the calendars depend on today's date.
export const revalidate = 3600

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
}

export const metadata: Metadata = {
  metadataBase: new URL(baseSEOConfig.siteUrl),
  title: {
    default: baseSEOConfig.defaultTitle,
    template: "%s | NECom",
  },
  description: baseSEOConfig.defaultDescription,
  applicationName: "NECom",
  authors: [{ name: baseSEOConfig.author }],
  creator: baseSEOConfig.creator,
  publisher: baseSEOConfig.publisher,
  robots: baseSEOConfig.robots,
  formatDetection: { telephone: false },
  openGraph: {
    siteName: baseSEOConfig.siteName,
    locale: baseSEOConfig.locale,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "NECom - Nords Event Communications" }],
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <StructuredData data={[organizationStructuredData, websiteStructuredData]} />
        <Navigation />
        <main id="content" tabIndex={-1} className="flex-grow outline-none">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
