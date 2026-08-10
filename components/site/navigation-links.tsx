"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import {
  closeNavigationDisclosure,
  getPublishedNavigationItems,
  isNavigationItemActive,
  primaryNavigation,
} from "@/lib/navigation";

type NavigationLinksProps = Readonly<{
  className?: string;
  onNavigate?: () => void;
}>;

type NavigationActionLinkProps = Readonly<{
  className?: string;
  href: string;
  label: string;
  onNavigate?: () => void;
}>;

export function NavigationLinks({
  className = "",
  onNavigate,
}: NavigationLinksProps) {
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
              onClick={onNavigate}
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
  onNavigate,
}: NavigationActionLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      aria-current={isNavigationItemActive(pathname, href) ? "page" : undefined}
      className={`button-secondary type-button-label ${className}`}
      href={href}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const closeDisclosure = useCallback(() => {
    closeNavigationDisclosure(disclosureRef.current);
  }, []);

  useEffect(() => {
    closeDisclosure();
  }, [closeDisclosure, pathname]);

  return (
    <details className="mobile-navigation" ref={disclosureRef}>
      <summary className="type-navigation">Menu</summary>
      <div className="mobile-navigation-panel">
        <nav aria-label="Primary mobile">
          <NavigationLinks onNavigate={closeDisclosure} />
        </nav>
        <NavigationActionLink
          className="mobile-contact-action"
          href="/contact"
          label="Contact"
          onNavigate={closeDisclosure}
        />
      </div>
    </details>
  );
}
