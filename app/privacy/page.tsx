import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Privacy Policy | NECom",
  description: "Privacy Policy for Nords Event Communications",
}

const LAST_UPDATED = "January 20, 2026"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect information"
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Nords Event Communications SIA ("NECom", "we", "us", or "our") operates this website to share information
                about our projects, work, and partners. We take privacy seriously and aim to be clear about what data is
                collected and why.
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Information you provide</h3>
              <p className="text-gray-700 leading-relaxed">
                If you contact us by email, we will receive the information you include in your message (for example: your
                email address, name/signature, and the content of your request).
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This website does not offer user accounts, registrations, or newsletter subscriptions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Information collected automatically</h3>
              <p className="text-gray-700 leading-relaxed">
                Like most websites, basic technical data may be processed when you visit (for example: device and browser
                information, approximate location derived from IP address, pages viewed, and referring/exit pages). This is
                used to operate the site, keep it secure, and understand overall usage.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Performance and analytics</h3>
              <p className="text-gray-700 leading-relaxed">
                We use Vercel tools to understand site performance and improve reliability:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  <strong>Vercel Web Analytics:</strong> aggregated, privacy-focused analytics to understand general traffic
                  patterns and pages visited. It is designed to work without cookies.
                </li>
                <li>
                  <strong>Vercel Speed Insights:</strong> performance measurement (for example: page load and Core Web Vitals)
                  to help us keep the site fast.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies and Embedded Content</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not set advertising cookies on this website, and Vercel Web Analytics is designed to operate without
                cookies. However, third-party embedded content may set cookies or use similar technologies.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 YouTube embeds</h3>
              <p className="text-gray-700 leading-relaxed">
                Some pages include embedded YouTube videos. When a page loads an embedded video (or when you play it),
                your browser connects to YouTube/Google and they may collect information such as your IP address and video
                interaction data, and may set cookies depending on your settings.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you prefer not to share data with YouTube, you can avoid playing embedded videos or adjust your browser
                and Google account privacy settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>To respond to emails and communicate with you</li>
                <li>To operate, maintain, and secure the website</li>
                <li>To measure performance and improve content and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Legal Bases (GDPR)</h2>
              <p className="text-gray-700 leading-relaxed">
                When GDPR applies, we process personal data on these bases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  <strong>Legitimate interests</strong> (operating and securing our website; understanding aggregate usage;
                  improving performance).
                </li>
                <li>
                  <strong>Consent</strong> (when you choose to contact us by email and provide information).
                </li>
                <li>
                  <strong>Legal obligation</strong> (where processing is required by applicable law).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sharing and International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell personal data. We may share limited data with service providers who help us run the site,
                such as our hosting/analytics provider (Vercel). Embedded content providers (like YouTube/Google) may
                receive data directly from your browser when you view embedded videos.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                These providers may process data outside Latvia/the EEA. Where required, transfers rely on appropriate
                safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We keep email correspondence only as long as needed to respond and for reasonable record-keeping.
                Analytics and performance data is used in aggregate to improve the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights Under GDPR</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are in the EEA, you may have rights including access, rectification, erasure, restriction,
                portability, and objection. To exercise your rights, contact us at info@necom.lv.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can also lodge a complaint with Latvia’s supervisory authority: Datu valsts inspekcija (Data State
                Inspectorate).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">If you have any questions about this Privacy Policy, contact:</p>
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
