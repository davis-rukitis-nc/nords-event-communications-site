import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production"
// Vercel preview deployments load the comments/feedback toolbar from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview"
const vercelLive = isPreview ? " https://vercel.live" : ""

// CMS images are served straight from Vercel Blob's CDN.
const BLOB_HOST = "https://*.public.blob.vercel-storage.com"

// Content Security Policy for the public site.
// All pages are statically generated, so per-request nonces are not possible;
// Next.js injects inline bootstrap scripts, which is why script-src needs 'unsafe-inline'.
// Everything else (images, video, fonts, analytics) is first-party.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob: ${BLOB_HOST}${vercelLive ? " https://vercel.live https://vercel.com" : ""}`,
  "media-src 'self'",
  `font-src 'self'${vercelLive ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${isDev ? " ws:" : ""}${vercelLive ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src https://www.youtube-nocookie.com${vercelLive}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

// Payload's admin panel (/admin) needs a looser policy: its code editor (Monaco) loads from
// cdn.jsdelivr.net and it previews uploads from Blob. It is only reachable after login.
const adminCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net${vercelLive}`,
  `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net${vercelLive}`,
  `img-src 'self' data: blob: ${BLOB_HOST}${vercelLive ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self' data: https://cdn.jsdelivr.net${vercelLive ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self' ${BLOB_HOST} https://blob.vercel-storage.com${isDev ? " ws:" : ""}${vercelLive ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `worker-src 'self' blob:`,
  `frame-src 'self' https://www.youtube-nocookie.com${vercelLive}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ")

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
]

const nextConfig = {
  images: {
    // YouTube thumbnails (video facade) and CMS uploads on Vercel Blob.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    // CMS uploads when developing locally without Blob.
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/**" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/events/world-athletics-road-running-championships-riga23",
        destination: "/events/world-athletics-riga23",
        permanent: true,
      },
    ]
  },
  // Hidden static pages, not linked anywhere and not in the sitemap; noindex keeps them out of
  // search engines. Pink Noise Riga guest guide: public/pnr-riga-guide/.
  // Baltic Wine & Drinks Awards producer menus: public/bwda/menu/<name>.html → /bwda/menu/<name>.
  async rewrites() {
    return [
      { source: "/pnr-riga-guide", destination: "/pnr-riga-guide/index.html" },
      { source: "/bwda/menu/:name", destination: "/bwda/menu/:name.html" },
    ]
  },
  async headers() {
    return [
      // Everything except the CMS admin gets the strict site policy.
      {
        source: "/:path((?!admin(?:/|$)).*)",
        headers: [...baseHeaders, { key: "Content-Security-Policy", value: csp }, { key: "X-Frame-Options", value: "DENY" }],
      },
      // The admin frames its own live preview, so it may be framed by itself only.
      {
        source: "/admin/:path*",
        headers: [...baseHeaders, { key: "Content-Security-Policy", value: adminCsp }, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/admin",
        headers: [...baseHeaders, { key: "Content-Security-Policy", value: adminCsp }, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/pnr-riga-guide/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/pnr-riga-guide",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/bwda/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
