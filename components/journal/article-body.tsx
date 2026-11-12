import Image from "next/image"
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

// Lazy-load images and embeds inside custom HTML blocks.
const lazy = (html: string) =>
  html
    .replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
    .replace(/<iframe(?![^>]*\bloading=)/g, '<iframe loading="lazy"')

type UploadValue = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    rawHtml: ({ node }: { node: { fields: { html?: string } } }) => <div dangerouslySetInnerHTML={{ __html: lazy(String(node.fields.html ?? "")) }} />,
  },
  upload: ({ node }) => {
    const media = node.value as UploadValue
    if (!media || typeof media !== "object" || !media.url) return null
    return (
      <Image
        src={media.url}
        alt={media.alt ?? ""}
        width={media.width ?? 1440}
        height={media.height ?? 960}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
    )
  },
})

export default function ArticleBody({ content }: { content: SerializedEditorState }) {
  return <RichText data={content} converters={converters} className="article-content" />
}
