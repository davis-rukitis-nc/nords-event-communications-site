import type { CollectionConfig } from "payload"
import { BlocksFeature, EXPERIMENTAL_TableFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import { authenticated, publishedOrAuthenticated } from "../access"
import { RawHTML } from "../blocks/RawHTML"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"

export const JOURNAL_CATEGORIES = ["Sports", "Music", "Food & Drinks", "Partnerships"] as const

export const Journal: CollectionConfig = {
  slug: "journal",
  labels: { singular: "Article", plural: "Journal" },
  defaultSort: "-date",
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: false },
    maxPerDoc: 25,
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "category", "_status"],
    preview: (doc) => (doc?.slug ? `/journal/${doc.slug}` : null),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { description: "URL: necom.lv/journal/<slug>. Lowercase, words joined with hyphens." },
        },
        { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } } },
        { name: "category", type: "select", required: true, options: [...JOURNAL_CATEGORIES] },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Lead image" },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "Shown on cards and used as the search-engine description." },
    },
    { name: "tags", type: "text", hasMany: true },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({ blocks: [RawHTML] }),
        ],
      }),
    },
  ],
}
