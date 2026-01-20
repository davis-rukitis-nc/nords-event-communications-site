"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { displayEvents } from "@/lib/data/events-data"

const BottleSVG1 = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    viewBox="0 0 49 158"
    preserveAspectRatio="xMidYMax meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full transition-all duration-150 cursor-pointer hover:scale-110 ${filled ? "opacity-20 scale-90" : "opacity-100"}`}
    onClick={onClick}
  >
    <path
      d="M29.7554 12.7559C30.6193 11.4239 31.4822 10.0918 32.346 8.76065C32.5226 8.48788 32.7051 8.19691 32.707 7.87503C32.7166 6.7621 30.8982 6.64389 30.2844 5.70372C29.8529 5.0436 30.1377 4.16889 29.9581 3.40693C29.6715 2.1867 28.3096 1.54385 27.0819 1.15742C26.1399 0.861 25.1486 0.61186 24.168 0.744612C23.1873 0.877364 22.2144 1.47657 21.9316 2.39674C21.6479 3.31691 22.3177 4.47531 23.307 4.5035C21.8785 4.41439 20.4086 5.0245 19.538 6.12562C18.6674 7.22673 18.4473 8.79521 19.038 10.0591C19.2725 10.5592 19.6219 11.0102 19.7899 11.5339C19.9665 12.0831 19.9308 12.6714 19.8941 13.2442C19.5611 18.3988 19.2281 23.5534 18.8961 28.708"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.4798 6.70801C21.7949 8.94794 22.2928 11.636 23.707 13.325C22.9958 13.4157 22.1254 13.6627 21.9549 14.4899C21.8925 14.7947 21.9474 15.1142 21.9917 15.4234C22.244 17.1789 22.1456 19.0052 21.707 20.708"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.9141 12.708C30.6592 24.6141 31.4373 36.6945 35.3328 47.9585C37.59 54.4864 40.8563 60.6178 43.2092 67.1114C44.9762 71.9875 46.2216 77.0559 46.9161 82.2002C48.0079 90.2923 47.7366 98.501 47.4634 106.663C46.9924 120.7 46.5215 134.738 46.0505 148.775C46.0275 149.474 45.9926 150.211 45.6201 150.801C45.2144 151.443 44.4868 151.787 43.7924 152.085C34.1701 156.213 23.4211 157.626 13.0722 156.124C8.42065 155.449 3.48489 153.955 0.707031 150.129"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.707 28.708C18.1699 38.4075 15.6696 47.9827 11.4201 56.6158C10.1443 59.2071 8.71218 61.7164 7.58573 64.3824C6.34974 67.306 5.49364 70.3918 4.77714 73.5009C3.60564 78.5871 2.79902 83.7688 2.42619 88.9864C2.13817 93.0044 2.10813 97.0368 2.07721 101.066C1.95352 117.28 1.83072 133.494 1.70703 149.708"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39.707 59.0232C35.652 59.8978 31.5117 60.281 27.3831 60.1657C27.8246 61.7377 26.9542 63.5313 25.6286 64.2602C24.3039 64.9881 22.673 64.7743 21.3647 64.01C20.3053 63.3905 19.4103 62.4272 18.8179 61.2699C18.5926 60.8286 18.3882 60.3332 17.992 60.081C17.7676 59.9382 17.5059 59.8909 17.2506 59.8466C15.0691 59.4674 12.8876 59.0882 10.707 58.708"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44.707 93.708C31.7028 93.558 18.7003 93.2241 5.70703 92.708"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45.707 94.708C43.025 112.195 40.3349 129.924 42.1382 147.529C42.2023 148.151 42.2583 148.832 41.9188 149.352C41.6434 149.772 41.1638 149.994 40.7042 150.177C37.1318 151.599 33.2487 151.918 29.4298 152.224C20.3235 152.952 10.5454 153.528 2.70703 148.715"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BottleSVG2 = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    viewBox="0 0 44 156"
    preserveAspectRatio="xMidYMax meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full transition-all duration-150 cursor-pointer hover:scale-110 ${filled ? "opacity-20 scale-90" : "opacity-100"}`}
    onClick={onClick}
  >
    <path
      d="M29.4706 14.2711C29.0603 13.8651 29.1323 13.144 29.3877 12.6158C29.643 12.0867 30.0442 11.6378 30.2356 11.079C30.4618 10.4209 30.3706 9.69409 30.2776 8.99971C30.0204 7.09805 29.7633 5.19543 29.5062 3.29377C29.4369 2.78086 29.3521 2.23262 29.0138 1.85725C28.7193 1.5306 28.2862 1.39592 27.8731 1.27749C26.5501 0.900211 25.176 0.558274 23.8211 0.776999C22.467 0.996679 21.1267 1.90596 20.7492 3.29568C20.2349 5.19256 22.0914 7.31391 23.9241 6.9223C22.6376 6.56126 20.8185 6.48867 20.4438 7.83732C20.327 8.26044 20.4091 8.71222 20.4839 9.14585C21.7659 16.635 20.4182 24.3143 19.0742 31.791"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.6612 31.7916C17.4405 43.2273 11.3901 53.4979 7.61093 64.231C1.58774 81.3369 1.29855 99.9827 1.07884 118.213C0.954907 128.495 0.830969 138.776 0.707031 149.058"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.7241 12.0117C24.0533 11.9447 23.3563 11.8666 22.7727 11.4213C22.1892 10.9747 21.7539 10.0469 21.9434 9.18603"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.3113 12.0115C22.7704 13.4071 22.2998 14.822 21.8984 16.25"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.826 14.8374C28.2071 29.7287 30.4246 45.0299 36.201 58.8258C37.8741 62.822 39.8489 66.7191 40.9349 70.9183C41.7289 73.99 42.0325 77.1665 42.2734 80.3324C43.9435 102.292 42.7347 124.359 41.5239 146.348C41.4658 147.412 41.3836 148.546 40.7531 149.4C40.2038 150.143 39.3276 150.551 38.4804 150.905C27.711 155.409 15.3652 155.936 4.25914 152.366C2.81334 151.902 1.22152 151.209 0.707031 149.766"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.7118 87.6739C34.5427 88.6515 19.2852 88.1831 4.19922 86.2773"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.8668 87.9864C50.2322 106.973 49.9499 125.973 49.0217 144.94C34.6604 149.47 19.0341 149.717 4.54297 145.641"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44.0059 51.7792C39.8541 53.6711 35.0165 53.9318 30.6932 52.4979C30.7253 53.588 30.656 54.8834 29.7538 55.4626C29.4083 55.6843 28.9918 55.7561 28.5857 55.7994C25.7786 56.0938 22.8684 55.1526 20.7349 53.2607C20.2855 52.8624 19.85 52.4122 19.2871 52.2173C18.9365 52.0961 18.5598 52.0831 18.1892 52.0719C16.9285 52.032 15.667 51.9931 14.4062 51.9533"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BottleSVG3 = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    viewBox="0 0 54 157"
    preserveAspectRatio="xMidYMax meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full transition-all duration-150 cursor-pointer hover:scale-110 ${filled ? "opacity-20 scale-90" : "opacity-100"}`}
    onClick={onClick}
  >
    <path
      d="M32.9913 13.3353C34.3923 13.4011 35.5015 11.9534 35.6262 10.5247C35.7517 9.09601 35.1673 7.71322 34.5958 6.40316C33.884 4.771 33.1134 3.06264 31.6986 2.01494C30.9955 1.49369 30.1703 1.16812 29.3287 0.949057C28.1875 0.65293 26.9285 0.555953 25.8748 1.09279C24.8201 1.62876 24.0937 2.96307 24.5361 4.07917C24.7084 4.5147 25.0435 4.95716 24.892 5.40048C24.7136 5.92174 24.0391 5.98581 23.5369 6.19016C22.31 6.69236 21.9411 8.3505 22.2459 9.66575C22.5507 10.9819 23.3257 12.1335 23.7326 13.4193C24.2954 15.1934 24.13 17.1122 23.9421 18.9678C23.5438 22.8979 23.0668 26.8203 22.5109 30.7314"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.7143 4.43558C27.1498 4.11954 27.8062 4.43731 28.0304 4.93345C28.2555 5.43046 28.1655 6.01232 28.0287 6.54137C27.8927 7.07041 27.7135 7.60639 27.7733 8.15015C27.7966 8.36575 27.8564 8.59174 27.775 8.79089C27.51 9.44203 26.219 9.02035 26.0476 9.70265C25.8961 10.3018 26.8961 10.5564 27.0295 11.1599C26.7394 11.4327 26.4493 11.7045 26.1593 11.9773C26.8944 12.4059 27.7196 12.67 28.5612 12.7462C27.2459 12.8942 25.909 12.8388 24.6094 12.5834"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.207 13.2229C26.7569 14.3823 26.8114 15.7824 26.3534 16.9834"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.8711 13.3828C34.33 17.7399 34.788 22.0969 35.247 26.454C35.6366 30.1564 36.0314 33.8857 37.1086 37.4427C38.2792 41.3071 40.224 44.8701 42.1557 48.3994C43.2831 50.4593 44.4096 52.5192 45.5369 54.5791"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45.903 54.1697C49.7449 63.1712 52.0541 72.8542 52.6966 82.6532C52.9417 86.3834 52.9468 90.1257 52.9425 93.8645C52.9217 111.159 52.7001 128.454 52.2767 145.744C52.2377 147.308 52.1676 148.972 51.2965 150.258C50.5839 151.311 49.4332 151.956 48.2919 152.484C40.5866 156.042 31.785 155.849 23.342 155.389C15.6565 154.97 7.25413 154.06 1.84766 148.459"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.7926 30.1377C21.5303 36.0023 18.2426 41.1931 15.4519 46.3225C9.054 58.0819 4.81124 71.0613 3.00764 84.3904C2.14004 90.803 1.83266 97.2789 1.58069 103.747C1.00749 118.446 0.716556 133.156 0.707031 147.867"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.7118 87.6739C34.5427 88.6515 19.2852 88.1831 4.19922 86.2773"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.8668 87.9864C50.2322 106.973 49.9499 125.973 49.0217 144.94C34.6604 149.47 19.0341 149.717 4.54297 145.641"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BottleSVG4 = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    viewBox="0 0 45 158"
    preserveAspectRatio="xMidYMax meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full transition-all duration-150 cursor-pointer hover:scale-110 ${filled ? "opacity-20 scale-90" : "opacity-100"}`}
    onClick={onClick}
  >
    <path
      d="M26.8506 19.2871C26.2005 17.4027 28.9938 16.2724 29.7468 14.4295C30.505 12.5713 29.0044 10.6235 28.5304 8.6669C28.2472 7.49951 28.3363 6.26326 28.0659 5.09368C27.5579 2.8999 25.6925 1.11601 23.545 0.770605C21.3975 0.425196 19.0984 1.54011 17.9764 3.47156C17.4493 4.3788 17.1746 5.4194 16.971 6.45781C15.8034 12.4052 16.7738 18.5471 16.9021 24.6158C17.0018 29.3389 16.5882 34.0566 16.129 38.7568C15.8448 41.6643 15.5351 44.6036 14.5733 47.3505C13.9041 49.2633 12.9327 51.0417 12.0313 52.8486C0.559936 75.8379 0.529182 102.918 0.759308 128.806C0.818696 135.506 0.878084 142.207 0.937472 148.908"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.3358 20.208C28.3191 24.5357 27.9483 29.0536 28.3494 33.477C29.634 47.6254 38.6393 59.8446 41.6963 73.7061C43.0449 79.8168 43.2075 86.1287 43.3279 92.3922C43.6737 110.553 43.6986 128.72 43.4005 146.882C43.3788 148.201 43.3409 149.577 42.7305 150.739C42.2124 151.725 41.3278 152.458 40.3998 153.053C37.191 155.11 33.3296 155.781 29.5614 156.181C25.2436 156.64 20.8954 156.799 16.557 156.659C10.6316 156.465 3.93644 155.239 0.707031 150.163"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39.7062 106.008C27.4543 108.567 14.9171 108.608 2.65625 106.128"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.8223 106.007C38.991 110.057 39.1585 114.106 39.3271 118.155C39.7166 127.527 40.1038 136.954 38.8656 146.252C38.7879 146.834 38.6958 147.437 38.363 147.921C37.8227 148.709 36.8008 148.987 35.8633 149.188C24.298 151.677 12.1336 151.378 0.707031 148.323"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.057 16.3076C24.1986 16.3076 21.9588 16.3076 20.207 16.3076"
      stroke={filled ? "#d1d5db" : "#1f2937"}
      strokeWidth="1.417"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const bottleComponents = [BottleSVG1, BottleSVG2, BottleSVG3, BottleSVG4]

const countryFlags = [
  "🇱🇻",
  "🇱🇹",
  "🇪🇪",
  "🇩🇪",
  "🇬🇧",
  "🇫🇷",
  "🇮🇹",
  "🇪🇸",
  "🇵🇹",
  "🇳🇱",
  "🇧🇪",
  "🇦🇹",
  "🇨🇭",
  "🇵🇱",
  "🇨🇿",
  "🇸🇰",
  "🇭🇺",
  "🇷🇴",
  "🇧🇬",
  "🇬🇷",
  "🇫🇮",
  "🇸🇪",
  "🇳🇴",
  "🇩🇰",
  "🇮🇸",
  "🇮🇪",
  "🇺🇸",
  "🇨🇦",
  "🇲🇽",
  "🇧🇷",
  "🇦🇷",
  "🇨🇱",
  "🇨🇴",
  "🇵🇪",
  "🇯🇵",
  "🇰🇷",
  "🇨🇳",
  "🇮🇳",
  "🇦🇺",
  "🇳🇿",
]

const FlagMarquee = () => {
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const position1Ref = useRef(0)
  const position2Ref = useRef(-1000) // Start from left side, moving right
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current && row2Ref.current) {
      const contentWidth = row2Ref.current.scrollWidth / 3
      position2Ref.current = -contentWidth
      initializedRef.current = true
    }

    let lastTime = performance.now()
    const speed = 30 // pixels per second

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Row 1: Move left (negative direction)
      if (row1Ref.current) {
        const container = row1Ref.current
        const contentWidth = container.scrollWidth / 3

        position1Ref.current -= speed * deltaTime

        if (Math.abs(position1Ref.current) >= contentWidth) {
          position1Ref.current += contentWidth
        }

        container.style.transform = `translate3d(${position1Ref.current}px, 0, 0)`
      }

      // Row 2: Move right (positive direction)
      if (row2Ref.current) {
        const container = row2Ref.current
        const contentWidth = container.scrollWidth / 3

        position2Ref.current += speed * deltaTime

        if (position2Ref.current >= 0) {
          position2Ref.current -= contentWidth
        }

        container.style.transform = `translate3d(${position2Ref.current}px, 0, 0)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const tripleFlags = [...countryFlags, ...countryFlags, ...countryFlags]

  return (
    <div className="absolute inset-0 -rotate-6 scale-125 flex flex-col justify-center gap-4">
      {/* Row 1 - Moving Left */}
      <div className="overflow-hidden">
        <div
          ref={row1Ref}
          className="flex items-center"
          style={{
            willChange: "transform",
          }}
        >
          {tripleFlags.map((flag, i) => (
            <span key={i} className="text-5xl md:text-6xl lg:text-7xl mx-4 md:mx-5 flex-shrink-0 select-none">
              {flag}
            </span>
          ))}
        </div>
      </div>
      {/* Row 2 - Moving Right */}
      <div className="overflow-hidden">
        <div
          ref={row2Ref}
          className="flex items-center"
          style={{
            willChange: "transform",
          }}
        >
          {tripleFlags.map((flag, i) => (
            <span key={i} className="text-5xl md:text-6xl lg:text-7xl mx-4 md:mx-5 flex-shrink-0 select-none">
              {flag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const SevenSegmentDigit = ({ digit }: { digit: string }) => {
  const patterns: Record<string, boolean[]> = {
    "0": [true, true, true, true, true, true, false],
    "1": [false, true, true, false, false, false, false],
    "2": [true, true, false, true, true, false, true],
    "3": [true, true, true, true, false, false, true],
    "4": [false, true, true, false, false, true, true],
    "5": [true, false, true, true, false, true, true],
    "6": [true, false, true, true, true, true, true],
    "7": [true, true, true, false, false, false, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
  }

  const segments = patterns[digit] || [false, false, false, false, false, false, false]
  const onColor = "bg-amber-400"
  const offColor = "bg-neutral-800"

  return (
    <div className="relative w-4 h-7 md:w-5 md:h-9">
      {/* Top */}
      <div
        className={`absolute top-0 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[0] ? onColor : offColor}`}
      />
      {/* Top Right */}
      <div
        className={`absolute top-[3px] right-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[1] ? onColor : offColor}`}
      />
      {/* Bottom Right */}
      <div
        className={`absolute bottom-[3px] right-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[2] ? onColor : offColor}`}
      />
      {/* Bottom */}
      <div
        className={`absolute bottom-0 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[3] ? onColor : offColor}`}
      />
      {/* Bottom Left */}
      <div
        className={`absolute bottom-[3px] left-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[4] ? onColor : offColor}`}
      />
      {/* Top Left */}
      <div
        className={`absolute top-[3px] left-0 w-[3px] h-2.5 md:h-3 rounded-sm ${segments[5] ? onColor : offColor}`}
      />
      {/* Middle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-[3px] md:left-1 w-2.5 md:w-3 h-[3px] rounded-sm ${segments[6] ? onColor : offColor}`}
      />
    </div>
  )
}

const SeikoClock = ({
  time,
  label,
  athlete,
  country,
}: { time: string; label: string; athlete?: string; country?: string }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-neutral-950 rounded-lg p-2 md:p-3 border border-neutral-800">
        <div className="flex items-center gap-[2px] md:gap-1 justify-center">
          {time.split("").map((char, i) =>
            char === ":" || char === "." ? (
              <div key={i} className="flex flex-col gap-1 px-[2px]">
                <div
                  className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${char === ":" ? "bg-amber-400" : "bg-amber-400"}`}
                />
                {char === ":" && <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400" />}
              </div>
            ) : (
              <SevenSegmentDigit key={i} digit={char} />
            ),
          )}
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-[10px] md:text-xs text-neutral-300 font-medium">{label}</p>
        {athlete && (
          <p className="text-[9px] md:text-[10px] text-neutral-500 mt-0.5">
            {athlete} {country && <span className="text-neutral-600">({country})</span>}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ByTheNumbersSection() {
  const [daysInBusiness, setDaysInBusiness] = useState(0)
  const [daysToMarathon, setDaysToMarathon] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [eventYears, setEventYears] = useState<Record<string, number>>({})

  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle")
  const [poppedBottles, setPoppedBottles] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(60)
  const [finalTime, setFinalTime] = useState(0)
  const gameStartTime = useRef<number>(0)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  const officeBestTime = isMobile ? 45 : 27

  // Mobile scroll hint for the bottle game
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Show the scroll hint only on mobile while idle (hide once game starts)
  useEffect(() => {
    if (isMobile && gameState === "idle") setShowScrollHint(true)
    else setShowScrollHint(false)
  }, [isMobile, gameState])

  useEffect(() => {
    try {
      const startDate = new Date("2008-01-04")
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - startDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setDaysInBusiness(diffDays)

      const marathonDate = new Date("2026-05-17")
      const daysUntil = Math.floor((marathonDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      setDaysToMarathon(daysUntil > 0 ? daysUntil : 0)

      const years: Record<string, number> = {}
      displayEvents.forEach((event) => {
        if (event.startDate) {
          const eventStartDate = new Date(event.startDate)
          if (!isNaN(eventStartDate.getTime())) {
            const yearsSince = today.getFullYear() - eventStartDate.getFullYear() + 1
            years[event.id] = Math.max(yearsSince, 1)
          }
        }
      })
      setEventYears(years)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error calculating dates"
      setError(errorMessage)
    }
  }, [])

  const startGame = useCallback(() => {
    setPoppedBottles(new Set())
    setTimeLeft(60)
    setFinalTime(0)
    setShowScrollHint(true)
    setGameState("playing")
    gameStartTime.current = Date.now()

    if (timerInterval.current) {
      clearInterval(timerInterval.current)
    }

    timerInterval.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - gameStartTime.current) / 1000)
      const remaining = Math.max(60 - elapsed, 0)
      setTimeLeft(remaining)

      if (remaining === 0) {
        if (timerInterval.current) {
          clearInterval(timerInterval.current)
          timerInterval.current = null
        }
        setGameState("lost")
        setFinalTime(60)
      }
    }, 100)
  }, [])

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
      }
    }
  }, [])

  useEffect(() => {
    if (poppedBottles.size >= 71 && gameState === "playing") {
      const elapsed = Math.floor((Date.now() - gameStartTime.current) / 1000)
      setFinalTime(elapsed)
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
        timerInterval.current = null
      }
      setGameState("won")
    }
  }, [poppedBottles.size, gameState])

  const popBottle = useCallback(
    (index: number) => {
      if (gameState === "playing" && !poppedBottles.has(index)) {
        setPoppedBottles((prev) => new Set([...prev, index]))
      }
    },
    [gameState, poppedBottles],
  )

  const rimiMarathon = displayEvents.find((e) => e.id === "rimi-riga-marathon")
  const wineChampagne = displayEvents.find((e) => e.id === "riga-wine-champagne")
  const pinkNoise = displayEvents.find((e) => e.id === "pink-noise-riga")

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Statistics</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto lg:px-8 px-0">
        <div className="mb-8">
          <h3 className="text-2xl lg:text-3xl font-semibold">By the Numbers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {/* Rimi Marathon card */}
          {rimiMarathon && (
            <Link
              href={`/events/${rimiMarathon.id}`}
              className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer aspect-[16/9] md:aspect-[2/1]"
            >
              <Image
                src={rimiMarathon.image || "/placeholder.svg"}
                alt={rimiMarathon.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-3 uppercase tracking-wide">
                  {rimiMarathon.name}
                </span>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {eventYears[rimiMarathon.id] || 35} years
                </p>
              </div>
            </Link>
          )}

          {/* Days to Marathon card */}
          <div className="rounded-2xl p-5 md:p-6 text-white flex flex-col justify-between bg-red-700 min-h-[280px] md:min-h-0">
            <div className="mb-6 md:mb-0">
              <p className="text-xs uppercase tracking-wide mb-3 text-neutral-200">Days to Marathon 2026</p>
              <p className="text-5xl md:text-6xl lg:text-7xl font-bold">{daysToMarathon}</p>
            </div>
            <div className="space-y-3 md:space-y-3">
              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-100">Runners in 2025</span>
                <span className="font-semibold">40,122</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-100">Yearly economic impact</span>
                <span className="font-semibold">€17M</span>
              </div>
            </div>
          </div>

          {/* Countries card */}
          <div className="bg-neutral-100 rounded-2xl overflow-hidden h-[340px] md:h-[360px] relative">
            <FlagMarquee />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-100 via-neutral-100/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <p className="text-3xl md:text-4xl font-bold text-neutral-900">109</p>
              <p className="text-xs md:text-sm text-neutral-600">countries represented at Rimi Riga Marathon 2025</p>
            </div>
          </div>

          {/* Bottle game */}
          <div className="col-span-1 md:col-span-2 bg-neutral-50 rounded-2xl p-4 md:p-6 flex flex-col relative overflow-hidden h-[340px] md:h-[360px]">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3 shrink-0">
              <div>
                <p className="text-xl md:text-2xl font-bold text-neutral-900">71 bottles</p>
                <p className="text-xs text-neutral-600">
                  of champagne sabraged in one minute – a unique world record set during Riga Wine &amp; Champagne
                  event!
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">Office best: {officeBestTime}s</p>
              </div>
              {gameState === "idle" && (
                <button
                  onClick={startGame}
                  className="w-full md:w-auto px-4 py-2 bg-neutral-900 text-white text-xs rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Start Challenge
                </button>
              )}
              {gameState === "playing" && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-neutral-600">{poppedBottles.size}/71</span>
                  <span className="text-base font-bold text-neutral-900 tabular-nums w-10 text-right">{timeLeft}s</span>
                </div>
              )}
            </div>

            {gameState === "playing" && (
              <div className="w-full h-1.5 bg-neutral-200 rounded-full mb-3 shrink-0 overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                  style={{ width: `${(poppedBottles.size / 71) * 100}%` }}
                />
              </div>
            )}

            {isMobile ? (
              <div className="flex-1 relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

                <div
                  ref={mobileScrollRef}
                  onScroll={(e) => {
                    if (e.currentTarget.scrollLeft > 12) setShowScrollHint(false)
                  }}
                  className="overflow-x-auto overflow-y-hidden w-full h-full pb-4"
                  style={{
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <div className="flex gap-3 items-center justify-start h-full px-2">
                    {Array.from({ length: 71 }).map((_, index) => {
                      const BottleComponent = bottleComponents[index % 4]
                      return (
                        <div key={index} className="flex-shrink-0 w-[28px] h-[96px]">
                          <BottleComponent filled={poppedBottles.has(index)} onClick={() => popBottle(index)} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {showScrollHint && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      <p className="text-[10px] font-medium text-neutral-500">Scroll horizontally →</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <div className="w-full h-full">
                  <div className="grid h-full auto-rows-fr grid-cols-[repeat(24,minmax(0,1fr))] lg:grid-cols-[repeat(28,minmax(0,1fr))] gap-0.5 md:gap-1">
                    {Array.from({ length: 71 }).map((_, index) => {
                      const BottleComponent = bottleComponents[index % 4]
                      return (
                        <div key={index} className="flex items-end justify-center w-full h-full min-h-0">
                          <BottleComponent filled={poppedBottles.has(index)} onClick={() => popBottle(index)} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Win/Lose overlay */}
            {(gameState === "won" || gameState === "lost") && (
              <div className="absolute inset-0 bg-neutral-50/95 flex flex-col items-center justify-center rounded-2xl z-10 p-4">
                <p className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                  {gameState === "won" ? "Champion!" : "Time's Up!"}
                </p>
                <p className="text-sm text-neutral-600 mb-1">
                  {gameState === "won"
                    ? `You sabraged all 71 bottles in ${finalTime} seconds!`
                    : `You popped ${poppedBottles.size} of 71 bottles.`}
                </p>
                {gameState === "won" && finalTime < officeBestTime && (
                  <p className="text-xs text-neutral-500 mb-4">
                    New record! You beat our best time of {officeBestTime}s!
                  </p>
                )}
                {gameState === "won" && finalTime === officeBestTime && (
                  <p className="text-xs text-neutral-500 mb-4">You tied the office best!</p>
                )}
                {gameState === "won" && finalTime > officeBestTime && (
                  <p className="text-xs text-neutral-500 mb-4">Office best: {officeBestTime}s</p>
                )}
                {gameState === "lost" && (
                  <p className="text-xs text-neutral-500 mb-4">Office best: {officeBestTime}s</p>
                )}
                <button
                  onClick={startGame}
                  className="px-5 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors text-xs"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Wine & Champagne gourmets card */}
          <div className="rounded-2xl p-5 md:p-6 flex flex-col justify-between bg-neutral-50">
            <div className="text-3xl mb-3">🍷🥂🧀 🍇</div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-neutral-900">5,000</p>
              <p className="text-xs md:text-sm text-neutral-600 mt-1">
                gourmets & wine lovers attend Riga Wine & Champagne annually
              </p>
            </div>
          </div>

          {/* Wine & Champagne card */}
          {wineChampagne && (
            <Link
              href={`/events/${wineChampagne.id}`}
              className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]"
            >
              <Image
                src={wineChampagne.image || "/placeholder.svg"}
                alt={wineChampagne.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-2 uppercase tracking-wide">
                  {wineChampagne.name}
                </span>
                <p className="text-3xl md:text-4xl font-bold text-white">{eventYears[wineChampagne.id] || 13} years</p>
              </div>
            </Link>
          )}

          {/* Pink Noise countries card */}
          <div className="rounded-2xl p-5 md:p-6 flex flex-col justify-between text-white bg-neutral-50">
            <div>
              <span className="inline-block px-2 py-1 bg-[#fa4100] rounded text-xs font-medium mb-3">
                Pink Noise Riga
              </span>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-neutral-900">22 countries</p>
              <p className="text-xs md:text-sm mt-1 text-neutral-600">of music lovers represented at Pink Noise Riga</p>
            </div>
          </div>

          {/* World Records - Seiko timing board */}
          <div className="col-span-1 md:col-span-3 bg-neutral-900 rounded-2xl p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-6">
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">3 World Records</p>
                <p className="text-xs md:text-sm text-neutral-400">
                  World Athletics Road Running Championships Riga 2023
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-500 bg-neutral-800 px-3 py-1.5 rounded">
                Official Times
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <SeikoClock time="4:20.98" label="Women's Road Mile WR" athlete="Diribe Welteji" country="ETH" />
              <SeikoClock time="3:56.13" label="Men's Road Mile WR" athlete="Hobbs Kessler" country="USA" />
              <SeikoClock time="1:26:16" label="F65 Half Marathon WR" athlete="Rosa Mota" country="POR" />
            </div>
          </div>

          {/* Donation/Sustainability block */}
          <div className="col-span-1 md:col-span-3 rounded-2xl p-5 md:p-6 bg-neutral-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">€150,000</p>
                  <p className="text-xs md:text-sm text-neutral-600 mt-1">
                    donated to kids with disabilities via "Movement for Movement"
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:border-l md:border-neutral-200 md:pl-6">
                <span className="text-2xl">🌳</span>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">10 hectares</p>
                  <p className="text-xs md:text-sm mt-1 text-neutral-600">
                    of trees planted via Run for Future sustainability initiative
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cows block */}
          <div className="col-span-1 md:col-span-3 bg-neutral-50 rounded-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <span className="text-4xl md:text-5xl">🐄</span>
              <div className="flex-1">
                <p className="text-2xl md:text-3xl font-bold text-neutral-900">26 cows</p>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">
                  were painted by Latvian artists and placed in Ventspils City's Cow Parade in 2002. Our first major
                  event, by the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
