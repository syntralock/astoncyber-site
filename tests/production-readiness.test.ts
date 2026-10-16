import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as accessibilityMetadata } from "@/app/accessibility/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as disclosuresMetadata } from "@/app/disclosures/page";
import { metadata as approachMetadata } from "@/app/approach/page";
import { metadata as servicesMetadata } from "@/app/services/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as privacyMetadata } from "@/app/privacy/page";
import { generateMetadata as researchMetadata } from "@/app/research/[slug]/page";
import { metadata as researchIndexMetadata } from "@/app/research/page";
import { generateMetadata as topicMetadata } from "@/app/research/topics/[slug]/page";
import { metadata as topicsMetadata } from "@/app/research/topics/page";
import robots from "@/app/robots";
import { socialImage } from "@/lib/site-metadata";

const twitterSocialImage = {
  alt: socialImage.alt,
  height: socialImage.height,
  url: socialImage.url,
  width: socialImage.width,
};

const staticMetadata = [
  [homeMetadata, "https://astoncyber.com/"],
  [aboutMetadata, "https://astoncyber.com/about/"],
  [accessibilityMetadata, "https://astoncyber.com/accessibility/"],
  [contactMetadata, "https://astoncyber.com/contact/"],
  [disclosuresMetadata, "https://astoncyber.com/disclosures/"],
  [approachMetadata, "https://astoncyber.com/approach/"],
  [servicesMetadata, "https://astoncyber.com/services/"],
  [privacyMetadata, "https://astoncyber.com/privacy/"],
  [researchIndexMetadata, "https://astoncyber.com/research/"],
  [topicsMetadata, "https://astoncyber.com/research/topics/"],
] as const;

describe("production metadata", () => {
  it("does not duplicate the brand in the absolute homepage social title", () => {
    expect(homeMetadata.openGraph).toMatchObject({
      title: "Aston Cyber | Systems Modernization & Business Automation",
    });
    expect(homeMetadata.twitter).toMatchObject({
      title: "Aston Cyber | Systems Modernization & Business Automation",
    });
  });

  it.each(staticMetadata)(
    "publishes complete metadata for %s",
    (metadata, canonical) => {
      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates).toEqual({ canonical });
      expect(metadata.openGraph).toMatchObject({
        description: metadata.description,
        images: [socialImage],
        siteName: "Aston Cyber",
        url: canonical,
      });
      expect(metadata.twitter).toMatchObject({
        card: "summary_large_image",
        description: metadata.description,
        images: [twitterSocialImage],
      });
    },
  );

  it("publishes canonical article and topic metadata", async () => {
    const article = await researchMetadata({
      params: Promise.resolve({
        slug: "secure-transaction-authorization-ledger",
      }),
    });
    const topic = await topicMetadata({
      params: Promise.resolve({ slug: "transaction-authorization" }),
    });

    expect(article.alternates).toEqual({
      canonical:
        "https://astoncyber.com/research/secure-transaction-authorization-ledger/",
    });
    expect(article.openGraph).toMatchObject({ type: "article" });
    expect(article.openGraph).toMatchObject({
      authors: ["Matthew T. Aston"],
      modifiedTime: "2026-07-01",
      publishedTime: "2026-07-01",
    });
    expect(article.openGraph).toMatchObject({ images: [socialImage] });
    expect(article.twitter).toMatchObject({
      card: "summary_large_image",
      images: [twitterSocialImage],
    });
    expect(article.other).toMatchObject({
      citation_author: ["Matthew T. Aston"],
      citation_date: "2026-07-01",
      citation_download_url:
        "https://astoncyber.com/downloads/research/secure-transaction-authorization-ledger/Secure_Transaction_Authorization_Ledger_Case_Study.docx",
      citation_last_updated: "2026-07-01",
      citation_public_url:
        "https://astoncyber.com/research/secure-transaction-authorization-ledger/",
      citation_publisher: "Aston Cyber",
      citation_technical_report_institution: "Aston Cyber",
      citation_technical_report_number: "case study, revision 1.0",
      citation_title: "Secure Transaction Authorization Ledger",
    });
    expect(topic.alternates).toEqual({
      canonical:
        "https://astoncyber.com/research/topics/transaction-authorization/",
    });
  });

  it("publishes the approved systems-modernization social card", () => {
    const cardPath = resolve(
      process.cwd(),
      "public/images/social/aston-cyber-systems-modernization.png",
    );
    const card = readFileSync(cardPath);

    expect(existsSync(cardPath)).toBe(true);
    expect(card.subarray(16, 24).readUInt32BE(0)).toBe(1200);
    expect(card.subarray(16, 24).readUInt32BE(4)).toBe(630);
    expect(card.byteLength).toBeLessThanOrEqual(400 * 1024);
  });
});

describe("crawler and platform files", () => {
  it("allows crawling and points to the canonical sitemap", () => {
    expect(robots()).toEqual({
      host: "https://astoncyber.com",
      rules: { allow: "/", userAgent: "*" },
      sitemap: "https://astoncyber.com/sitemap.xml",
    });
  });

  it("publishes an RFC 9116 security file without unsupported methods", () => {
    const contents = readFileSync(
      resolve(process.cwd(), "public/.well-known/security.txt"),
      "utf8",
    );

    expect(contents).toContain("Contact: mailto:security@astoncyber.com");
    expect(contents).toContain(
      "Canonical: https://astoncyber.com/.well-known/security.txt",
    );
    expect(contents).toContain("Policy: https://astoncyber.com/disclosures/");
    expect(contents).toMatch(/Expires: 2027-08-07T23:59:59Z/u);
    expect(contents).not.toMatch(/Encryption:|Tel:|https?:\/\/.*contact/u);
  });

  it("retains well-known files in the deployment artifact", () => {
    const workflow = readFileSync(
      resolve(
        process.cwd(),
        ".github/workflows/azure-static-web-apps-wonderful-mud-0c480e910.yml",
      ),
      "utf8",
    );

    expect(workflow).toMatch(
      /name: static-export\n\s+path: out\/\n\s+include-hidden-files: true/u,
    );
  });

  it("removes PWA installation assets while retaining browser icons", () => {
    for (const path of [
      "public/icons/site.webmanifest",
      "public/icons/icon-192.png",
      "public/icons/icon-512.png",
      "public/icons/maskable-icon-192.png",
      "public/icons/maskable-icon-512.png",
    ]) {
      expect(existsSync(path)).toBe(false);
    }

    for (const path of [
      "public/icons/favicon.svg",
      "public/icons/favicon.ico",
      "public/icons/favicon-16x16.png",
      "public/icons/favicon-32x32.png",
      "public/icons/favicon-48x48.png",
      "public/icons/apple-touch-icon.png",
    ]) {
      expect(existsSync(path)).toBe(true);
    }
  });

  it("configures hardened headers and immutable caching for hashed assets", () => {
    const configuration = JSON.parse(
      readFileSync(
        resolve(process.cwd(), "public/staticwebapp.config.json"),
        "utf8",
      ),
    ) as {
      globalHeaders?: Record<string, string>;
      routes?: readonly Readonly<{
        headers?: Record<string, string>;
        route?: string;
      }>[];
    };

    expect(configuration.globalHeaders).toMatchObject({
      "Content-Security-Policy": expect.stringContaining(
        "frame-ancestors 'none'",
      ),
      "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
    });
    expect(configuration.routes).toContainEqual({
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      route: "/_next/static/*",
    });
  });

  it("permanently redirects every retired public route", () => {
    const configuration = JSON.parse(
      readFileSync(
        resolve(process.cwd(), "public/staticwebapp.config.json"),
        "utf8",
      ),
    ) as {
      routes: readonly Readonly<{
        redirect?: string;
        route: string;
        statusCode?: number;
      }>[];
    };

    const redirects = new Map(
      configuration.routes.map(({ redirect, route, statusCode }) => [
        route,
        { redirect, statusCode },
      ]),
    );
    const expected = {
      "/ethos/": "/approach/",
      "/mission/": "/approach/",
      "/offerings/": "/services/",
      "/offerings/research-innovation/": "/services/",
      "/offerings/security-engineering/":
        "/services/cybersecurity-technology-risk/",
      "/offerings/security-operations-improvement/":
        "/services/cybersecurity-technology-risk/",
      "/offerings/security-reviews-assessments/":
        "/services/cybersecurity-technology-risk/",
      "/offerings/security-strategy-architecture/":
        "/services/cybersecurity-technology-risk/",
      "/people/": "/about/",
    } as const;

    for (const [route, redirect] of Object.entries(expected)) {
      expect(redirects.get(route)).toEqual({ redirect, statusCode: 301 });
    }
  });

  it("keeps exported system artifacts out of the public source tree", () => {
    for (const path of [
      ".DS_Store",
      "docs/.DS_Store",
      "public/.DS_Store",
      "public/icons/.DS_Store",
      "public/images/.DS_Store",
      "public/images/home/.DS_Store",
      "public/images/social/.DS_Store",
    ]) {
      expect(existsSync(path)).toBe(false);
    }
  });
});
