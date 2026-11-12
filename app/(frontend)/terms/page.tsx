import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"
import { getLegalPage } from "@/lib/cms"
import { generatePageMetadata } from "@/lib/seo/meta-config"

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Nords Event Communications",
  url: "/terms",
})

export default async function TermsOfServicePage() {
  return <LegalPage page={await getLegalPage("terms-page")} />
}
