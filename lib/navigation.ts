export type NavigationItem = Readonly<{
  external?: boolean;
  href: string;
  label: string;
  published?: boolean;
}>;

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Our Approach" },
  { href: "/about", label: "About" },
] as const satisfies readonly NavigationItem[];

export const secondaryNavigation = [
  { href: "/contact", label: "Contact" },
  { href: "/research", label: "Research" },
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

export function closeNavigationDisclosure(
  disclosure: { open: boolean } | null,
) {
  if (disclosure) {
    disclosure.open = false;
  }
}
