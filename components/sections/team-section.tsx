"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react"
import { teamMembers } from "@/lib/data/team-data"

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const CARD_WIDTH = 320 + 24 // width + gap

  const scrollBy = (dir: "left" | "right") => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({
      left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
      behavior: "smooth",
    })
  }

  const checkScroll = () => {
    const el = containerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll)
    checkScroll()
    return () => el.removeEventListener("scroll", checkScroll)
  }, [])

  const isActive = (index: number) => activeIndex === index || hoverIndex === index

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header and Arrows */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Meet Our Team</h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Although originally not from the elite sports world, they are experienced recreational runners, known for their storytelling and event production skills.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-xl border ${
                canScrollLeft ? "text-black hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-xl border ${
                canScrollRight ? "text-black hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="w-[320px] flex-shrink-0 rounded-[28px] overflow-hidden snap-start relative cursor-pointer transition-all min-h-[460px] group"
            >
              {/* Background */}
              <div className="absolute inset-0 z-0 transition-all duration-300">
                {isActive(index) ? (
                  <div className="w-full h-full bg-black" />
                ) : (
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Overlay Content */}
              <div
  className={`relative z-10 flex flex-col justify-between h-full p-6 text-white transition-all duration-300 ${
    isActive(index) ? "bg-black" : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
  }`}
>

                {/* Description in active state */}
                {isActive(index) && (
                  <div>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">{member.description}</p>
                  </div>
                )}

                {/* Bottom area: Name/Role + LinkedIn */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="text-xs text-gray-300">{member.role}</p>
                  </div>
                  {isActive(index) && member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="w-9 h-9 ml-2 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
