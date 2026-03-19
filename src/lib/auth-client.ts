import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required.");
}

export const authClient = createAuthClient({
  baseURL,
  plugins: [convexClient()],
});
