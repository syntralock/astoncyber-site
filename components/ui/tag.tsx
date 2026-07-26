import type { ReactNode } from "react";

import { Link } from "@/components/ui/link";
import { classNames } from "@/lib/class-names";

type TagProps = Readonly<{
  children: ReactNode;
  className?: string;
  href?: string;
}>;

export function Tag({ children, className, href }: TagProps) {
  if (href) {
    return (
      <Link className={classNames("component-tag", className)} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <span className={classNames("component-tag", className)}>{children}</span>
  );
}
