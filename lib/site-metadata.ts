import type { Metadata } from "next";

export const siteName = "Aston Cyber";
export const siteOrigin = "https://astoncyber.com";
export const siteDescription =
  "Aston Cyber helps organizations modernize systems, connect applications, automate workflows, build practical software, and improve cybersecurity and technology risk.";
export const founderProfileUrl = "https://matt.astoncyber.com/";
export const founderId = `${founderProfileUrl}#person`;
export const socialImage = {
  alt: "Aston Cyber, Systems Modernization",
  height: 630,
  type: "image/png",
  url: `${siteOrigin}/images/social/aston-cyber-systems-modernization.png`,
  width: 1200,
} as const;

export function absoluteSiteUrl(pathname: string) {
  const trimmedPath = pathname.replace(/\/+$/u, "");
  const isFilePath = /\/[^/]+\.[a-z0-9]+$/iu.test(trimmedPath);
  const normalizedPath =
    pathname === "/" || isFilePath ? pathname : `${trimmedPath}/`;
  return new URL(normalizedPath, siteOrigin).toString();
}

type PageMetadataOptions = Readonly<{
  absoluteTitle?: boolean;
  article?: Readonly<{
    authors: readonly string[];
    downloadPath?: string;
    modifiedTime?: string;
    publicationTime: string;
    publisher: string;
    reportType: string;
    revision?: string;
  }>;
  description: string;
  pathname: string;
  title: string;
  type?: "article" | "website";
}>;

export function createPageMetadata({
  absoluteTitle = false,
  article,
  description,
  pathname,
  title,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = absoluteSiteUrl(pathname);
  const socialTitle =
    absoluteTitle || title === siteName ? title : `${title} | ${siteName}`;

  const citationMetadata = article
    ? {
        citation_author: [...article.authors],
        citation_date: article.publicationTime,
        ...(article.downloadPath
          ? {
              citation_download_url: absoluteSiteUrl(article.downloadPath),
            }
          : {}),
        ...(article.modifiedTime
          ? { citation_last_updated: article.modifiedTime }
          : {}),
        citation_publisher: article.publisher,
        citation_public_url: canonical,
        citation_technical_report_institution: article.publisher,
        citation_technical_report_number: article.revision
          ? `${article.reportType}, revision ${article.revision}`
          : article.reportType,
        citation_title: title,
      }
    : undefined;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      locale: "en_US",
      images: [socialImage],
      siteName,
      title: socialTitle,
      type,
      url: canonical,
      ...(article
        ? {
            authors: [...article.authors],
            modifiedTime: article.modifiedTime,
            publishedTime: article.publicationTime,
          }
        : {}),
    },
    ...(citationMetadata ? { other: citationMetadata } : {}),
    title: absoluteTitle ? { absolute: title } : title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          url: socialImage.url,
          width: socialImage.width,
        },
      ],
      title: socialTitle,
    },
  };
}
