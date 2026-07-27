import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import AccessibilityPage from "@/app/accessibility/page";
import ContactPage from "@/app/contact/page";
import DisclosuresPage from "@/app/disclosures/page";
import EthosPage from "@/app/ethos/page";
import MissionPage from "@/app/mission/page";
import PeoplePage from "@/app/people/page";
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
  ["People", PeoplePage],
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

  it("uses approved direct-email routing without form infrastructure", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect(html).toContain('href="mailto:info@astoncyber.com"');
    expect(html).toContain('href="mailto:security@astoncyber.com"');
    expect(html).not.toMatch(/<form|<input|<textarea|<button/);
  });

  it("publishes only the approved neutral funding disclosure", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html).toContain(
      "Aston Cyber does not currently publish a list of funders or sponsors.",
    );
    expect(html).not.toContain("Contact Aston Cyber");
    expect(html).not.toContain('href="/contact"');
    expect(html).not.toMatch(/leadership|founder|employee|advisor/i);
  });

  it("provides an editorial People empty state without publishing profiles", () => {
    const html = renderToStaticMarkup(<PeoplePage />);

    expect(html).toContain("No person profiles are currently published");
    expect(html).toContain("only when approved person content is available");
    expect(existsSync("app/people/[slug]/page.tsx")).toBe(false);
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
      "/people/",
      "/privacy/",
      "/projects/",
      "/labs/",
      "/research/",
      "/research/topics/",
      "/research/topics/secure-software-design/",
      "/research/topics/transaction-authorization/",
      "/research/secure-transaction-authorization-ledger/",
    ]) {
      expect(urls).toContain(`https://astoncyber.com${path}`);
    }

    expect(urls).not.toContain(
      "https://astoncyber.com/research/content-system-technical-fixture/",
    );
    expect(urls.join("\n")).not.toMatch(/writing|speaking|draft-|fixture/);
  });
});
