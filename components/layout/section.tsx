import type { ReactNode } from "react";

type SectionProps = Readonly<{
  "aria-labelledby"?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}>;

export function Section({
  "aria-labelledby": ariaLabelledBy,
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      aria-labelledby={ariaLabelledBy}
      className={`section-space ${className}`}
      id={id}
    >
      {children}
    </section>
  );
}
