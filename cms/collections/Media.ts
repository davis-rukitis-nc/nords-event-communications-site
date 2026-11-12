import type { CollectionConfig } from "payload"
import { anyone, authenticated } from "../access"
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate"

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    // The site resizes on the fly with next/image, so no pre-generated sizes are needed.
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: { description: "Describe the image for screen readers. Leave empty for purely decorative images." },
    },
  ],
}
