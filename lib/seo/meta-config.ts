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
  themeColor: "#000000",
  colorScheme: "light dark",
}

// Generate page metadata
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
  const fullTitle = title === baseSEOConfig.defaultTitle ? title : `${title} | NECom`
  const fullUrl = `${baseSEOConfig.siteUrl}${url}`
  const imageUrl = image || `${baseSEOConfig.siteUrl}/og-image.jpg`

  const allKeywords = [...baseSEOConfig.keywords, ...keywords].join(", ")

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: baseSEOConfig.author }],
    creator: baseSEOConfig.creator,
    publisher: baseSEOConfig.publisher,
    robots: noIndex ? "noindex, nofollow" : baseSEOConfig.robots,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: baseSEOConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
    other: {
      "theme-color": baseSEOConfig.themeColor,
      "color-scheme": baseSEOConfig.colorScheme,
      "format-detection": "telephone=no",
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
