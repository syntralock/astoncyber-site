import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RootLayout, { metadata, viewport } from "@/app/layout";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

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

    for (const href of ["/", "/research", "/projects", "/labs", "/about"]) {
      expect(html).toContain(`href="${href}"`);
    }

    expect(html).toContain(">Home</a>");
    expect(html).not.toContain(">Mission</a>");
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
    pathnameState.value = "/research/example";

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
        "Independent cybersecurity research, engineering, and education.",
      robots: {
        follow: false,
        index: false,
      },
      title: {
        default: "Aston Cyber",
        template: "%s | Aston Cyber",
      },
    });
    expect(metadata).toMatchObject({
      manifest: "/icons/site.webmanifest",
      icons: {
        apple: [{ sizes: "180x180", url: "/icons/apple-touch-icon.png" }],
      },
    });
    expect(viewport).toEqual({ colorScheme: "dark", themeColor: "#2e2e2e" });
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
      />,
    );

    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/research"');
    expect(html).toContain('aria-current="page">Example');
  });
});
