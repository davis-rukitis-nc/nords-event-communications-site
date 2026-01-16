import type { Metadata } from "next"
import { Suspense } from "react"
import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import SiteFooter from "@/components/layout/site-footer"
import ScrollToTop from "@/components/layout/scroll-to-top"
import StructuredData from "@/components/seo/structured-data"
import { organizationStructuredData, websiteStructuredData } from "@/lib/seo/structured-data"
import { baseSEOConfig } from "@/lib/seo/meta-config"
import { AnalyticsProvider } from "@/components/analytics-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(baseSEOConfig.siteUrl),
  title: {
    default: baseSEOConfig.defaultTitle,
    template: "%s | NECom",
  },
  description: baseSEOConfig.defaultDescription,
  keywords: baseSEOConfig.keywords.join(", "),
  authors: [{ name: baseSEOConfig.author }],
  creator: baseSEOConfig.creator,
  publisher: baseSEOConfig.publisher,
  robots: baseSEOConfig.robots,
  manifest: "/manifest.json",
  alternates: {
    canonical: baseSEOConfig.siteUrl,
  },
  openGraph: {
    title: baseSEOConfig.defaultTitle,
    description: baseSEOConfig.defaultDescription,
    url: baseSEOConfig.siteUrl,
    siteName: baseSEOConfig.siteName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NECom - Nords Event Communications",
      },
    ],
    locale: baseSEOConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: baseSEOConfig.defaultTitle,
    description: baseSEOConfig.defaultDescription,
    creator: "@necom_lv",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "theme-color": baseSEOConfig.themeColor,
    "color-scheme": baseSEOConfig.colorScheme,
    "format-detection": "telephone=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#000000",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData data={[organizationStructuredData, websiteStructuredData]} />
      </head>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">
          <ScrollToTop>{children}</ScrollToTop>
        </main>
        <SiteFooter />
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
      </body>
    </html>
  )
}
