import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import AccessibilityPage from "@/app/accessibility/page";
import ContactPage from "@/app/contact/page";
import DisclosuresPage from "@/app/disclosures/page";
import EthosPage from "@/app/ethos/page";
import MissionPage from "@/app/mission/page";
import OfferingPage, {
  generateMetadata as offeringMetadata,
  generateStaticParams as offeringStaticParams,
} from "@/app/offerings/[slug]/page";
import OfferingsPage from "@/app/offerings/page";
import PrivacyPage from "@/app/privacy/page";
import sitemap from "@/app/sitemap";
import {
  PersonProfile,
  type PersonProfileData,
} from "@/components/content/person-profile";

const pages = [
  ["Mission", MissionPage],
  ["Ethos", EthosPage],
  ["About", AboutPage],
  ["Offerings", OfferingsPage],
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
    expect(html).not.toMatch(/<form|<img|<picture/);
    expect(html).toContain('type="application/ld+json"');
  });

  it("keeps Mission concise, directional, and connected to About and Ethos", () => {
    const html = renderToStaticMarkup(<MissionPage />);

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Understand consequential problems");
    expect(html).toContain("Engineer practical responses");
    expect(html).toContain("Share useful knowledge");
    expect(html).toContain("mission-focus");
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/ethos"');
    expect(html).not.toContain("Organizational principles");
  });

  it("qualifies engagement inquiries without collecting sensitive information", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain('href="mailto:info@astoncyber.com"');
    expect(html).toContain('href="mailto:security@astoncyber.com"');
    for (const item of [
      "Organization type",
      "General problem category",
      "Desired outcome",
      "Approximate timing",
      "Your contact information",
    ]) {
      expect(html).toContain(item);
    }
    expect(html).toContain("Do not include credentials");
    expect(html).toContain("confidential information");
    expect(html).toContain("regulated data");
    expect(html).toContain("incident evidence");
    expect(html).toContain("sensitive technical artifacts");
    expect(html).toContain("What happens next");
    expect(html).toContain("bounded scope");
    expect(html).not.toMatch(/<form|<input|<textarea|<button/);
  });

  it("publishes the approved identity, founder, operating, and independence facts", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html).toContain(">Meet the Founder</h2>");
    expect(html).toContain(
      "Aston Cyber was founded by <strong>Matt Aston</strong>",
    );
    expect(html).toContain("Infantry Sergeant in the U.S. Army");
    expect(html).toContain(
      "is completing a master&#x27;s degree in Computer Science",
    );
    expect(html).toContain('href="https://matt.astoncyber.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("Learn more about Matt Aston →");
    expect(html).toContain("not yet formally incorporated");
    expect(html).toContain("Matt Aston leads or materially participates");
    expect(html).toContain("Engagement philosophy");
    expect(html).toContain("no vendor commissions");
    expect(html).toContain("vendor resale incentives");
    expect(html).toContain("paid referral arrangements");
    expect(html).toContain("Commercial work remains separate");
    expect(html).not.toMatch(/funding|sponsor/i);
    expect(html).not.toContain("Contact Aston Cyber");
    expect(html).not.toContain('href="/contact"');
    expect(html).not.toMatch(/advisor/i);
  });

  it("removes the empty People route while preserving profile architecture", () => {
    expect(existsSync("app/people/page.tsx")).toBe(false);
    expect(existsSync("app/people/[slug]/page.tsx")).toBe(false);
  });

  it("publishes the five linked offering overviews without definition-heavy content", () => {
    const html = renderToStaticMarkup(<OfferingsPage />);

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("How We Help");
    expect(html).toContain("Not every cybersecurity problem starts");

    for (const [title, slug] of [
      [
        "Security Strategy &amp; Architecture",
        "security-strategy-architecture",
      ],
      ["Security Engineering", "security-engineering"],
      ["Security Reviews &amp; Assessments", "security-reviews-assessments"],
      [
        "Security Operations &amp; Improvement",
        "security-operations-improvement",
      ],
      ["Research &amp; Innovation", "research-innovation"],
    ]) {
      expect(html).toContain(title);
      expect(html).toContain(`href="/offerings/${slug}"`);
    }

    expect(html.match(/class="offering-overview"/g) ?? []).toHaveLength(5);
    expect(html).not.toContain("Learn more");
    expect(html).not.toContain("Typical engagement");
    expect(html).not.toContain("Founder accountability");
    expect(html).toContain("Every engagement starts with a conversation.");
    expect(html).toContain('href="/contact"');
  });

  it("statically publishes restrained offering detail routes and metadata", async () => {
    const params = offeringStaticParams();

    expect(params).toHaveLength(5);

    for (const { slug } of params) {
      const page = await OfferingPage({ params: Promise.resolve({ slug }) });
      const html = renderToStaticMarkup(page);
      const metadata = await offeringMetadata({
        params: Promise.resolve({ slug }),
      });

      expect(html.match(/<h1/g) ?? []).toHaveLength(1);
      expect(html).toContain("What this is");
      expect(html).toContain("When it may be useful");
      expect(html).toContain("What working together could look like");
      expect(html).toContain("Possible outcomes");
      expect(html).toContain("Boundaries");
      expect(html).toContain('href="/contact"');
      expect(html).not.toMatch(/pricing|guaranteed timeline|fixed package/i);
      expect(metadata.alternates).toEqual({
        canonical: `https://astoncyber.com/offerings/${slug}/`,
      });
      expect(metadata.openGraph).toMatchObject({
        type: "website",
        url: `https://astoncyber.com/offerings/${slug}/`,
      });
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    }
  });

  it("preserves the Ethos while aligning its independence language", () => {
    const html = renderToStaticMarkup(<EthosPage />);

    expect(html).toContain("The Aston Cyber Ethos");
    expect(html).toContain("Our research agenda is never for sale");
    expect(html).toContain("vendor commissions");
    expect(html).toContain("resale incentives");
    expect(html).toContain("paid referral arrangements");
    expect(html).toContain("Confidence should never exceed evidence");
    expect(html).not.toMatch(/funding|sponsor/i);
  });

  it("keeps responsible-disclosure guidance limited and explicit", () => {
    const html = renderToStaticMarkup(<DisclosuresPage />);

    expect(html).toContain("clear reproduction details");
    expect(html).toContain("No response or remediation deadline is guaranteed");
    expect(html).toContain("does not grant authorization");
    expect(html).toContain("No safe-harbor commitment is made");
    expect(html).toContain("no legal rights are waived");
    expect(html).not.toMatch(/bounty|eligible systems|out-of-scope systems/i);
  });
});

describe("person profile architecture", () => {
  it("renders approved typed data without requiring a public route", () => {
    const person = {
      biography: ["Approved profile text supplied to the template."],
      name: "Approved name",
      role: "Approved role",
    } as const satisfies PersonProfileData;
    const html = renderToStaticMarkup(<PersonProfile person={person} />);

    expect(html).toContain("<article");
    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain(person.name);
    expect(html).toContain(person.role);
  });
});

describe("institutional sitemap", () => {
  it("includes institutional and public research surfaces only", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const path of [
      "/",
      "/about/",
      "/accessibility/",
      "/contact/",
      "/disclosures/",
      "/ethos/",
      "/mission/",
      "/offerings/",
      "/offerings/security-strategy-architecture/",
      "/offerings/security-engineering/",
      "/offerings/security-reviews-assessments/",
      "/offerings/security-operations-improvement/",
      "/offerings/research-innovation/",
      "/privacy/",
      "/research/",
      "/research/secure-transaction-authorization-ledger/",
    ]) {
      expect(urls).toContain(`https://astoncyber.com${path}`);
    }

    expect(urls).not.toContain(
      "https://astoncyber.com/research/content-system-technical-fixture/",
    );
    expect(urls.join("\n")).not.toMatch(
      /\/people\/|\/projects\/|\/labs\/|\/research\/topics\//,
    );
    expect(urls.join("\n")).not.toMatch(/writing|speaking|draft-|fixture/);
  });
});
