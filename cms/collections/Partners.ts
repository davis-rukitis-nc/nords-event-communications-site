import type { CollectionConfig } from "payload"
import { anyone, authenticated } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partner", plural: "Partners" },
  orderable: true,
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "link"],
    description: "Logos in the “Trusted By” strip on the home page. Drag rows to reorder.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media", required: true },
    { name: "link", type: "text", admin: { description: "Partner website, e.g. https://www.rimi.lv" } },
  ],
}
