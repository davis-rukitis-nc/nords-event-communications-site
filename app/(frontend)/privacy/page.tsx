import type { Metadata } from "next"
import LegalPage from "@/components/legal-page"
import { getLegalPage } from "@/lib/cms"
import { generatePageMetadata } from "@/lib/seo/meta-config"

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Nords Event Communications",
  url: "/privacy",
})

export default async function PrivacyPolicyPage() {
  return <LegalPage page={await getLegalPage("privacy-page")} />
}
