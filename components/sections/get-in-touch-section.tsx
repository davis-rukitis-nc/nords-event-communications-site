"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Linkedin, Instagram } from "lucide-react"
import { teamMembers } from "@/lib/data/team-data"
import ByTheNumbersSection from "./by-the-numbers-section"

interface TeamMember {
  name: string
  role: string
  image: string
  description: string
  linkedin?: string
  instagram?: string
}

export default function GetInTouchSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const isActive = (index: number) => activeIndex === index || hoverIndex === index

  const keyPeople = teamMembers.slice(0, 0)

return (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-semibold mb-4">Our team</h2>

        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                We are experienced and creative story tellers, event producers, managers & sponsorship activators, as
                well as recreational runners, wine lovers, fans of Riga, and just pure magicians!
              </p>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Aigars Nords is the recipient of the prestigious “Citizen of the Year of Riga City 2025” award! Considered the “Godfather of Running” in Latvia, Aigars (together with this wonderful team, of course) is behind the iconic events of the Latvian capital – from Rimi Riga Marathon to Riga Wine &amp; Champagne, Pink Noise Riga music festival, and many others.
              </p>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Having worked with the leading Latvian and international brands, he is possibly the most experienced
                and creative sponsorship professionals around! Also a passionate runner, wine & music lover, and book
                author - check out his award-winning blockbuster “Vīns un Nords”!
              </p>
            </div>
          </div>
        </div>
      </div>
      
        <div className="mb-8 relative aspect-[21/9] rounded-3xl overflow-hidden">
          <Image
            src="https://rimirigamarathon.com/wp-content/uploads/2026/01/pnr-team.webp"
            alt="NECom Team"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {keyPeople.map((member, index) => (
            <div
              key={member.name}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="rounded-[28px] overflow-hidden relative cursor-pointer transition-all min-h-[460px] group"
            >
              <div className="absolute inset-0 z-0 transition-all duration-300">
                {isActive(index) ? (
                  <div className="w-full h-full bg-black" />
                ) : (
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                )}
              </div>

              <div
                className={`relative z-10 flex flex-col justify-between h-full p-6 text-white transition-all duration-300 ${
                  isActive(index) ? "bg-black" : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                }`}
              >
                {isActive(index) && (
                  <div>
                    <p className="text-gray-400 mb-4 leading-relaxed text-base">{member.description}</p>
                  </div>
                )}

                <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="text-xs text-gray-300">{member.role}</p>
                  </div>
                  {isActive(index) && (
                    <div className="flex gap-2 ml-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
                          aria-label={`${member.name} on Instagram`}
                        >
                          <Instagram className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20 text-right">
          <a
            href="mailto:info@necom.lv"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Send us an email
          </a>
        </div>

        <ByTheNumbersSection />
      </div>
    </section>
  )
}
