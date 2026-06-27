import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

// Edge-safe: uses only `authConfig` (no Credentials/bcrypt import). The
// `authorized` callback gates `/dashboard/*` and redirects to `/login`.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};
