import Link from "next/link";

import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/container";
import { NavigationLinks } from "@/components/site/navigation-links";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <Link className="brand-link" href="/" aria-label="Aston Cyber home">
          <Brand />
        </Link>

        <nav className="desktop-navigation" aria-label="Primary">
          <NavigationLinks />
        </nav>

        <details className="mobile-navigation">
          <summary className="type-navigation">Menu</summary>
          <nav className="mobile-navigation-panel" aria-label="Primary mobile">
            <NavigationLinks />
          </nav>
        </details>
      </Container>
    </header>
  );
}
