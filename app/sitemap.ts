import type { MetadataRoute } from "next";

import {
  canonicalOrigin,
  generateResearchSitemapEntries,
} from "@/lib/content/generated";
import {
  getPublicResearch,
  getPublicResearchTopics,
} from "@/lib/content/research";

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
  "/research",
  "/research/topics",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [research, topics] = await Promise.all([
    getPublicResearch(),
    getPublicResearchTopics(),
  ]);

  return [
    ...institutionalPaths.map((path) => ({
      url: `${canonicalOrigin}${path}/`,
    })),
    ...topics.map((topic) => ({
      url: `${canonicalOrigin}/research/topics/${topic.topic.id}/`,
    })),
    ...generateResearchSitemapEntries(research),
  ];
}
