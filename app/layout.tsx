import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/ibm-plex-sans";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/lora";
import "@/styles/globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StructuredData } from "@/components/structured-data";
import {
  absoluteSiteUrl,
  createPageMetadata,
  founderId,
  founderProfileUrl,
  siteDescription,
  siteName,
  siteOrigin,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    description: siteDescription,
    pathname: "/",
    title: siteName,
  }),
  applicationName: siteName,
  metadataBase: new URL(siteOrigin),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  icons: {
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon.ico", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#2e2e2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@id": `${siteOrigin}/#organization`,
                "@type": "Organization",
                description: siteDescription,
                founder: {
                  "@id": founderId,
                  "@type": "Person",
                  name: "Matt Aston",
                  url: founderProfileUrl,
                },
                logo: absoluteSiteUrl("/brand/aston-cyber-logo.svg"),
                name: siteName,
                url: absoluteSiteUrl("/"),
              },
              {
                "@id": `${siteOrigin}/#website`,
                "@type": "WebSite",
                description: siteDescription,
                inLanguage: "en-US",
                name: siteName,
                publisher: { "@id": `${siteOrigin}/#organization` },
                url: absoluteSiteUrl("/"),
              },
            ],
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
