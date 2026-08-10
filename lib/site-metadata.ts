import type { Metadata } from "next";

export const siteName = "Aston Cyber";
export const siteOrigin = "https://astoncyber.com";
export const siteDescription =
  "Independent, founder-led cybersecurity engineering and research for financial services and other consequential environments.";
export const founderProfileUrl = "https://matt.astoncyber.com/";
export const founderId = `${founderProfileUrl}#person`;
export const socialImage = {
  alt: "Aston Cyber — Cybersecurity Engineering & Research",
  height: 630,
  pathname: "/images/social/aston-cyber-social-card.png",
  type: "image/png",
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
  description: string;
  pathname: string;
  title: string;
  type?: "article" | "website";
}>;

export function createPageMetadata({
  description,
  pathname,
  title,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = absoluteSiteUrl(pathname);
  const socialImageUrl = absoluteSiteUrl(socialImage.pathname);
  const socialTitle = title === siteName ? siteName : `${title} | ${siteName}`;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          type: socialImage.type,
          url: socialImageUrl,
          width: socialImage.width,
        },
      ],
      locale: "en_US",
      siteName,
      title: socialTitle,
      type,
      url: canonical,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          url: socialImageUrl,
          width: socialImage.width,
        },
      ],
      title: socialTitle,
    },
  };
}
