import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";

type CalloutProps = Readonly<{
  children: ReactNode;
  title?: string;
}>;

export function Callout({ children, title }: CalloutProps) {
  return (
    <aside className="surface-base stack-sm">
      {title ? (
        <Heading level={3} variant="h4">
          {title}
        </Heading>
      ) : null}
      <div className="type-body">{children}</div>
    </aside>
  );
}
