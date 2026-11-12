import type { JournalArticle } from "@/lib/cms/types"
import type { CalendarEvent } from "@/lib/data/calendar"

const SITE = "https://www.necom.lv"

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "NECom - Nords Event Communications",
  legalName: "Nords Event Communications SIA",
  alternateName: "NECom",
  url: SITE,
  logo: `${SITE}/icons/icon-512.png`,
  image: `${SITE}/og-image.jpg`,
  description:
    "Nords Event Communications is not your regular events agency. We're a special force crafting experiences that are moving Riga and Latvia - literally and figuratively!",
  email: "info@necom.lv",
  identifier: { "@type": "PropertyValue", propertyID: "LV company registration number", value: "50003981501" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Brīvības iela 40–24",
    addressLocality: "Rīga",
    postalCode: "LV-1050",
    addressCountry: "LV",
  },
  foundingDate: "2008",
  areaServed: "Baltics",
  sameAs: [
    "https://www.instagram.com/necom.lv/",
    "https://www.linkedin.com/company/necom-lv",
    "https://www.facebook.com/necom.lv/",
  ],
}

// Website structured data
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "NECom - Nords Event Communications",
  url: SITE,
  inLanguage: "en",
  publisher: { "@id": `${SITE}/#organization` },
}

// Dated event (from lib/data/calendar.ts). TBA entries are skipped by callers.
export function generateCalendarEventStructuredData(event: CalendarEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    ...(event.description && { description: event.description }),
    startDate: event.start,
    ...(event.end && { endDate: event.end }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.link && { url: event.link }),
    location: {
      "@type": "Place",
      name: event.venue ?? "Riga",
      address: { "@type": "PostalAddress", addressLocality: "Rīga", addressCountry: "LV" },
    },
    organizer: { "@id": `${SITE}/#organization` },
    ...(event.soldOut && {
      offers: { "@type": "Offer", availability: "https://schema.org/SoldOut", url: event.link },
    }),
  }
}

// Article structured data generator
export function generateArticleStructuredData(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith("/") ? `${SITE}${article.image}` : article.image,
    url: `https://www.necom.lv/journal/${article.id}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "NECom - Nords Event Communications",
    },
    publisher: { "@id": `${SITE}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.necom.lv/journal/${article.id}`,
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    inLanguage: "en",
  }
}

// Breadcrumb structured data generator
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}
