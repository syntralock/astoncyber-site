import type { MetadataRoute } from "next";

import type { PublicLabItem } from "./labs.ts";
import type { PublicProjectItem } from "./projects.ts";
import type { ResolvedResearchItem } from "./research.ts";
import type { TaxonomyReference } from "./schema.ts";

export const canonicalOrigin = "https://astoncyber.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function generateResearchRss(
  items: readonly ResolvedResearchItem[],
  origin = canonicalOrigin,
) {
  const publicItems = items.filter(
    (item) => item.metadata.visibility === "public",
  );
  const entries = publicItems
    .map((item) => {
      const url = `${origin}/research/${item.metadata.slug}/`;
      return [
        "    <item>",
        `      <title>${escapeXml(item.metadata.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(item.metadata.summary)}</description>`,
        `      <pubDate>${new Date(`${item.metadata.published_at}T00:00:00.000Z`).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Aston Cyber Research</title>",
    `    <link>${origin}/research/</link>`,
    "    <description>Published Aston Cyber research.</description>",
    ...(entries ? [entries] : []),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function generateResearchSitemapEntries(
  items: readonly ResolvedResearchItem[],
  origin = canonicalOrigin,
) {
  return items
    .filter((item) => item.metadata.visibility === "public")
    .map((item) => ({
      lastModified:
        item.metadata.updated_at ?? item.metadata.published_at ?? undefined,
      url: `${origin}/research/${item.metadata.slug}/`,
    }));
}

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
  "/projects",
  "/labs",
  "/research",
  "/research/topics",
] as const;

export function generateSiteSitemap({
  labs,
  projects,
  research,
  topics,
}: Readonly<{
  labs: readonly PublicLabItem[];
  projects: readonly PublicProjectItem[];
  research: readonly ResolvedResearchItem[];
  topics: readonly Readonly<{ topic: TaxonomyReference }>[];
}>): MetadataRoute.Sitemap {
  return [
    ...institutionalPaths.map((path) => ({
      url: `${canonicalOrigin}${path}/`,
    })),
    ...topics.map((topic) => ({
      url: `${canonicalOrigin}/research/topics/${topic.topic.id}/`,
    })),
    ...projects.map((item) => ({
      lastModified:
        item.metadata.published_at ?? item.metadata.completed_at ?? undefined,
      url: `${canonicalOrigin}/projects/${item.metadata.slug}/`,
    })),
    ...labs.map((item) => ({
      lastModified: item.metadata.published_at,
      url: `${canonicalOrigin}/labs/${item.metadata.slug}/`,
    })),
    ...generateResearchSitemapEntries(research),
  ];
}
