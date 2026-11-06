import Image from "next/image"
import { Mail } from "lucide-react"

export default function GetInTouchSection() {
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

        <div className="mb-20 text-right">
          <a
            href="mailto:info@necom.lv"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-neutral-800 transition-all hover:scale-105 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Send us an email
          </a>
        </div>

      </div>
    </section>
  )
}
