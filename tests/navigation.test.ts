import { describe, expect, it } from "vitest";

import {
  getPublishedNavigationItems,
  isNavigationItemActive,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/navigation";

describe("canonical navigation", () => {
  it("publishes the approved five destinations in order", () => {
    expect(primaryNavigation).toEqual([
      { href: "/", label: "Home" },
      { href: "/research", label: "Research" },
      { href: "/projects", label: "Projects" },
      { href: "/labs", label: "Labs" },
      { href: "/about", label: "About" },
    ]);

    expect(
      getPublishedNavigationItems(primaryNavigation).map(({ label }) => label),
    ).toEqual(["Home", "Research", "Projects", "Labs", "About"]);
    expect(JSON.stringify(primaryNavigation)).not.toContain("Mission");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Writing");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Speaking");
  });

  it("marks exact and nested routes active without matching partial names", () => {
    expect(isNavigationItemActive("/research", "/research")).toBe(true);
    expect(isNavigationItemActive("/research/example", "/research")).toBe(true);
    expect(isNavigationItemActive("/researching", "/research")).toBe(false);
    expect(isNavigationItemActive("/projects/example", "/projects")).toBe(true);
    expect(isNavigationItemActive("/labs/example", "/labs")).toBe(true);
    expect(isNavigationItemActive("/", "/research")).toBe(false);
    expect(isNavigationItemActive("/", "/")).toBe(true);
    expect(isNavigationItemActive("/mission", "/")).toBe(false);
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
