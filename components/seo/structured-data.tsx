// Server-rendered JSON-LD. Plain <script> so it is in the initial HTML for crawlers.
export default function StructuredData({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c") }}
    />
  )
}
