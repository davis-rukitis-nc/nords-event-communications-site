# Component Naming Conventions

This document outlines the standardized naming conventions used throughout the NECom website codebase to ensure consistency, readability, and maintainability.

## Naming Scheme Overview

Our naming convention follows a hierarchical structure that clearly indicates the component's purpose, location, and functionality:

```
[Category]/[Purpose]-[Type]
```

## Directory Structure

```
components/
├── ui/                    # Reusable UI components
├── sections/              # Page section components
├── layout/                # Layout wrapper components
├── event-detail/          # Event page specific components
├── journal/               # Journal/news specific components
└── seo/                   # SEO-related components

lib/
├── data/                  # Data management and types
├── seo/                   # SEO utilities and config
└── utils.ts               # Utility functions

hooks/
├── use-mobile.ts          # Mobile detection hook
└── use-toast.ts           # Toast notification hook
```

## Component Categories

### 1. UI Components (`components/ui/`)
**Purpose**: Reusable, generic UI elements
**Naming Pattern**: `[Element]` or `[Element]-[Variant]`

Examples:
- `site-logo.tsx` - Main site logo with blend mode
- `button.tsx` - Generic button component
- `card.tsx` - Card container component

### 2. Section Components (`components/sections/`)
**Purpose**: Page sections and content blocks
**Naming Pattern**: `[Content]-section.tsx`

Examples:
- `hero-section.tsx` - Homepage hero section
- `about-section.tsx` - About content section
- `news-section.tsx` - News/articles section
- `events-showcase-section.tsx` - Featured events showcase
- `partners-section.tsx` - Partner logos marquee
- `get-in-touch-section.tsx` - Contact CTA section
- `team-section.tsx` - Team members section

### 3. Layout Components (`components/layout/`)
**Purpose**: Layout wrappers and structural elements
**Naming Pattern**: `[Scope]-[Element].tsx`

Examples:
- `site-footer.tsx` - Main site footer
- `page-header.tsx` - Page-level header
- `scroll-to-top.tsx` - Scroll to top button

### 4. Feature Components (Root `components/`)
**Purpose**: Standalone feature components
**Naming Pattern**: `[feature]-[purpose].tsx`

Examples:
- `navigation.tsx` - Main site navigation
- `cookie-consent.tsx` - Cookie consent banner
- `event-calendar.tsx` - Event calendar widget
- `event-countdown.tsx` - Countdown to next event
- `analytics-provider.tsx` - Analytics wrapper
- `theme-provider.tsx` - Theme context provider

### 5. Event Detail Components (`components/event-detail/`)
**Purpose**: Components specific to event detail pages
**Naming Pattern**: `[element]-[purpose].tsx`

Examples:
- `event-header.tsx` - Event page header
- `event-stats.tsx` - Event statistics display
- `other-events.tsx` - Related events section
- `partner-cta.tsx` - Partner call-to-action
- `youtube-embed.tsx` - YouTube video embed

### 6. Journal Components (`components/journal/`)
**Purpose**: Components specific to journal/news pages
**Naming Pattern**: `[element]-[type].tsx`

Examples:
- `article-card.tsx` - Article preview card

## Data Files

### Data Files (`lib/data/`)
**Purpose**: Data management, types, and constants
**Naming Pattern**: `[content-type]-data.ts`

Examples:
- `events-data.ts` - Event data, types, and helpers
- `journal-data.ts` - Journal articles and helpers
- `partners-data.ts` - Partner information
- `team-data.ts` - Team member data

## Page Files

### Page Files (`app/*/page.tsx`)
**Purpose**: Next.js page components
**Structure**: Use default exports, component name matches route

Examples:
- `app/page.tsx` - Homepage
- `app/events/page.tsx` - Events listing
- `app/events/[slug]/page.tsx` - Event detail (dynamic)
- `app/journal/page.tsx` - Journal listing
- `app/journal/[slug]/page.tsx` - Article detail (dynamic)

## File Naming Conventions

### General Rules
- Use **kebab-case** for all file names: `event-calendar.tsx`
- Use **PascalCase** for component exports: `export function EventCalendar()`
- Use **camelCase** for variables and functions: `handleClick`, `isVisible`

### Boolean Variables
- Prefix with `is`, `has`, `should`, `can`: `isLoading`, `hasConsent`, `shouldAnimate`

### Event Handlers
- Prefix with `handle`: `handleClick`, `handleSubmit`, `handleToggle`

### Data Arrays
- Use plural nouns: `events`, `articles`, `partners`
- Be descriptive: `upcomingEvents`, `featuredPartners`

## Examples of Good vs. Poor Naming

### Good Examples
- `cookie-consent.tsx` - Clear purpose
- `event-countdown.tsx` - Specific functionality
- `hero-section.tsx` - Indicates section type
- `site-footer.tsx` - Scope is clear (site-wide)

### Poor Examples
- `consent.tsx` - Too vague
- `countdown.tsx` - Missing context
- `hero.tsx` - Unclear if page, section, or component
- `footer.tsx` - Missing scope indicator

## TypeScript Interfaces

### Naming Pattern
- Use **PascalCase** with descriptive names
- Suffix with purpose when helpful: `EventData`, `ArticleProps`, `CalendarEvent`

Examples:
```typescript
interface EventData {
  id: string
  title: string
  // ...
}

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact'
}
```

## CSS Classes

- Use Tailwind CSS utility classes
- For custom classes, use kebab-case: `.article-content`, `.logo-blend`
- Prefix custom animations: `animate-marquee`, `animate-fade-in`

---

Following these conventions ensures code consistency and makes the codebase easier to navigate for all contributors.
