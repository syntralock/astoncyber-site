import { describe, expect, it } from "vitest";

import {
  getPublishedNavigationItems,
  isNavigationItemActive,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/navigation";

describe("canonical navigation", () => {
  it("matches the approved labels and routes in order", () => {
    expect(primaryNavigation).toEqual([
      { href: "/mission", label: "Mission" },
      { href: "/research", label: "Research" },
      { href: "/projects", label: "Projects" },
      { href: "/writing", label: "Writing" },
      { href: "/labs", label: "Labs" },
      { href: "/speaking", label: "Speaking" },
      { href: "/about", label: "About" },
    ]);
  });

  it("marks exact and nested routes active without matching partial names", () => {
    expect(isNavigationItemActive("/research", "/research")).toBe(true);
    expect(isNavigationItemActive("/research/example", "/research")).toBe(true);
    expect(isNavigationItemActive("/researching", "/research")).toBe(false);
    expect(isNavigationItemActive("/", "/research")).toBe(false);
  });

  it("centralizes footer destinations and filters unpublished items", () => {
    expect(secondaryNavigation.map(({ label }) => label)).toEqual([
      "Contact",
      "Ethos",
      "Accessibility",
      "Responsible Disclosure",
      "Privacy",
      "RSS",
      "GitHub",
    ]);

    expect(
      getPublishedNavigationItems([
        { href: "/published", label: "Published" },
        { href: "/withheld", label: "Withheld", published: false },
      ]),
    ).toEqual([{ href: "/published", label: "Published" }]);
  });
});
