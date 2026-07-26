import type { MetadataRoute } from "next";

import {
  canonicalOrigin,
  generateResearchSitemapEntries,
} from "@/lib/content/generated";
import { getPublicResearch } from "@/lib/content/research";

export const dynamic = "force-static";

const institutionalPaths = [
  "",
  "/about",
  "/accessibility",
  "/contact",
  "/disclosures",
  "/ethos",
  "/mission",
  "/people",
  "/privacy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const research = await getPublicResearch();

  return [
    ...institutionalPaths.map((path) => ({
      url: `${canonicalOrigin}${path}/`,
    })),
    ...generateResearchSitemapEntries(research),
  ];
}
