export type NavigationItem = Readonly<{
  external?: boolean;
  href: string;
  label: string;
  published?: boolean;
}>;

export const primaryNavigation = [
  { href: "/mission", label: "Mission" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/labs", label: "Labs" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
] as const satisfies readonly NavigationItem[];

export const secondaryNavigation = [
  { href: "/contact", label: "Contact" },
  { href: "/ethos", label: "Ethos" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/disclosures", label: "Responsible Disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/rss.xml", label: "RSS" },
  {
    external: true,
    href: "https://github.com/syntralock/astoncyber-site",
    label: "GitHub",
  },
] as const satisfies readonly NavigationItem[];

export function getPublishedNavigationItems<
  const Items extends readonly NavigationItem[],
>(items: Items) {
  return items.filter(
    (item) => !("published" in item) || item.published !== false,
  );
}

export function isNavigationItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
