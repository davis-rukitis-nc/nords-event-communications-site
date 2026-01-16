interface YouTubeEmbedProps {
  url: string
  title: string
}

export default function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-2xl"
      ></iframe>
    </div>
  )
}
