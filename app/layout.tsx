import type { Metadata } from "next";
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
  robots: {
    follow: false,
    index: false,
  },
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
