import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { classNames } from "@/lib/class-names";

const headingVariants = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
  h4: "type-h4",
  hero: "type-hero",
} as const;

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingVariant = keyof typeof headingVariants;

type HeadingProps = Readonly<{
  children: ReactNode;
  className?: string;
  level: HeadingLevel;
  variant?: HeadingVariant;
}> &
  Omit<ComponentPropsWithoutRef<"h1">, "children" | "className">;

export function Heading({
  children,
  className,
  level,
  variant = `h${level}` as HeadingVariant,
  ...props
}: HeadingProps) {
  const Element = `h${level}` as ElementType;

  return (
    <Element
      className={classNames(headingVariants[variant], className)}
      {...props}
    >
      {children}
    </Element>
  );
}
