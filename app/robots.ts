import type { MetadataRoute } from "next";

import { absoluteSiteUrl, siteOrigin } from "@/lib/site-metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteOrigin,
    rules: { allow: "/", userAgent: "*" },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
