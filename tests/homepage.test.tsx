import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("institutional homepage", () => {
  it("introduces Aston Cyber before any individual or publication", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Aston Cyber is an independent cybersecurity");
    expect(html).toContain("Research, engineering, security");
    expect(html).toContain('href="/mission"');
    expect(html).toContain('href="/ethos"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/founder/i);
  });

  it("omits unpublished and non-public collection surfaces", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).not.toMatch(
      /Featured research|Current work|Selected writing|content-system-technical-fixture/i,
    );
    expect(html).not.toMatch(/<img|<picture|<video/);
  });

  it("keeps shell landmarks out of the route component", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).not.toMatch(/<(header|footer|nav)[ >]/);
  });
});
