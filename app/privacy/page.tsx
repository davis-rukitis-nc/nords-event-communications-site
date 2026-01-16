import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Privacy Policy | NECom",
  description: "Privacy Policy for Nords Event Communications",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Nords Event Communications SIA ("NECom", "we", "us", or "our") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                visit our website or interact with our services.
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
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Contact us via email or contact forms</li>
                <li>Subscribe to our newsletters or event updates</li>
                <li>Register for our events</li>
                <li>Interact with our social media channels</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Personal information may include: name, email address, phone number, company name, and any other
                information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed">
                When you visit our website, we automatically collect certain information about your device and usage
                patterns:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>IP address and general location data</li>
                <li>Browser type and version</li>
                <li>Device information (type, operating system)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Date and time of access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website
                performance.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Analytics Services</h3>
              <p className="text-gray-700 leading-relaxed">
                We use the following analytics services to understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  <strong>Vercel Web Analytics:</strong> Collects anonymous usage data to help us improve website
                  performance and user experience. This service respects Do Not Track (DNT) settings and does not use
                  cookies.
                </li>
                <li>
                  <strong>Vercel Speed Insights:</strong> Monitors website performance metrics including page load times
                  and user interactions to ensure optimal website speed.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Managing Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                You can control and manage cookies through your browser settings. However, disabling cookies may affect
                the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send event information, newsletters, and marketing communications (with your consent)</li>
                <li>To improve our website, services, and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To comply with legal obligations and enforce our terms</li>
                <li>To prevent fraud and ensure website security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. Your data is stored
                securely on servers provided by our hosting partner Vercel, which maintains industry-standard security
                practices.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                While we strive to protect your personal information, no method of transmission over the internet or
                electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party service providers who assist in operating
                  our website and events
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or governmental authority
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>Protection of Rights:</strong> To protect our rights, property, or safety
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights Under GDPR</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  <strong>Right to Access:</strong> You can request copies of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You can request correction of inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> You can request deletion of your personal data
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> You can request limitation on how we use your data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> You can request transfer of your data
                </li>
                <li>
                  <strong>Right to Object:</strong> You can object to our processing of your personal data
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, please contact us at info@necom.lv.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
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
