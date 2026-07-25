import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("placeholder homepage", () => {
  it("renders one semantic main region and a labelled heading", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html.match(/<main/g)).toHaveLength(1);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="foundation-title"');
    expect(html).toContain("Aston Cyber");
    expect(html).toContain("Non-production placeholder");
  });
});
