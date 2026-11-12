import type { Access, FieldAccess } from "payload"

/** Any logged-in admin user. */
export const authenticated: Access = ({ req }) => Boolean(req.user)
export const authenticatedField: FieldAccess = ({ req }) => Boolean(req.user)

/** Public can read published documents; logged-in users also see drafts. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: "published" } }
}

export const anyone: Access = () => true
