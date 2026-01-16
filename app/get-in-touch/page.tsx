import type { Metadata } from "next"
import PageHeader from "@/components/layout/page-header"
import GetInTouchContent from "./GetInTouchContent"

export const metadata: Metadata = {
  title: "Get in Touch | NECom",
  description: "Connect with the NECom team for event marketing, sponsorship opportunities, and partnership inquiries.",
}

export default function GetInTouchPage() {
  return (
    <main>
      <PageHeader
        title="Get in Touch"
        subtitle="Connect with our experienced team for event marketing, sponsorship opportunities, and partnership inquiries."
        imageUrl="https://rimirigamarathon.com/wp-content/uploads/2025/07/rwch-1.jpg"
      />
      <GetInTouchContent />
    </main>
  )
}
