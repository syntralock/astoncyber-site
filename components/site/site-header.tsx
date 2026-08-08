import Link from "next/link";

import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/container";
import {
  NavigationActionLink,
  NavigationLinks,
} from "@/components/site/navigation-links";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <Link className="brand-link" href="/" aria-label="Aston Cyber home">
          <Brand />
        </Link>

        <div className="site-header-actions">
          <nav className="desktop-navigation" aria-label="Primary">
            <NavigationLinks />
          </nav>
          <NavigationActionLink
            className="desktop-contact-action"
            href="/contact"
            label="Contact"
          />

          <details className="mobile-navigation">
            <summary className="type-navigation">Menu</summary>
            <div className="mobile-navigation-panel">
              <nav aria-label="Primary mobile">
                <NavigationLinks />
              </nav>
              <NavigationActionLink
                className="mobile-contact-action"
                href="/contact"
                label="Contact"
              />
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
