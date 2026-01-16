"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { partnerLogos } from "@/lib/data/partners-data"

export default function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [randomizedPartners, setRandomizedPartners] = useState(partnerLogos)

  const isDraggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const clickIntentRef = useRef(true)

  // Auto-scroll state
  const isPausedRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollPositionRef = useRef(0)
  const scrollSpeed = 0.5

  // Randomize partners on mount
  useEffect(() => {
    const shuffled = [...partnerLogos].sort(() => Math.random() - 0.5)
    setRandomizedPartners(shuffled)
  }, [])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const animate = useCallback(() => {
    if (!scrollRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    if (!isPausedRef.current && !isDraggingRef.current) {
      scrollPositionRef.current += scrollSpeed
      const singleSetWidth = scrollRef.current.scrollWidth / 3

      if (scrollPositionRef.current >= singleSetWidth * 2) {
        scrollPositionRef.current -= singleSetWidth
      }

      scrollRef.current.scrollLeft = scrollPositionRef.current
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  const applyMomentum = useCallback(() => {
    if (!scrollRef.current || isDraggingRef.current) return

    const velocity = velocityRef.current
    if (Math.abs(velocity) < 0.5) {
      velocityRef.current = 0
      return
    }

    scrollPositionRef.current += velocity
    velocityRef.current *= 0.92

    const singleSetWidth = scrollRef.current.scrollWidth / 3

    if (scrollPositionRef.current >= singleSetWidth * 2) {
      scrollPositionRef.current -= singleSetWidth
    } else if (scrollPositionRef.current < singleSetWidth) {
      scrollPositionRef.current += singleSetWidth
    }

    scrollRef.current.scrollLeft = scrollPositionRef.current

    if (Math.abs(velocityRef.current) > 0.5) {
      requestAnimationFrame(applyMomentum)
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return

    isDraggingRef.current = true
    setIsDragging(true)
    clickIntentRef.current = true
    startXRef.current = e.pageX
    scrollLeftRef.current = scrollRef.current.scrollLeft
    scrollPositionRef.current = scrollRef.current.scrollLeft
    lastXRef.current = e.pageX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    e.preventDefault()

    const dx = e.pageX - startXRef.current

    if (Math.abs(dx) > 5) {
      clickIntentRef.current = false
    }

    const walk = dx * 1.2
    const newScrollLeft = scrollLeftRef.current - walk

    scrollRef.current.scrollLeft = newScrollLeft
    scrollPositionRef.current = newScrollLeft

    const now = performance.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      const moveX = e.pageX - lastXRef.current
      velocityRef.current = (-moveX / dt) * 16
    }
    lastXRef.current = e.pageX
    lastTimeRef.current = now
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    if (Math.abs(velocityRef.current) > 0.5) {
      requestAnimationFrame(applyMomentum)
    }
  }, [applyMomentum])

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      if (Math.abs(velocityRef.current) > 0.5) {
        requestAnimationFrame(applyMomentum)
      }
    }
  }, [applyMomentum])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return
    isDraggingRef.current = true
    setIsDragging(true)
    clickIntentRef.current = true
    startXRef.current = e.touches[0].pageX
    scrollLeftRef.current = scrollRef.current.scrollLeft
    scrollPositionRef.current = scrollRef.current.scrollLeft
    lastXRef.current = e.touches[0].pageX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return

    const dx = e.touches[0].pageX - startXRef.current
    if (Math.abs(dx) > 5) {
      clickIntentRef.current = false
    }

    const walk = dx * 1.2
    const newScrollLeft = scrollLeftRef.current - walk

    scrollRef.current.scrollLeft = newScrollLeft
    scrollPositionRef.current = newScrollLeft

    const now = performance.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      const moveX = e.touches[0].pageX - lastXRef.current
      velocityRef.current = (-moveX / dt) * 16
    }
    lastXRef.current = e.touches[0].pageX
    lastTimeRef.current = now
  }, [])

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (Math.abs(velocityRef.current) > 0.5) {
      requestAnimationFrame(applyMomentum)
    }
  }, [applyMomentum])

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (!clickIntentRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const triplePartners = [...randomizedPartners, ...randomizedPartners, ...randomizedPartners]

  return (
    <section
      ref={sectionRef}
      className={`py-16 px-4 md:px-8 bg-white transition-all duration-700 ease-out md:py-8 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 text-left">Trusted By</h2>

        <div
          className="relative overflow-hidden rounded-xl bg-gray-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            handleMouseLeave()
          }}
        >
          <div
            ref={scrollRef}
            className={`flex items-center py-6 overflow-x-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollBehavior: "auto",
              WebkitOverflowScrolling: "touch",
              willChange: "scroll-position",
            }}
          >
            {triplePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center mx-8 min-w-[180px]"
              >
                {partner.link ? (
                  <Link
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center select-none group"
                    onClick={handleLinkClick}
                    draggable={false}
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      width={140}
                      height={80}
                      className="max-w-full h-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none select-none"
                      sizes="140px"
                      draggable={false}
                    />
                  </Link>
                ) : (
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    width={140}
                    height={80}
                    className="max-w-full h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none select-none"
                    sizes="140px"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center">
            Join our network of trusted partners and create unforgettable experiences together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-700 transition-colors duration-200"
          >
            <span>Become a Partner</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
