import type { MetadataRoute } from "next";

import { offeringSlugs } from "../offerings.ts";

import type { ResolvedResearchItem } from "./research.ts";

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
  "/offerings",
  "/privacy",
  "/research",
] as const;

export function generateSiteSitemap({
  research,
}: Readonly<{
  research: readonly ResolvedResearchItem[];
}>): MetadataRoute.Sitemap {
  return [
    ...institutionalPaths.map((path) => ({
      url: `${canonicalOrigin}${path}/`,
    })),
    ...offeringSlugs.map((slug) => ({
      url: `${canonicalOrigin}/offerings/${slug}/`,
    })),
    ...generateResearchSitemapEntries(research),
  ];
}
