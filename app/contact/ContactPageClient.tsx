"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

function ContactUsBlock() {
  const [copied, setCopied] = useState(false)
  const email = "info@necom.lv"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="bg-gray-900 text-white p-8 md:p-12 rounded-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Get in touch</h3>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="text-lg md:text-xl font-medium text-white hover:text-white/80 transition-colors"
          >
            {email}
          </a>
          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors duration-200"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {copied && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-right">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">Email copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ContactPageClient() {
  return (
    <main className="bg-white">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Reach out if you dream big!</h2>
              <p className="text-lg text-secondary-dark leading-relaxed mb-8">
                {"Feel free to reach out with your ideas, interests in creating a partnership with our events, fine-tuning your sponsorship portfolio, generating impactful ideas to activate your sponsorship & charity initiatives, launching a product with a bang, or maybe finding a way to appear cool with your audiences!"}
              </p>
              <p className="text-lg text-secondary-dark leading-relaxed mb-8">
                {"In doubt? No worries, we’ll find a way to help you. For a budget, of course. Or just for the sake of it and fun ... if we like you too much. "}
              </p>


              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Email</h3>
                  <p className="text-secondary-dark">info@necom.lv</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">Office</h3>
                  <p className="text-secondary-dark">
                    Nords Event Communications SIA
                    <br />
                    Riga, Latvia
                    <br />
                    Reg. No. 40203089546
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
                <h2 className="text-4xl font-bold text-primary-dark mb-2">{new Date().getFullYear() - 1999}+ Years</h2>
                <p className="text-secondary-dark">of Experience in Event Marketing</p>
              </div>

              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">Our Expertise</h3>
                <div className="space-y-4 text-secondary-dark">
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Ideas, Impact & Large-Scale Events</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Sponsorship & Brand Activations</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-dark mb-1">Mass Sports, Wine & Gastronomy, Music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ContactUsBlock />
        </div>
      </div>
    </main>
  )
}
