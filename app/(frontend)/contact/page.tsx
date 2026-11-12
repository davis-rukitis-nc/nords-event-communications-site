import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import StructuredData from "@/components/seo/structured-data"
import { generatePageMetadata, pageMetaConfigs } from "@/lib/seo/meta-config"
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data"
import { getContactPage } from "@/lib/cms"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = generatePageMetadata(pageMetaConfigs.contact)

export default async function ContactPage() {
  const page = await getContactPage()
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://www.necom.lv/" },
    { name: "Contact", url: "https://www.necom.lv/contact" },
  ])

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <PageHeader
        title={page.title}
        subtitle={page.subtitle}
        imageUrl={page.headerImage}
      />
      <ContactPageClient page={page} />
    </>
  )
}
