import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("design-system placeholder homepage", () => {
  it("renders a semantic, neutral design-system specimen", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html.match(/<main/g) ?? []).toHaveLength(0);
    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html.match(/<section/g) ?? []).toHaveLength(3);
    expect(html).toContain('aria-labelledby="specimen-title"');
    expect(html).toContain("Aston Cyber");
    expect(html).toContain("Non-production design-system placeholder");
    expect(html).toContain("Type hierarchy");
    expect(html).toContain("Surface hierarchy");
  });

  it("keeps shell landmarks out of the route component", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).not.toMatch(/<(header|footer|nav)[ >]/);
  });

  it("uses working in-page links for button demonstrations", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('href="#typography"');
    expect(html).toContain('href="#surfaces"');
    expect(html).toContain('href="#specimen-title"');
  });
});
