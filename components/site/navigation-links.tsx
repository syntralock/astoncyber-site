"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getPublishedNavigationItems,
  isNavigationItemActive,
  primaryNavigation,
} from "@/lib/navigation";

type NavigationLinksProps = Readonly<{
  className?: string;
}>;

type NavigationActionLinkProps = Readonly<{
  className?: string;
  href: string;
  label: string;
}>;

export function NavigationLinks({ className = "" }: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={`navigation-list ${className}`}>
      {getPublishedNavigationItems(primaryNavigation).map(({ href, label }) => {
        const isActive = isNavigationItemActive(pathname, href);

        return (
          <li key={href}>
            <Link
              aria-current={isActive ? "page" : undefined}
              className="navigation-link type-navigation"
              href={href}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavigationActionLink({
  className = "",
  href,
  label,
}: NavigationActionLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      aria-current={isNavigationItemActive(pathname, href) ? "page" : undefined}
      className={`button-secondary type-button-label ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
}
