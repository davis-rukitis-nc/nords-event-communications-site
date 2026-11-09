/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production"
// Vercel preview deployments load the comments/feedback toolbar from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview"
const vercelLive = isPreview ? " https://vercel.live" : ""

// Content Security Policy.
// All pages are statically generated, so per-request nonces are not possible;
// Next.js injects inline bootstrap scripts, which is why script-src needs 'unsafe-inline'.
// Everything else (images, video, fonts, analytics) is first-party.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${vercelLive ? " https://vercel.live https://vercel.com" : ""}`,
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

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
]

const nextConfig = {
  images: {
    // Only YouTube thumbnails for the click-to-load video facade; everything else is local.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
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
  // Hidden guest guide for Pink Noise Riga: a static page in public/pnr-riga-guide/.
  // Not linked anywhere and not in the sitemap; noindex keeps it out of search engines.
  async rewrites() {
    return [{ source: "/pnr-riga-guide", destination: "/pnr-riga-guide/index.html" }]
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/pnr-riga-guide/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/pnr-riga-guide",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
    ]
  },
}

export default nextConfig
