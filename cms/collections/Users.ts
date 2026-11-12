import { APIError, type CollectionConfig } from "payload"
import { authenticated } from "../access"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Settings",
  },
  auth: {
    // Lock the account for 10 minutes after 5 wrong passwords.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8, // 8 hours
  },
  access: {
    // No public sign-up: only logged-in admins can add users.
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ operation, req }) => {
        // Also blocks Payload's "create first user" screen. The first admin is created
        // from PAYLOAD_INITIAL_ADMIN_PASSWORD on startup instead (see payload.config.ts).
        if (operation === "create" && !req.user && !req.context.allowSystemCreate) {
          throw new APIError("Accounts can only be created by an existing admin.", 403)
        }
      },
    ],
  },
  fields: [{ name: "name", type: "text" }],
}
