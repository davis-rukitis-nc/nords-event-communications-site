import type { CollectionConfig } from "payload"
import { anyone, authenticated } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"

export const EVENT_TYPES = ["Sports", "Music", "Food & Drinks", "Marketing"] as const

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event series", plural: "Event series" },
  orderable: true,
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "showInNavigation", "showOnHomepage"],
    description: "The event pages under /events. Drag rows to change the order used across the site.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { description: "URL: necom.lv/events/<slug>. Changing it breaks existing links." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "type", type: "select", required: true, options: [...EVENT_TYPES] },
        { name: "yearStarted", type: "number", label: "First held in (year)" },
        { name: "annualParticipants", type: "text", admin: { description: "Shown as written, e.g. 46,000+" } },
      ],
    },
    { name: "description", type: "textarea", required: true, admin: { description: "One-line summary for cards and menus." } },
    { name: "longDescription", type: "textarea", label: "About the event" },
    {
      type: "row",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "logo", type: "upload", relationTo: "media", admin: { description: "Shown white on dark backgrounds." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "officialSiteUrl", type: "text", label: "Official website" },
        { name: "youtubeUrl", type: "text", label: "YouTube video URL" },
      ],
    },
    {
      name: "brandColors",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            { name: "primary", type: "text", admin: { description: "Hex, e.g. #cc2128" } },
            { name: "secondary", type: "text" },
            { name: "tertiary", type: "text" },
          ],
        },
      ],
    },
    {
      name: "socialMedia",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            { name: "instagram", type: "text" },
            { name: "facebook", type: "text" },
          ],
        },
      ],
    },
    {
      name: "startDate",
      type: "date",
      label: "First edition date",
      admin: { description: "Used for the “X years” stats on the home page.", date: { pickerAppearance: "dayOnly" } },
    },
    {
      type: "row",
      fields: [
        { name: "showInNavigation", type: "checkbox", defaultValue: true, label: "Show in the Events menu" },
        { name: "showOnHomepage", type: "checkbox", defaultValue: true, label: "Show on the home page" },
        { name: "isOneTimeEvent", type: "checkbox", defaultValue: false, label: "One-time event" },
      ],
    },
  ],
}
