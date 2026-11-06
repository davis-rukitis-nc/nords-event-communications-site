import Image from "next/image"
import { Mail } from "lucide-react"

export default function GetInTouchSection() {
  return (
    <section aria-labelledby="our-team" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="mb-10">
        <h2 id="our-team" className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Our team</h2>

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
      
        <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[21/9]">
          <Image
            src="/images/team/necom-team.webp"
            alt="The NECom team"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        <div className="flex justify-end">
          <a
            href="mailto:info@necom.lv"
            className="inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Send us an email
          </a>
        </div>

      </div>
    </section>
  )
}
