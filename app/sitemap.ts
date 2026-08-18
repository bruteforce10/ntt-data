import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Public, indexable routes only — /login and /dashboard are intentionally
// excluded (admin area, noindex), and /startup-registration is temporarily
// redirected to / while registration is closed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/deck-submission`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
