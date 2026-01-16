"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause } from "lucide-react"
import { usePathname } from "next/navigation"

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLogoVisible, setIsLogoVisible] = useState(true)
  const [isPlayButtonVisible, setIsPlayButtonVisible] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const togglePlay = () => {
    if (videoRef.current && videoLoaded && !videoError) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLogoVisible(entry.isIntersecting)
        setIsPlayButtonVisible(entry.isIntersecting)
        setIsInViewport(entry.isIntersecting)

        if (entry.isIntersecting && !shouldLoadVideo) {
          setShouldLoadVideo(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = heroSectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [shouldLoadVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoadVideo) return

    loadingTimeoutRef.current = setTimeout(() => {
      if (!videoLoaded) {
        setVideoError(true)
        setShowFallback(true)
        setShowPlayButton(false)
      }
    }, 15000)

    const handleLoadedData = () => {
      setVideoLoaded(true)
      setVideoError(false)
      setShowPlayButton(true)
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }

    const handleError = () => {
      setVideoError(true)
      setVideoLoaded(false)
      setShowPlayButton(false)
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
      setTimeout(() => setShowFallback(true), 100)
    }

    const handleCanPlay = () => {
      setVideoLoaded(true)
      setShowPlayButton(true)
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
        video.removeEventListener("canplay", handleCanPlay)
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [videoLoaded, shouldLoadVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoLoaded || videoError) return

    if (isInViewport && isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInViewport, isPlaying, videoLoaded, videoError])

  const logoElement = (
    <Image
      src="/logo-light.svg"
      alt="NECom official logo"
      width={100}
      height={32}
      priority
      sizes="100px"
      draggable={false}
      className="brightness-0 invert"
    />
  )

  return (
    <section ref={heroSectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {!videoError && shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/design-mode/hero-video-2025.png"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-80" : "opacity-0"
          }`}
        >
          <source src="https://rimirigamarathon.com/wp-content/uploads/2025/05/264-web.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          showFallback || videoError || !videoLoaded ? "opacity-80 blur-0" : "opacity-0 blur-sm"
        }`}
      >
        <Image
          src="/images/design-mode/hero-video-2025.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div
        className="absolute top-8 left-8 z-30 transition-opacity duration-300"
        style={{ mixBlendMode: "difference" }}
      >
        {isLogoVisible && (
          <div className="transition-opacity duration-300">
            {isHomePage ? (
              logoElement
            ) : (
              <Link href="/" className="block hover:opacity-80 transition-opacity duration-200">
                {logoElement}
              </Link>
            )}
          </div>
        )}
      </div>

      {showPlayButton && (
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={`
            absolute z-30
            top-8 right-8
            md:top-auto md:bottom-16 md:right-8
            transition-opacity duration-300
            bg-black/70 border border-white/10 rounded-xl p-2
            flex items-center justify-center hover:bg-black/80
            ${isPlayButtonVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
        </button>
      )}

      <div className="absolute bottom-40 md:bottom-16 left-8 max-w-xl z-10">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight animate-fade-in">
          Moved. Inspired. Elevated. 
        </h1>
      </div>
    </section>
  )
}
