import type { MetadataRoute } from "next";

import { generateSiteSitemap } from "@/lib/content/generated";
import { getPublicResearch } from "@/lib/content/research";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSiteSitemap({ research: await getPublicResearch() });
}
