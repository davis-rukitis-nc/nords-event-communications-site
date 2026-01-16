import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PartnerCTA() {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl">
      <h3 className="text-3xl font-bold mb-2">Become a Partner</h3>
      <p className="text-white/80 mb-6 max-w-lg">
        Join us in creating unforgettable experiences. We offer unique partnership opportunities to connect your brand
        with a passionate audience.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        <span>Contact Us</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
