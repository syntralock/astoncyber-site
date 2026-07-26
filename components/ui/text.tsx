import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { classNames } from "@/lib/class-names";

const textVariants = {
  body: "type-body",
  bodyLarge: "type-body-lg",
  caption: "type-caption",
  code: "type-code",
  eyebrow: "type-eyebrow",
  lead: "type-lead",
  small: "type-small",
} as const;

type TextElement = "div" | "p" | "span";
type TextVariant = keyof typeof textVariants;

type TextProps = Readonly<{
  as?: TextElement;
  children: ReactNode;
  className?: string;
  variant?: TextVariant;
}> &
  Omit<ComponentPropsWithoutRef<"p">, "children" | "className">;

export function Text({
  as = "p",
  children,
  className,
  variant = "body",
  ...props
}: TextProps) {
  const Element = as as ElementType;

  return (
    <Element
      className={classNames(textVariants[variant], className)}
      {...props}
    >
      {children}
    </Element>
  );
}
