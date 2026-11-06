import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import { generatePageMetadata } from "@/lib/seo/meta-config"
import GetInTouchContent from "./GetInTouchContent"

export const metadata: Metadata = generatePageMetadata({
  title: "Get in Touch",
  description: "Connect with the NECom team for event marketing, sponsorship opportunities, and partnership inquiries.",
  url: "/get-in-touch",
})

export default function GetInTouchPage() {
  return (
    <div>
      <PageHeader
        title="Get in Touch"
        subtitle="Connect with our experienced team for event marketing, sponsorship opportunities, and partnership inquiries."
        imageUrl="https://rimirigamarathon.com/wp-content/uploads/2025/07/rwch-1.jpg"
      />
      <GetInTouchContent />
    </div>
  )
}
