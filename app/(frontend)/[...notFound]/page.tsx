import { notFound } from "next/navigation"

// Any URL no other route matches renders the site's own 404 page (app/(frontend)/not-found.tsx),
// with the normal header and footer. Needed because the app has two root layouts (site + Payload admin).
export default function CatchAll() {
  notFound()
}
