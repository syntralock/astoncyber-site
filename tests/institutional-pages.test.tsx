import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import AccessibilityPage from "@/app/accessibility/page";
import ContactPage from "@/app/contact/page";
import DisclosuresPage from "@/app/disclosures/page";
import EthosPage from "@/app/ethos/page";
import MissionPage from "@/app/mission/page";
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
    expect(html).not.toMatch(/<form|<script|<img|<picture/);
  });

  it("keeps Mission to one h1 and its approved three-part composition", () => {
    const html = renderToStaticMarkup(<MissionPage />);

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Our work");
    expect(html).toContain("Vision");
    expect(html).toContain("Research, engineering, and education");
    expect(html).toContain("mission-focus");
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

  it("publishes the approved founder, accountability, and funding disclosures", () => {
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
    expect(html).toContain("Aston Cyber is currently founder funded");
    expect(html).toContain("no vendor funding");
    expect(html).toContain("or sponsored research");
    expect(html).not.toContain("Contact Aston Cyber");
    expect(html).not.toContain('href="/contact"');
    expect(html).not.toMatch(/advisor/i);
  });

  it("removes the empty People route while preserving profile architecture", () => {
    expect(existsSync("app/people/page.tsx")).toBe(false);
    expect(existsSync("app/people/[slug]/page.tsx")).toBe(false);
  });

  it("publishes the five approved bounded offering categories", () => {
    const html = renderToStaticMarkup(<OfferingsPage />);

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    for (const offering of [
      "Identity, cloud, and platform security",
      "Security architecture and decision support",
      "Focused security assessments",
      "Security automation and control evidence",
      "Secure workflow research and prototyping",
    ]) {
      expect(html).toContain(offering);
    }
    for (const label of [
      "Client problem",
      "Typical engagement",
      "Expected outcome",
      "Credibility",
      "Boundary",
    ]) {
      expect(html.match(new RegExp(`>${label}</h4>`, "g")) ?? []).toHaveLength(
        5,
      );
    }
    expect(html).toContain("How an engagement works");
    expect(html).toContain("Founder accountability");
    expect(html).toContain("What Aston Cyber does not do");
    expect(html).toContain("Independence and research integrity");
    expect(html).toContain("Penetration testing or broad red-team programs");
    expect(html).toContain("vCISO retainers");
    expect(html).toContain("no vendor funding");
    expect(html).toContain("or sponsored research");
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/we guarantee|is a proven production platform/i);
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
