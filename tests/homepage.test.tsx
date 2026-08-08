import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("institutional homepage", () => {
  it("establishes the approved identity, audience, and buyer pathways", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain(
      "independent, founder-led cybersecurity engineering and research firm",
    );
    expect(html).toContain("financial services");
    expect(html).toContain("operational, financial, or regulatory risk");
    expect(html).toContain('href="/offerings"');
    expect(html).toContain('href="/research"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain("Founder accountability");
    expect(html).not.toContain('href="/mission"');
    expect(html).not.toContain('href="/ethos"');
    expect(html).not.toMatch(/<form|<input|<textarea/);
    expect(html).not.toMatch(/newsletter|subscribe|sign up/i);
  });

  it("features only approved public research", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).toContain("Research as evidence");
    expect(html).toContain("Secure Transaction Authorization Ledger");
    expect(html).toContain("Focused work. Direct accountability.");
    expect(html).toContain("Consequential environments");
    expect(html).toContain("Bounded engineering");
    expect(html.match(/class="pillar-icon"/g) ?? []).toHaveLength(3);
    expect(
      html.match(/<svg aria-hidden="true" class="pillar-icon"/g) ?? [],
    ).toHaveLength(3);
    expect(html).not.toContain("<br");
    expect(html).toContain("Start with a defined problem");
    expect(html).toContain("Contact Aston Cyber");
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/Current work|Selected writing/i);
    expect(html).not.toContain("content-system-technical-fixture");
    expect(html).not.toMatch(/<img|<picture|<video/);
    expect(html).toContain('class="section-space homepage-introduction"');
    expect(html).not.toMatch(/funding|sponsor/i);
  });

  it("keeps shell landmarks out of the route component", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).not.toMatch(/<(header|footer|nav)[ >]/);
  });
});
