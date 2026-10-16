import Link from "next/link";

import { StructuredData } from "@/components/structured-data";
import { absoluteSiteUrl } from "@/lib/site-metadata";

type BreadcrumbItem = Readonly<{
  href?: string;
  label: string;
}>;

type BreadcrumbsProps = Readonly<{
  items: readonly BreadcrumbItem[];
  pathname: string;
}>;

export function Breadcrumbs({ items, pathname }: BreadcrumbsProps) {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(({ href, label }, index) => ({
            "@type": "ListItem",
            item: absoluteSiteUrl(href ?? pathname),
            name: label,
            position: index + 1,
          })),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map(({ href, label }, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li key={href ?? label}>
                {href && !isCurrent ? (
                  <Link href={href}>{label}</Link>
                ) : (
                  <span aria-current={isCurrent ? "page" : undefined}>
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
