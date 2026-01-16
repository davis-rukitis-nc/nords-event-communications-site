"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mail } from "lucide-react"
import { displayEvents } from "@/lib/data/events-data"

const FOUNDING_DATE = new Date("2008-01-04")
const RIMI_MARATHON_DATE = new Date("2025-05-17")

function calculateDaysSince(date: Date): number {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function calculateDaysUntil(date: Date): number {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function calculateYearsSince(yearStarted: number): number {
  return new Date().getFullYear() - yearStarted
}

export default function GetInTouchContent() {
  const [daysInBusiness, setDaysInBusiness] = useState(0)
  const [daysUntilMarathon, setDaysUntilMarathon] = useState(0)

  useEffect(() => {
    setDaysInBusiness(calculateDaysSince(FOUNDING_DATE))
    setDaysUntilMarathon(calculateDaysUntil(RIMI_MARATHON_DATE))
  }, [])

  const yearsSinceStart = new Date().getFullYear() - 2008

  const rimiMarathon = displayEvents.find((e) => e.id === "rimi-riga-marathon")
  const wineChampagne = displayEvents.find((e) => e.id === "riga-wine-champagne")
  const balticAwards = displayEvents.find((e) => e.id === "baltic-wine-drinks-awards")
  const pinkNoise = displayEvents.find((e) => e.id === "pink-noise-riga")
  const whiskyFriends = displayEvents.find((e) => e.id === "riga-whisky-friends")

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Aigars Nords */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                <Image
                  src="/images/design-mode/aigarsnords.jpg"
                  alt="Aigars Nords"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary-dark mb-1">Aigars Nords</h3>
              <p className="text-secondary-dark mb-4">Founder &amp; CEO</p>
              <p className="text-sm text-secondary-dark leading-relaxed">
                {
                  'Considered the "Godfather of running" in Latvia, Aigars did his first marathon in Chicago in 1999. One of the most awarded communications and idea specialists in the region.'
                }
              </p>
            </div>
          </div>

          {/* Inese Kikule */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6">
                <Image
                  src="/images/design-mode/inese.jpg"
                  alt="Inese Kikule"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-primary-dark mb-1">Inese Ķīkule</h3>
              <p className="text-secondary-dark mb-4">Head of Operations</p>
              <p className="text-sm text-secondary-dark leading-relaxed">
                Inese is like a glue holding everything together – from finances to production of medals, event
                production and registration system!
              </p>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-center mb-20">
          <a
            href="mailto:info@necom.lv"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Days in Business - Large Block */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <h3 className="text-lg font-medium mb-4 text-gray-300">Days in Business</h3>
            <div className="text-6xl font-bold mb-2">{daysInBusiness.toLocaleString()}</div>
            <p className="text-gray-400 text-sm">Since January 4, 2008</p>
          </div>

          {/* Years Existed - Visual Lines */}
          <div className="bg-gray-100 rounded-3xl p-8 flex flex-col justify-between">
            <h3 className="text-lg font-medium mb-4 text-gray-700">{"Years We've Existed"}</h3>
            <div className="flex flex-wrap gap-1 mb-4">
              {Array.from({ length: yearsSinceStart }).map((_, i) => (
                <div key={i} className="w-2 h-12 bg-black rounded-full" />
              ))}
            </div>
            <div className="text-4xl font-bold text-gray-900">{yearsSinceStart}</div>
          </div>

          {/* Days Until Rimi Riga Marathon */}
          <div className="bg-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-sm font-medium mb-3 opacity-90">Days till Rimi Riga Marathon</h3>
            <div className="text-5xl font-bold">{daysUntilMarathon}</div>
          </div>

          {/* Rimi Riga Marathon Years */}
          {rimiMarathon && (
            <div className="relative rounded-3xl overflow-hidden min-h-[200px]">
              <Image
                src={rimiMarathon.image || "/placeholder.svg"}
                alt="Rimi Riga Marathon"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm mb-2">
                  {calculateYearsSince(rimiMarathon.yearStarted || 0)} years
                </span>
                <h3 className="text-white font-semibold">Rimi Riga Marathon</h3>
              </div>
            </div>
          )}

          {/* Wine & Champagne Years */}
          {wineChampagne && (
            <div className="relative rounded-3xl overflow-hidden min-h-[200px]">
              <Image
                src={wineChampagne.image || "/placeholder.svg"}
                alt="Riga Wine and Champagne"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm mb-2">
                  {calculateYearsSince(wineChampagne.yearStarted || 0)} years
                </span>
                <h3 className="text-white font-semibold">Riga Wine &amp; Champagne</h3>
              </div>
            </div>
          )}

          {/* Baltic Awards Years */}
          {balticAwards && (
            <div className="relative rounded-3xl overflow-hidden min-h-[200px]">
              <Image
                src={balticAwards.image || "/placeholder.svg"}
                alt="Baltic Wine and Drinks Awards"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm mb-2">
                  {calculateYearsSince(balticAwards.yearStarted || 0)} years
                </span>
                <h3 className="text-white font-semibold text-sm">Baltic Wine &amp; Drinks Awards</h3>
              </div>
            </div>
          )}

          {/* Pink Noise Years */}
          {pinkNoise && (
            <div className="relative rounded-3xl overflow-hidden min-h-[200px]">
              <Image src={pinkNoise.image || "/placeholder.svg"} alt="Pink Noise Riga" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm mb-2">
                  {calculateYearsSince(pinkNoise.yearStarted || 0)} years
                </span>
                <h3 className="text-white font-semibold">Pink Noise Riga</h3>
              </div>
            </div>
          )}

          {/* Whisky Friends Years */}
          {whiskyFriends && (
            <div className="relative rounded-3xl overflow-hidden min-h-[200px] md:col-span-2">
              <Image
                src={whiskyFriends.image || "/placeholder.svg"}
                alt="Riga Whisky and Friends"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm mb-2">
                  {calculateYearsSince(whiskyFriends.yearStarted || 0)} years
                </span>
                <h3 className="text-white font-semibold">Riga Whisky &amp; Friends</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
