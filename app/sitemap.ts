import type { MetadataRoute } from "next";

import {
  canonicalOrigin,
  generateResearchSitemapEntries,
} from "@/lib/content/generated";
import { getPublicResearch } from "@/lib/content/research";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const research = await getPublicResearch();

  return [
    { url: `${canonicalOrigin}/` },
    ...generateResearchSitemapEntries(research),
  ];
}
