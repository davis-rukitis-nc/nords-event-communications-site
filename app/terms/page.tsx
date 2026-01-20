import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Terms of Service | NECom",
  description: "Terms of Service for Nords Event Communications",
}

const LAST_UPDATED = "January 20, 2026"

export default function TermsOfServicePage() {
  return (
    <main className="bg-white">
      <PageHeader
        title="Terms of Service"
        subtitle="The rules for using this website"
        imageUrl="https://rimirigamarathon.com/wp-content/uploads/2025/07/0RK_6989.jpg"
      />

      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          <p className="text-gray-600 mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using this website, you agree to these Terms of Service ("Terms"). If you do not agree,
                please do not use the website.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Company Details:</strong>
                <br />
                Nords Event Communications SIA ("NECom")
                <br />
                Registration Number: 40203089546
                <br />
                Address: Riga, Latvia
                <br />
                Contact Email: info@necom.lv
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What this website is (and isn’t)</h2>
              <p className="text-gray-700 leading-relaxed">
                This website provides general information about NECom and our work. It does not provide user accounts,
                sign-ups, registrations, or paid checkout on this domain.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed">You agree to use the website lawfully and not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Try to gain unauthorized access to the website, servers, or networks</li>
                <li>Introduce malware, scrape the site aggressively, or disrupt normal operation</li>
                <li>Use the website in a way that infringes someone else’s rights</li>
                <li>Misrepresent your identity when contacting us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Links and Embedded Content</h2>
              <p className="text-gray-700 leading-relaxed">
                This website may link to third-party websites and may embed content (for example, YouTube videos).
                Third-party sites and services are not operated by us, and their terms and privacy practices apply.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                We do not control third-party content and are not responsible for it. Linking or embedding does not imply
                endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                Unless otherwise stated, the website and its content (text, images, branding, and design) are owned by
                NECom or used with permission and are protected by applicable intellectual property laws. You may view and
                share pages for personal, non-commercial use, but you may not copy, modify, or reuse content for
                commercial purposes without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed">
                The website is provided on an “as is” and “as available” basis. We make reasonable efforts to keep the
                information accurate, but we do not guarantee it will always be complete, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, NECom will not be liable for indirect, incidental, special, or
                consequential damages arising from your use of (or inability to use) the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms from time to time. The “Last updated” date above indicates when changes were
                last made.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the Republic of Latvia. Any disputes will be handled by the
                competent courts in Riga, Latvia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
              <p className="text-gray-700 leading-relaxed">Questions about these Terms? Email us:</p>
              <div className="bg-gray-50 rounded-2xl p-6 mt-4">
                <p className="text-gray-700">
                  <strong>Nords Event Communications SIA</strong>
                  <br />
                  Email: info@necom.lv
                  <br />
                  Registration Number: 40203089546
                  <br />
                  Location: Riga, Latvia
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
