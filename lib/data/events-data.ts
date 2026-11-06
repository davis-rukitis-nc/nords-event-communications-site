// Centralized event data management

export interface Event {
  id: string
  /** URL segment under /events/. Defaults to id. */
  slug: string
  name: string
  type: string
  description: string
  image: string
  logo?: string
  /** First edition, used only to compute "years" stats. */
  startDate?: string
  yearStarted?: number
  annualParticipants?: string
  youtubeUrl?: string
  officialSiteUrl?: string
  longDescription?: string
  brandColors?: {
    primary: string
    secondary?: string
    tertiary?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
  }
  showInNavigation?: boolean
  showOnHomepage?: boolean
  isOneTimeEvent?: boolean
}

// Main events for display in navigation and cards
export const displayEvents: Event[] = [
  {
    id: "rimi-riga-marathon",
    slug: "rimi-riga-marathon",
    name: "Rimi Riga Marathon",
    type: "Sports",
    description: "The most impactful and international annual running event in the Baltics!",
    image: "/images/events/rimi-riga-marathon.webp",
    logo: "/images/logos/rimi-riga-marathon.png",
    startDate: "1991-07-27T09:00:00",
    yearStarted: 1991,
    annualParticipants: "46,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/loWG5xVfToA?si=ZCnhTOjir3cp7tFU",
    officialSiteUrl: "https://rimirigamarathon.com/",
    longDescription:
      "The Rimi Riga Marathon is the most internationally recognized running event in the Baltic States. It attracts thousands of runners from all over the world (116 countries in 2026) to a full marathon, half-marathon, 10k, 6k, a DPD mile, Signet Bank Relays and even a huge Kids’ Day. The course runs through the heart of Riga, offering stunning views of the city's historic architecture and the Daugava River.",
    brandColors: {
      primary: "#cc2128",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/rimirigamarathon",
      facebook: "https://www.facebook.com/RimiRigaMarathon",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "pink-noise-riga",
    slug: "pink-noise-riga",
    name: "Pink Noise Riga",
    type: "Music",
    description:
      "A new kid on the Baltic music scene - a cocktail of world-class jazz, pop-rock, fusion, and contemporary improvised music!",
    image: "/images/events/pink-noise-riga.webp",
    logo: "/images/logos/pink-noise-riga.svg",
    startDate: "2024-11-09T18:00:00",
    yearStarted: 2024,
    annualParticipants: "4,000+",
    officialSiteUrl: "https://pinknoiseriga.com/",
    longDescription:
      "Inaugurated in 2024 by the legendary jazz musician Branford Marsalis, Pink Noise Riga music festival offers a cocktail of world-class jazz, pop-rock, fusion, and contemporary improvised music. Festival’s main idea is to help Riga stand out & shine bright in Europe’s music scene.",
    brandColors: {
      primary: "#fa4100",
      secondary: "#73b6ff",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/riga.pinknoise",
      facebook: "https://www.facebook.com/PinkNoiseRiga",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "riga-wine-champagne",
    slug: "riga-wine-champagne",
    name: "Riga Wine & Champagne",
    type: "Food & Drinks",
    description: "The Baltic's most decadent celebration of wine, champagne and gastronomy!",
    image: "/images/events/riga-wine-champagne.webp",
    logo: "/images/logos/riga-wine-champagne.png",
    startDate: "2012-11-23T17:00:00",
    yearStarted: 2012,
    annualParticipants: "8,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/NifqOUXiTgc?si=u2C4Vgwso3S-cBwJ",
    officialSiteUrl: "https://rigawinechampagne.lv/",
    longDescription:
      "Riga Wine & Champagne is the most decadent wine and gastronomy festival in the Baltic region taking place two times a year. This sophisticated event showcases Champagne and exceptional wines from around the world, paired with exquisite culinary creations from top chefs, offering an unparalleled tasting & learning experience.",
    brandColors: {
      primary: "#e40521",
      secondary: "#f5f5f5",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/rigawinechamp",
      facebook: "https://www.facebook.com/RigaWineChampagne",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "riga-whisky-friends",
    slug: "riga-whisky-friends",
    name: "Riga Whisky & Friends",
    type: "Food & Drinks",
    description: "Riga's annual gathering of fine spirits and drinks at the legendary Riga Circus!",
    image: "/images/events/riga-whisky-friends.webp",
    logo: "/images/logos/riga-whisky-friends.svg",
    startDate: "2024-09-21T16:00:00",
    yearStarted: 2024,
    annualParticipants: "1,000+",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/-jVeUXAanik?si=SnWcvdwsDYOlPSY2",
    officialSiteUrl: "https://rigawhiskyfriends.com/",
    longDescription:
      "Riga Whisky & Friends is an exclusive gathering for whisky enthusiasts and connoisseurs. The event features rare and exceptional spirits from renowned distilleries worldwide, complemented by masterclasses and tastings led by industry experts.",
    brandColors: {
      primary: "#023047",
      secondary: "#ff792c",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/riga.whiskyfriends",
      facebook: "https://www.facebook.com/rigawhisky",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "baltic-wine-drinks-awards",
    slug: "baltic-wine-drinks-awards",
    name: "Baltic Wine & Drinks Awards",
    type: "Food & Drinks",
    description:
      "An insider's guide to the best Baltic restaurants, bars, retailers with good, great, and extraordinary wine lists, drinks programmes, and portfolios!",
    image: "/images/events/baltic-wine-drinks-awards.webp",
    logo: "/images/logos/baltic-wine-drinks-awards.svg",
    startDate: "2018-03-09T19:00:00",
    yearStarted: 2018,
    youtubeUrl: "https://www.youtube-nocookie.com/embed/UnqE9E981E8?si=1kia80iakMPeMVsR",
    officialSiteUrl: "https://balticwinelists.com/",
    longDescription:
      "The Baltic Wine & Drinks Awards recognizes and celebrates the finest wine programs across the Baltic region. This prestigious event honors restaurants, bars, and hotels that demonstrate exceptional wine knowledge, curation, and service excellence.",
    brandColors: {
      primary: "#231F20",
      secondary: "#fad0c5",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/balticwinedrinksawards",
      facebook: "https://www.facebook.com/BalticWineDrinksAwards",
    },
    showInNavigation: true,
    showOnHomepage: true,
  },
  {
    id: "world-athletics-road-running-championships-riga23",
    slug: "world-athletics-riga23",
    name: "World Athletics Road Running Championships Riga23",
    type: "Sports",
    description: "The Inaugural World Champs of Riga, the World Road Running Capital!",
    image: "/images/events/world-athletics-riga23.webp",
    logo: "/images/logos/world-athletics-riga23.svg",
    startDate: "2023-09-30T09:00:00",
    yearStarted: 2023,
    youtubeUrl: "https://www.youtube.com/embed/iBbepfFzAiM?si=WsajxzIspSq0tKvG",
    longDescription:
      "We’re very proud of the fact that Riga (and us) became the hosts of the first ever World Athletics Road Running Championships Riga 23, the world’s premier road running event! The legacy of the event lives on – we’ve put Riga on the world’s running map forever, and the courses developed for the World Champs can still be experienced when running the annual Rimi Riga marathon!",
    brandColors: {
      primary: "#A5FA64",
      secondary: "#69d7e1",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/wariga23/",
      facebook: "https://www.facebook.com/WARiga23/",
    },
    showInNavigation: false,
    showOnHomepage: true,
    isOneTimeEvent: true,
  },
  {
    id: "baltic-brand-forum",
    slug: "baltic-brand-forum",
    name: "Baltic Brand Forum",
    type: "Marketing",
    description: "The leading inspirational platform for marketing & brand professionals in the Baltics!",
    image: "/images/events/baltic-brand-forum.jpg",
    startDate: "2019-10-03T09:00:00",
    yearStarted: 2019,
    youtubeUrl: "https://www.youtube.com/embed/BG3G1SjuxlE?si=BxAO8044hXlwPoKB",
    longDescription:
      "Created by our friends Magic Agency (https://www.magicagency.lv/), Baltic Brand Forum has become the leading inspirational platform for marketing & brand professionals in the Baltics. And we've certainly helped by producing the event since forever...",
    brandColors: {
      primary: "#1f2937",
      secondary: "#6366f1",
    },
    showInNavigation: false,
    showOnHomepage: false,
  },
]

// Helper functions for filtering events
export function getNavigationEvents(): Event[] {
  return displayEvents.filter((e) => e.showInNavigation !== false)
}

export function getHomepageEvents(): Event[] {
  return displayEvents.filter((e) => e.showOnHomepage !== false)
}

export function getAllEvents(): Event[] {
  return displayEvents
}
