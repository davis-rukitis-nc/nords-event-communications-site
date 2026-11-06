import type { Metadata } from "next"

// Base SEO configuration
export const baseSEOConfig = {
  siteName: "NECom - Nords Event Communications",
  siteUrl: "https://www.necom.lv",
  defaultTitle: "NECom | Moved. Inspired. Elevated.",
  defaultDescription:
    "Nords Event Communications is not your regular events agency. We're a special force crafting experiences that are moving Riga and Latvia - literally and figuratively!",
  keywords: [
    "event marketing",
    "sponsorship agency",
    "Latvia events",
    "Baltic events",
    "Rimi Riga Marathon",
    "Riga Wine & Champagne",
    "brand activation",
    "Riga Whisky & Friends",
    "Baltic Wine & Drinks Awards",
  ],
  author: "NECom - Nords Event Communications",
  creator: "NECom",
  publisher: "NECom",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  language: "en-US",
  locale: "en_US",
}

// Generate page metadata. Titles are bare; the root layout template appends " | NECom".
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
}): Metadata {
  const isHome = title === baseSEOConfig.defaultTitle
  const fullTitle = isHome ? title : `${title} | NECom`
  const imageUrl = image || "/og-image.jpg"

  return {
    title: isHome ? { absolute: title } : title,
    description,
    keywords: [...baseSEOConfig.keywords, ...keywords],
    robots: noIndex ? "noindex, nofollow" : baseSEOConfig.robots,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: baseSEOConfig.siteName,
      images: [{ url: imageUrl, alt: title }],
      locale: baseSEOConfig.locale,
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors: [baseSEOConfig.author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}

// SEO-optimized meta tags for specific page types
export const pageMetaConfigs = {
  home: {
    title: baseSEOConfig.defaultTitle,
    description: baseSEOConfig.defaultDescription,
    keywords: ["homepage", "event agency", "Latvia", "Riga"],
    url: "/",
  },
  about: {
    title: "About Us",
    description:
      "Nords Event Communications (NECom) is an event production, marketing and sponsorship agency creating experiences that are moving Riga and Latvia - literally and figuratively!",
    keywords: ["about us", "team", "company", "mission", "values", "experience"],
    url: "/about",
  },
  events: {
    title: "Our Events",
    description:
      "Explore our world-class events, showcasing the team’s expertise in creating unforgettable experiences and efficient sponsorship packages!",
    keywords: ["events portfolio", "marathon", "wine events", "music festivals", "sports events"],
    url: "/events",
  },
  journal: {
    title: "Journal",
    description: "Stay updated with the latest insights and stories from our events!",
    keywords: ["blog", "news", "insights", "stories", "industry trends", "event updates"],
    url: "/journal",
  },
  contact: {
    title: "Contact Us",
    description:
      "Feel free to reach out with your ideas, interests in creating a partnership with our events, fine-tuning your sponsorship portfolio.",
    keywords: ["contact", "get in touch", "partnership", "sponsorship", "inquiry"],
    url: "/contact",
  },
}
