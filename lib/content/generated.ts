import type { MetadataRoute } from "next";

import { offeringSlugs } from "../offerings.ts";
import {
  absoluteSiteUrl,
  siteDescription,
  siteOrigin,
} from "../site-metadata.ts";

import type { ResolvedResearchItem } from "./research.ts";

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
  origin = siteOrigin,
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
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Aston Cyber Research</title>",
    `    <link>${origin}/research/</link>`,
    `    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <description>${escapeXml(siteDescription)}</description>`,
    "    <language>en-us</language>",
    ...(entries ? [entries] : []),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function generateResearchSitemapEntries(
  items: readonly ResolvedResearchItem[],
  origin = siteOrigin,
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
      url: absoluteSiteUrl(path || "/"),
    })),
    ...offeringSlugs.map((slug) => ({
      url: absoluteSiteUrl(`/offerings/${slug}`),
    })),
    ...generateResearchSitemapEntries(research),
  ];
}
