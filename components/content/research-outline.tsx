import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { headingId, type ResearchHeading } from "@/lib/content/headings";

export function ResearchOutline({
  headings,
}: Readonly<{ headings: readonly ResearchHeading[] }>) {
  const sections = headings.filter((heading) => heading.level === 2);
  if (sections.length < 2) {
    return null;
  }

  return (
    <nav
      aria-labelledby="report-contents-title"
      className="research-outline surface-base stack-md"
    >
      <Heading id="report-contents-title" level={2} variant="h3">
        In this report
      </Heading>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type ResearchMdxHeadingProps = ComponentPropsWithoutRef<"h2"> &
  Readonly<{ children?: ReactNode }>;

export function ResearchMdxHeading({
  children,
  ...props
}: ResearchMdxHeadingProps) {
  const title = typeof children === "string" ? children : "";
  return (
    <h2 id={headingId(title)} {...props}>
      {children}
    </h2>
  );
}

export function ResearchMdxSubheading({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3"> & Readonly<{ children?: ReactNode }>) {
  const title = typeof children === "string" ? children : "";
  return (
    <h3 id={headingId(title)} {...props}>
      {children}
    </h3>
  );
}
