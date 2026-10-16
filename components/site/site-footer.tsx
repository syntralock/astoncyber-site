import Link from "next/link";

import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/container";
import { externalLinkProps } from "@/lib/external-link";
import {
  getPublishedNavigationItems,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div className="footer-identity stack-sm">
          <Link className="brand-link" href="/" aria-label="Aston Cyber home">
            <Brand />
          </Link>
          <p className="type-small text-foreground-secondary">
            Modern Technology. Intelligent Operations. Secure by Design.
          </p>
        </div>

        <nav className="footer-navigation" aria-label="Footer primary">
          <ul className="footer-navigation-list">
            {getPublishedNavigationItems(primaryNavigation).map(
              ({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <nav className="footer-navigation" aria-label="Footer secondary">
          <ul className="footer-navigation-list">
            {getPublishedNavigationItems(secondaryNavigation).map(
              ({ external, href, label }) => (
                <li key={href}>
                  {external ? (
                    <a href={href} {...externalLinkProps}>
                      {label}
                    </a>
                  ) : (
                    <Link href={href}>{label}</Link>
                  )}
                </li>
              ),
            )}
          </ul>
        </nav>

        <p className="footer-copyright type-caption text-foreground-muted">
          © {new Date().getFullYear()} Aston Cyber
        </p>
      </Container>
    </footer>
  );
}
