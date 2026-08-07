import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/ibm-plex-sans";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/lora";
import "@/styles/globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  applicationName: "Aston Cyber",
  title: {
    default: "Aston Cyber",
    template: "%s | Aston Cyber",
  },
  description:
    "Independent cybersecurity research, engineering, and education.",
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
  manifest: "/icons/site.webmanifest",
  robots: {
    follow: false,
    index: false,
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
