import type { Event } from "@/lib/data/events-data"
import type { JournalArticle } from "@/lib/data/journal-data"

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NECom - Nords Event Communications",
  alternateName: "NECom",
  url: "https://www.necom.lv",
  logo: "https://www.necom.lv/logo-dark.svg",
  description:
    "Nords Event Communications is not your regular events agency. We're a special force crafting experiences that are moving Riga and Latvia - literally and figuratively!",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LV",
    addressLocality: "Riga",
    addressRegion: "Riga",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@necom.lv",
  },
  sameAs: [
    "https://www.linkedin.com/company/necom-lv",
    "https://www.instagram.com/necom.lv",
    "https://www.facebook.com/necom-lv",
  ],
  foundingDate: "2008",
  numberOfEmployees: "10-50",
  industry: "Event Marketing and Management",
  areaServed: {
    "@type": "Place",
    name: "Baltics",
  },
}

// Website structured data
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NECom - Nords Event Communications",
  url: "https://www.necom.lv",
  description:
    "We're a special force crafting experiences that are moving Riga and Latvia - literally and figuratively!",
  publisher: {
    "@type": "Organization",
    name: "NECom",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.necom.lv/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

// Event structured data generator
export function generateEventStructuredData(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    image: event.image,
    url: `https://www.necom.lv/events/${event.id}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: "NECom - Nords Event Communications",
      url: "https://www.necom.lv",
    },
    location: {
      "@type": "Place",
      name: "Riga, Latvia",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riga",
        addressCountry: "LV",
      },
    },
    ...(event.yearStarted && {
      startDate: `${event.yearStarted}-01-01`,
    }),
    ...(event.annualParticipants && {
      maximumAttendeeCapacity: event.annualParticipants.replace(/[^\d]/g, ""),
    }),
    category: event.type,
    keywords: [event.type, "Latvia", "Riga", "Event", "Marketing", "Sponsorship"],
  }
}

// Article structured data generator
export function generateArticleStructuredData(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    url: `https://www.necom.lv/journal/${article.id}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "NECom - Nords Event Communications",
    },
    publisher: {
      "@type": "Organization",
      name: "NECom - Nords Event Communications",
      logo: {
        "@type": "ImageObject",
        url: "https://www.necom.lv/logo-light.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.necom.lv/journal/${article.id}`,
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    wordCount: article.content.split(" ").length,
    inLanguage: "en-US",
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

// FAQ structured data generator
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
