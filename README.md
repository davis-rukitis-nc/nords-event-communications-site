# NECom - Nords Event Communications

A modern, high-performance website for NECom (Nords Event Communications), a premium event marketing and sponsorship agency based in Latvia. The site showcases the agency's portfolio of prestigious events including marathons, wine festivals, and exclusive culinary experiences.

## Overview

NECom's digital presence is built as a fast, responsive web application that delivers an immersive user experience inspired by premium automotive brands. The site features smooth animations, video backgrounds, and a sophisticated dark aesthetic that reflects the agency's commitment to excellence.

## Features

- **Immersive Hero Experience** - Full-screen video backgrounds with dynamic content transitions
- **Event Portfolio** - Comprehensive showcase of managed events with detailed pages for each
- **Journal** - News and updates section with Markdown-powered content
- **Event Calendar** - Interactive calendar displaying upcoming events with countdown functionality
- **Partner Showcase** - Animated marquee displaying trusted brand partnerships
- **Responsive Design** - Optimized experience across desktop, tablet, and mobile devices
- **Dark Mode Aesthetic** - Premium glassmorphism effects and high-contrast visuals
- **SEO Optimized** - Structured data, meta tags, and sitemap generation
- **Privacy Focused** - GDPR-compliant cookie consent with minimal analytics footprint
- **Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation support

## Technology

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics (privacy-focused)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── events/            # Event pages and details
│   ├── journal/           # News and articles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── ...
├── components/
│   ├── sections/          # Page section components
│   ├── layout/            # Layout components (footer, headers)
│   ├── ui/                # Reusable UI components
│   ├── event-detail/      # Event-specific components
│   └── journal/           # Journal-specific components
├── lib/
│   ├── data/              # Data files and types
│   └── seo/               # SEO configuration
├── public/
│   ├── images/            # Static images
│   └── partners/          # Partner logos
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/necom-lv/necom-website.git

# Navigate to the project directory
cd necom-website

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

## Deployment

The site is configured for seamless deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments on every push to the main branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Events

NECom manages and markets several prestigious events:

- **Rimi Riga Marathon** - Baltic's premier running event
- **Riga Wine & Champagne** - Exclusive wine and culinary festival
- **Pink Noise Riga** - Music festival
- **Riga Whisky & Friends** - Premium spirits experience
- **Baltic Wine & Drinks Awards** - Regional beverage excellence awards
- **Baltic Brand Forum** - Marketing and brand professional conference

## License

This project is proprietary software. All rights reserved by Nords Event Communications.

## Contact

**NECom - Nords Event Communications**
- Website: [necom.lv](https://necom.lv)
- Email: info@necom.lv
- Location: Riga, Latvia

---

Built with care in Latvia
```

```jpg file="public/placeholder.jpg" isDeleted="true"
...deleted...
