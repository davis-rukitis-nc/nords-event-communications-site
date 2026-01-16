import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.contact)

export default function ContactPage() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Contact", url: "https://www.necom.lv/contact" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with NECom for inquiries about event marketing, sponsorship opportunities, or general questions. We're here to help."
        imageUrl="https://rimirigamarathon.com/wp-content/uploads/2025/11/necomteam.webp"
      />
      <ContactPageClient />
    </>
  )
}
