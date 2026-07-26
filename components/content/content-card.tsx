import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { classNames } from "@/lib/class-names";

type ContentCardProps = Readonly<{
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  href: string;
  linkLabel?: string;
  summary: string;
  title: string;
  variant?: "default" | "featured";
}>;

export function ContentCard({
  children,
  className,
  eyebrow,
  href,
  linkLabel = "Read item",
  summary,
  title,
  variant = "default",
}: ContentCardProps) {
  return (
    <article
      className={classNames(
        "content-card stack-md",
        variant === "featured" && "content-card-featured",
        className,
      )}
    >
      {eyebrow ? (
        <Text className="text-foreground-muted" variant="eyebrow">
          {eyebrow}
        </Text>
      ) : null}
      <div className="stack-sm">
        <Heading level={3}>
          <Link className="content-card-title-link" href={href}>
            {title}
          </Link>
        </Heading>
        <Text className="text-foreground-secondary">{summary}</Text>
      </div>
      {children}
      <Link href={href} variant="standalone">
        {linkLabel}
      </Link>
    </article>
  );
}
