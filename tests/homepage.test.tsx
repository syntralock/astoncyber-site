import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("systems-modernization homepage", () => {
  it("publishes the approved positioning and conversion paths", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Better Systems. Better Business.");
    expect(html).toContain(
      "Modern Technology. Intelligent Operations. Secure by Design.",
    );
    expect(html).toContain("Systems Modernization");
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/services"');
    expect(html).toContain("Discuss Your Technology Needs");
    expect(html).toContain("Explore Our Services");
    expect(html).not.toMatch(/<form|<input|<textarea|<video/);
    expect(html).toContain(
      'srcSet="/images/home/systems-modernization-hero-960.webp"',
    );
    expect(html).toContain(
      'srcSet="/images/home/systems-modernization-hero-1600.webp"',
    );
    expect(html).toContain('src="/images/home/systems-modernization-hero.jpg"');
    expect(html).toContain(
      'alt="Systems modernization connects people, applications, infrastructure, data, and processes to improve efficiency, visibility, security, and reliability"',
    );
    expect(html).toContain('src="/images/founder/matt-aston-portrait.jpg"');
    expect(html).toContain('alt="Matt Aston, founder of Aston Cyber"');
  });

  it("presents the approved challenges, services, method, and differentiators", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html.match(/class="surface-base"/g) ?? []).toHaveLength(6);
    for (const title of [
      "Systems Modernization",
      "Automation &amp; Applied AI",
      "Cybersecurity &amp; Technology Risk",
      "Understand",
      "Evaluate",
      "Implement",
      "Improve",
      "The problem comes first",
      "Practical engineering",
      "Security by design",
      "Honest tradeoffs",
      "Direct technical accountability",
    ]) {
      expect(html).toContain(title);
    }
    expect(html.match(/class="pillar-icon"/g) ?? []).toHaveLength(3);
    expect(html).not.toContain("financial services");
    expect(html).not.toContain('href="/offerings"');
    expect(html).not.toContain('href="/mission"');
    expect(html).not.toContain('href="/ethos"');
  });

  it("keeps shell landmarks out of the route component", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).not.toMatch(/<(header|footer|nav)[ >]/);
  });
});
