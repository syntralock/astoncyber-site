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

  it("publishes the approved primary destinations in order", () => {
    expect(primaryNavigation).toEqual([
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/approach", label: "Our Approach" },
      { href: "/about", label: "About" },
    ]);
    expect(getPublishedNavigationItems(primaryNavigation)).toEqual(
      primaryNavigation,
    );
  });

  it("marks exact and nested routes active without partial matches", () => {
    expect(isNavigationItemActive("/services", "/services")).toBe(true);
    expect(
      isNavigationItemActive("/services/systems-modernization", "/services"),
    ).toBe(true);
    expect(isNavigationItemActive("/service", "/services")).toBe(false);
    expect(isNavigationItemActive("/", "/")).toBe(true);
    expect(isNavigationItemActive("/approach", "/")).toBe(false);
  });

  it("keeps Research secondary and centralizes footer destinations", () => {
    expect(secondaryNavigation.map(({ label }) => label)).toEqual([
      "Contact",
      "Research",
      "Accessibility",
      "Responsible Disclosure",
      "Privacy",
      "RSS",
      "GitHub",
    ]);
  });
});
