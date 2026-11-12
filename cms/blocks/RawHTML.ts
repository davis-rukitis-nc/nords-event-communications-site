import type { Block } from "payload"

/**
 * Escape hatch for custom HTML inside articles (styled result cards, embeds).
 * Rendered as-is on the site, so only trusted admins can edit it.
 */
export const RawHTML: Block = {
  slug: "rawHtml",
  labels: { singular: "HTML block", plural: "HTML blocks" },
  fields: [
    {
      name: "html",
      type: "code",
      required: true,
      admin: { language: "html", description: "Inserted into the article exactly as written." },
    },
  ],
}
