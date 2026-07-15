/**
 * Canonical public URL of THIS deployment (the Open Innovation sub-site).
 * Override with NEXT_PUBLIC_SITE_URL when the deployment domain changes —
 * sitemap.xml, robots.txt, canonicals, and Open Graph URLs all derive from it.
 * Not NEXT_PUBLIC_BASE_URL: that var points at PocketBase in some environments.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oiw.ntt-startupchallenge.com"
).replace(/\/+$/, "");

export const SITE_NAME = "NTT DATA Open Innovation Program";

export const SITE_DESCRIPTION =
  "We are looking at innovative Startup solutions that address business challenges and solve societal issues. Register your startup and pitch your solution to NTT DATA and its partners.";
