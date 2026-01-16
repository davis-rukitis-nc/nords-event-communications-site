import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  imageUrl: string
}

export default function PageHeader({ title, subtitle, imageUrl }: PageHeaderProps) {
  return (
    <header className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] rounded-b-2xl overflow-hidden bg-gray-900">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={`Header image for ${title}`}
        fill
        className="object-cover opacity-50"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute bottom-0 w-full text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-lg text-white/80 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
