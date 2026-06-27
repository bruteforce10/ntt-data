import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config shared by the middleware and the full `auth.ts`.
 * MUST NOT import anything that breaks on the Edge runtime (e.g. bcrypt) —
 * the Credentials provider with its `authorize` lives in `auth.ts` only.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
