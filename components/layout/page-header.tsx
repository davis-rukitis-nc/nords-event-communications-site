import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  imageUrl: string
}

export default function PageHeader({ title, subtitle, imageUrl }: PageHeaderProps) {
  return (
    <header className="relative flex h-[60svh] min-h-[380px] w-full items-end overflow-hidden rounded-b-2xl bg-neutral-900 md:h-[60vh] lg:h-[65vh]">
      <Image src={imageUrl} alt="" fill className="object-cover opacity-60" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />
      <div className="relative w-full text-white">
        <div className="mx-auto max-w-7xl px-6 pb-8 md:pb-12 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
