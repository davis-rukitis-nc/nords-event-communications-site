import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

/** An event series (pages under /events). */
export interface Event {
  id: string
  slug: string
  name: string
  type: string
  description: string
  image: string
  imageAlt?: string
  logo?: string
  /** First edition, used only to compute "years" stats. */
  startDate?: string
  yearStarted?: number
  annualParticipants?: string
  youtubeUrl?: string
  officialSiteUrl?: string
  longDescription?: string
  brandColors?: { primary?: string | null; secondary?: string | null; tertiary?: string | null }
  socialMedia?: { instagram?: string | null; facebook?: string | null }
  showInNavigation?: boolean
  showOnHomepage?: boolean
  isOneTimeEvent?: boolean
}

export interface Partner {
  name: string
  logo: string
  link?: string
}

export interface JournalArticle {
  id: string
  /** YYYY-MM-DD */
  date: string
  category: string
  title: string
  tags: string[]
  image: string
  excerpt: string
  content: SerializedEditorState
}
