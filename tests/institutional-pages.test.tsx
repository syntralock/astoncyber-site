import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import AccessibilityPage from "@/app/accessibility/page";
import ApproachPage from "@/app/approach/page";
import ContactPage from "@/app/contact/page";
import DisclosuresPage from "@/app/disclosures/page";
import PrivacyPage from "@/app/privacy/page";
import ServicePage, {
  generateMetadata as serviceMetadata,
  generateStaticParams as serviceStaticParams,
} from "@/app/services/[slug]/page";
import ServicesPage from "@/app/services/page";
import sitemap from "@/app/sitemap";

const pages = [
  ["Approach", ApproachPage],
  ["About", AboutPage],
  ["Services", ServicesPage],
  ["Contact", ContactPage],
  ["Accessibility", AccessibilityPage],
  ["Privacy", PrivacyPage],
  ["Responsible disclosure", DisclosuresPage],
] as const;

describe("institutional pages", () => {
  it.each(pages)("%s has one h1 and a current-page breadcrumb", (_, Page) => {
    const html = renderToStaticMarkup(<Page />);
    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('type="application/ld+json"');
  });

  it("publishes the four-stage method and three engagement models", () => {
    const html = renderToStaticMarkup(<ApproachPage />);
    for (const item of [
      "Understand",
      "Evaluate",
      "Implement",
      "Improve",
      "Assessment &amp; Planning",
      "Project Implementation",
      "Ongoing Advisory &amp; Improvement",
    ]) {
      expect(html).toContain(item);
    }
    expect(html).toContain("no vendor commissions");
    expect(html).toContain('href="/contact"');
  });

  it("qualifies inquiries without collecting sensitive information", () => {
    const html = renderToStaticMarkup(<ContactPage />);
    expect(html).toContain('href="mailto:info@astoncyber.com"');
    expect(html).toContain('href="mailto:security@astoncyber.com"');
    for (const item of [
      "System or workflow involved",
      "Desired outcome",
      "Approximate timing",
      "Your contact information",
    ])
      expect(html).toContain(item);
    expect(html).toContain("Do not include credentials");
    expect(html).not.toMatch(/<form|<input|<textarea/);
  });

  it("publishes approved founder, operating, and independence facts", () => {
    const html = renderToStaticMarkup(<AboutPage />);
    expect(html).toContain("Northwest Alabama");
    expect(html).toContain("regional and remote engagements");
    expect(html).toContain("Infantry Sergeant in the U.S. Army");
    expect(html).toContain("enterprise technology operations");
    expect(html).toContain("identity and access management");
    expect(html).toContain("no vendor commissions");
    expect(html).toContain('href="/research"');
    expect(html).toContain('src="/images/founder/matt-aston-portrait.jpg"');
    expect(html).toContain('alt="Matt Aston, founder of Aston Cyber"');
    expect(html).not.toContain("not yet formally incorporated");
    expect(html).not.toMatch(/master.s degree/i);
  });

  it("publishes exactly three linked service overviews", () => {
    const html = renderToStaticMarkup(<ServicesPage />);
    for (const [title, slug] of [
      ["Systems Modernization", "systems-modernization"],
      ["Automation &amp; Applied AI", "automation-applied-ai"],
      ["Cybersecurity &amp; Technology Risk", "cybersecurity-technology-risk"],
    ]) {
      expect(html).toContain(title);
      expect(html).toContain(`href="/services/${slug}"`);
    }
    expect(html.match(/class="service-overview"/g) ?? []).toHaveLength(3);
  });

  it("statically publishes the three service detail routes and metadata", async () => {
    const params = serviceStaticParams();
    expect(params).toHaveLength(3);
    for (const { slug } of params) {
      const page = await ServicePage({ params: Promise.resolve({ slug }) });
      const html = renderToStaticMarkup(page);
      const metadata = await serviceMetadata({
        params: Promise.resolve({ slug }),
      });
      for (const heading of [
        "What it covers",
        "When it may help",
        "Illustrative activities",
        "Possible deliverables and outcomes",
        "Important boundaries",
      ])
        expect(html).toContain(heading);
      expect(metadata.alternates).toEqual({
        canonical: `https://astoncyber.com/services/${slug}/`,
      });
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    }
  });

  it("removes retired routes from the source tree", () => {
    for (const path of [
      "app/people/page.tsx",
      "app/mission/page.tsx",
      "app/ethos/page.tsx",
      "app/offerings/page.tsx",
    ])
      expect(existsSync(path)).toBe(false);
  });
});

describe("institutional sitemap", () => {
  it("includes canonical service routes and excludes retired surfaces", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    for (const path of [
      "/",
      "/about/",
      "/approach/",
      "/contact/",
      "/services/",
      "/services/systems-modernization/",
      "/services/automation-applied-ai/",
      "/services/cybersecurity-technology-risk/",
      "/research/",
    ]) {
      expect(urls).toContain(`https://astoncyber.com${path}`);
    }
    expect(urls.join("\n")).not.toMatch(
      /\/people\/|\/mission\/|\/ethos\/|\/offerings\//,
    );
  });
});
