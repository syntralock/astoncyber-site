import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("institutional homepage", () => {
  it("introduces Aston Cyber before any individual or publication", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Aston Cyber is an independent cybersecurity");
    expect(html).toContain("Research. Engineering. Security.");
    expect(html).toContain('href="/mission"');
    expect(html).toContain('href="/ethos"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/founder/i);
    expect(html).not.toMatch(/<form|<input|<textarea/);
    expect(html).not.toMatch(/newsletter|subscribe|sign up/i);
  });

  it("features only approved public research", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).toContain("Featured research");
    expect(html).toContain("Secure Transaction Authorization Ledger");
    expect(html).toContain(">Mission</h2>");
    expect(html).not.toContain("Our focus");
    expect(html).toContain("Research, engineering, and education");
    expect(html.match(/class="pillar-icon"/g) ?? []).toHaveLength(3);
    expect(
      html.match(/<svg aria-hidden="true" class="pillar-icon"/g) ?? [],
    ).toHaveLength(3);
    expect(html).not.toContain("<br");
    expect(html).toContain("Questions or inquiries?");
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/Current work|Selected writing/i);
    expect(html).not.toContain("content-system-technical-fixture");
    expect(html).not.toMatch(/<img|<picture|<video/);
  });

  it("keeps shell landmarks out of the route component", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).not.toMatch(/<(header|footer|nav)[ >]/);
  });
});
