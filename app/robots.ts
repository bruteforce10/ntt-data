import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// /login is deliberately NOT disallowed: it carries a noindex meta tag, and
// crawlers must be able to fetch the page to see it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
