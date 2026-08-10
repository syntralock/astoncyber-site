import { describe, expect, it } from "vitest";

import {
  closeNavigationDisclosure,
  getPublishedNavigationItems,
  isNavigationItemActive,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/navigation";

describe("canonical navigation", () => {
  it("closes an expanded mobile navigation disclosure", () => {
    const disclosure = { open: true };

    closeNavigationDisclosure(disclosure);

    expect(disclosure.open).toBe(false);
    expect(() => closeNavigationDisclosure(null)).not.toThrow();
  });

  it("publishes the approved Phase B destinations in order", () => {
    expect(primaryNavigation).toEqual([
      { href: "/", label: "Home" },
      { href: "/offerings", label: "Offerings" },
      { href: "/research", label: "Research" },
      { href: "/about", label: "About" },
    ]);

    expect(
      getPublishedNavigationItems(primaryNavigation).map(({ label }) => label),
    ).toEqual(["Home", "Offerings", "Research", "About"]);
    expect(JSON.stringify(primaryNavigation)).not.toContain("Mission");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Projects");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Labs");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Writing");
    expect(JSON.stringify(primaryNavigation)).not.toContain("Speaking");
  });

  it("marks exact and nested routes active without matching partial names", () => {
    expect(isNavigationItemActive("/research", "/research")).toBe(true);
    expect(isNavigationItemActive("/research/example", "/research")).toBe(true);
    expect(isNavigationItemActive("/researching", "/research")).toBe(false);
    expect(isNavigationItemActive("/offerings", "/offerings")).toBe(true);
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
