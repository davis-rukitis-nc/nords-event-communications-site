/** @type {import('next').NextConfig} */

const securityHeaders = [
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
