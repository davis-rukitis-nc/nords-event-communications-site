import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Terms of Service | NECom",
  description: "Terms of Service for Nords Event Communications",
}

export default function TermsOfServicePage() {
  return (
    <main className="bg-white">
      <PageHeader
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our website"
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

          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using the website of Nords Event Communications SIA ("NECom", "we", "us", or "our"), you
                agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Company Details:</strong>
                <br />
                Nords Event Communications SIA
                <br />
                Registration Number: 40203089546
                <br />
                Address: Riga, Latvia
                <br />
                Contact Email: info@necom.lv
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 leading-relaxed">
                NECom is a premium event marketing and sponsorship agency based in Latvia. We organize and manage
                various events including sports competitions, music festivals, and food and beverage experiences across
                the Baltic region.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Website</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Permitted Use</h3>
              <p className="text-gray-700 leading-relaxed">
                You may use this website for lawful purposes only. You agree to use the website in a manner consistent
                with all applicable laws and regulations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Prohibited Activities</h3>
              <p className="text-gray-700 leading-relaxed">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Use the website in any way that violates any applicable law</li>
                <li>Transmit any malicious code or harmful software</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Collect personal information from other users</li>
                <li>Use automated systems without our written permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                The content, design, graphics, logos, and other materials on this website are owned by NECom or our
                licensors and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                This website and its content are provided "as is" without any warranties of any kind. We do not warrant
                that the website will be uninterrupted, timely, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, NECom shall not be liable for any indirect, incidental, special,
                or consequential damages resulting from your use of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Latvia.
                Any legal proceedings shall be brought exclusively in the courts located in Riga, Latvia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us:
              </p>
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
