import Link from "next/link"
import { RichText } from "@payloadcms/richtext-lexical/react"
import PageHeader from "@/components/layout/page-header"
import type { getLegalPage } from "@/lib/cms"

type LegalPageData = Awaited<ReturnType<typeof getLegalPage>>

const lastUpdatedFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Europe/Riga",
})

/** Privacy Policy and Terms of Service: texts come from the CMS (Pages → Privacy / Terms). */
export default function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className="bg-white">
      <PageHeader title={page.title} subtitle={page.subtitle} imageUrl={page.headerImage} />

      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          <p className="text-neutral-600 mb-12">Last updated: {lastUpdatedFormat.format(new Date(page.lastUpdated))}</p>

          {page.content && <RichText data={page.content} className="legal-content" />}
        </div>
      </div>
    </div>
  )
}
