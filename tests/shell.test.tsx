import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RootLayout, { metadata, viewport } from "@/app/layout";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { StructuredData } from "@/components/structured-data";

const pathnameState = vi.hoisted(() => ({ value: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameState.value,
}));

describe("shared application shell", () => {
  beforeEach(() => {
    pathnameState.value = "/";
  });

  it("provides shared landmarks, skip navigation, and canonical destinations", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <h1>Route content</h1>
      </RootLayout>,
    );

    expect(html.match(/<header/g) ?? []).toHaveLength(1);
    expect(html.match(/<main/g) ?? []).toHaveLength(1);
    expect(html.match(/<footer/g) ?? []).toHaveLength(1);
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('id="main-content"');
    expect(html).toContain("<summary");
    expect(html).toContain(">Menu</summary>");
    expect(html).toContain('aria-label="Aston Cyber home"');
    expect(html).toContain('src="/brand/aston-cyber-logo-dark.svg"');
    expect(html).not.toContain('class="brand-wordmark"');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"@type":"WebSite"');

    for (const href of ["/", "/services", "/approach", "/about"]) {
      expect(html).toContain(`href="${href}"`);
    }

    expect(html).toContain(">Home</a>");
    expect(html).toContain(">Services</a>");
    expect(html).toContain(">Our Approach</a>");
    expect(html).not.toContain(">Mission</a>");
    expect(html).not.toContain('href="/projects"');
    expect(html).not.toContain('href="/labs"');
    expect(html).not.toContain('href="/writing"');
    expect(html).not.toContain('href="/speaking"');
  });

  it("uses a contact route without exposing recipients and retains safe repository-link defaults", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <h1>Route content</h1>
      </RootLayout>,
    );

    expect(html).toContain('href="/contact"');
    expect(html).toContain("desktop-contact-action");
    expect(html).toContain("mobile-contact-action");
    expect(html).not.toContain("info@astoncyber.com");
    expect(html).not.toContain("security@astoncyber.com");
    expect(html).not.toContain("mailto:");
    expect(html).toContain(
      'href="https://github.com/syntralock/astoncyber-site"',
    );
    expect(html).toContain('aria-label="Footer primary"');
    expect(html).toContain('aria-label="Footer secondary"');
    expect(html).not.toContain("|");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("marks active top-level destinations for exact and nested routes", () => {
    pathnameState.value = "/services/systems-modernization";

    const html = renderToStaticMarkup(
      <RootLayout>
        <h1>Route content</h1>
      </RootLayout>,
    );

    expect(html.match(/aria-current="page"/g) ?? []).toHaveLength(2);
  });

  it("provides default application metadata", () => {
    expect(metadata).toMatchObject({
      applicationName: "Aston Cyber",
      description:
        "Aston Cyber helps organizations modernize systems, connect applications, automate workflows, build practical software, and improve cybersecurity and technology risk.",
      title: {
        default: "Aston Cyber",
        template: "%s | Aston Cyber",
      },
    });
    expect(metadata).toMatchObject({
      alternates: { canonical: "https://astoncyber.com/" },
      icons: {
        apple: [{ sizes: "180x180", url: "/icons/apple-touch-icon.png" }],
      },
      metadataBase: new URL("https://astoncyber.com"),
      openGraph: {
        images: [
          {
            alt: "Aston Cyber, Systems Modernization",
            height: 630,
            type: "image/png",
            url: "https://astoncyber.com/images/social/aston-cyber-systems-modernization.png",
            width: 1200,
          },
        ],
        siteName: "Aston Cyber",
        url: "https://astoncyber.com/",
      },
      twitter: {
        card: "summary_large_image",
        images: [
          {
            alt: "Aston Cyber, Systems Modernization",
            height: 630,
            url: "https://astoncyber.com/images/social/aston-cyber-systems-modernization.png",
            width: 1200,
          },
        ],
      },
    });
    expect(metadata).not.toHaveProperty("manifest");
    expect(metadata).not.toHaveProperty("robots");
    expect(viewport).toEqual({ colorScheme: "dark", themeColor: "#2e2e2e" });
  });

  it("links the organization and research author to the same founder identity", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <h1>Route content</h1>
      </RootLayout>,
    );

    expect(html).toContain('"@id":"https://matt.astoncyber.com/#person"');
    expect(html).toContain(
      '"description":"Aston Cyber helps organizations modernize systems, connect applications, automate workflows, build practical software, and improve cybersecurity and technology risk."',
    );
  });
});

describe("Azure Static Web Apps configuration", () => {
  it("serves the exported Aston Cyber 404 document for missing routes", () => {
    const configuration = JSON.parse(
      readFileSync(
        resolve(process.cwd(), "public/staticwebapp.config.json"),
        "utf8",
      ),
    ) as {
      responseOverrides?: Record<string, { rewrite?: string }>;
    };

    expect(configuration.responseOverrides?.["404"]?.rewrite).toBe("/404.html");
  });

  it("permanently redirects the retired People surface to About", () => {
    const configuration = JSON.parse(
      readFileSync(
        resolve(process.cwd(), "public/staticwebapp.config.json"),
        "utf8",
      ),
    ) as {
      routes?: readonly Readonly<{
        redirect?: string;
        route?: string;
        statusCode?: number;
      }>[];
    };

    expect(configuration.routes).toContainEqual({
      redirect: "/about/",
      route: "/people/index.html",
      statusCode: 301,
    });
  });
});

describe("breadcrumbs", () => {
  it("renders linked ancestors and identifies the current page", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/research", label: "Research" },
          { label: "Example" },
        ]}
        pathname="/research/example"
      />,
    );

    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/research"');
    expect(html).toContain('aria-current="page">Example');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('"item":"https://astoncyber.com/research/example/"');
  });

  it("serializes structured data without allowing a closing script tag", () => {
    const html = renderToStaticMarkup(
      <StructuredData
        data={{ "@context": "https://schema.org", name: "</script>" }}
      />,
    );

    expect(html).toContain("\\u003c/script>");
    expect(html.match(/<\/script>/g) ?? []).toHaveLength(1);
  });
});
