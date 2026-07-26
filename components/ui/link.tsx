import NextLink from "next/link";
import type { ReactNode } from "react";

import { externalLinkProps } from "@/lib/external-link";
import { classNames } from "@/lib/class-names";

const linkVariants = {
  default: "component-link",
  standalone: "text-link",
} as const;

type LinkProps = Readonly<{
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  href: string;
  newTab?: boolean;
  variant?: keyof typeof linkVariants;
}>;

export function Link({
  "aria-label": ariaLabel,
  children,
  className,
  external = false,
  href,
  newTab = external,
  variant = "default",
}: LinkProps) {
  const classes = classNames(linkVariants[variant], className);

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        {...(newTab ? externalLinkProps : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink aria-label={ariaLabel} className={classes} href={href}>
      {children}
    </NextLink>
  );
}
