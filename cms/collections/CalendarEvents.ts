import type { CollectionConfig } from "payload"
import { anyone, authenticated } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"

const rigaTime = {
  pickerAppearance: "dayAndTime" as const,
  displayFormat: "EEE d MMM yyyy, HH:mm",
}

export const CalendarEvents: CollectionConfig = {
  slug: "calendar-events",
  labels: { singular: "Calendar entry", plural: "Calendar" },
  defaultSort: "start",
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "start", "venue", "series", "soldOut"],
    description:
      "Dated events for the /events calendar, the countdown and the footer. Entries disappear from the site by themselves once they have ended.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: "name", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "start",
          type: "date",
          required: true,
          timezone: { defaultTimezone: "Europe/Riga", supportedTimezones: [{ label: "Riga", value: "Europe/Riga" }] },
          admin: { date: rigaTime },
        },
        {
          name: "end",
          type: "date",
          timezone: { defaultTimezone: "Europe/Riga", supportedTimezones: [{ label: "Riga", value: "Europe/Riga" }] },
          admin: { date: rigaTime, description: "Optional. Without it, the entry stays listed for 3 hours after the start." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "allDay", type: "checkbox", label: "All-day / multi-day (show dates only)" },
        { name: "soldOut", type: "checkbox", label: "Sold out" },
        { name: "isToBeAnnounced", type: "checkbox", label: "To be announced" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "venue", type: "text" },
        {
          name: "series",
          type: "select",
          required: true,
          defaultValue: "rwch",
          admin: { description: "Sets the colour dot." },
          options: [
            { label: "Riga Wine & Champagne", value: "rwch" },
            { label: "Pink Noise Riga", value: "pnr" },
            { label: "Baltic Wine & Drinks Awards", value: "bwda" },
            { label: "Rimi Riga Marathon", value: "rrm" },
            { label: "Other / to be announced", value: "tba" },
          ],
        },
      ],
    },
    { name: "link", type: "text", admin: { description: "Where “↗” and “Learn more” go." } },
    { name: "description", type: "textarea", admin: { description: "Used for search engines (not shown on the page)." } },
  ],
}
