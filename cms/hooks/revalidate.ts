import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload"

/**
 * Pages are statically generated. When content changes in the admin panel, refresh them so the
 * change is live within seconds. The site is small, so we refresh the whole layout tree.
 * Skipped when running outside Next.js (seed/import scripts) or when the caller opts out.
 */
async function revalidateSite(context: Record<string, unknown>) {
  if (context.disableRevalidate) return
  try {
    const { revalidatePath } = await import("next/cache")
    revalidatePath("/", "layout")
  } catch {
    // Not inside a Next.js request (e.g. CLI scripts): nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateSite(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateSite(req.context)
  return doc
}
