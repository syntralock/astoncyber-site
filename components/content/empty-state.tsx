import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { classNames } from "@/lib/class-names";

type EmptyStateProps = Readonly<{
  action?: ReactNode;
  className?: string;
  description: string;
  title: string;
}>;

export function EmptyState({
  action,
  className,
  description,
  title,
}: EmptyStateProps) {
  return (
    <section
      className={classNames("component-state stack-md", className)}
      aria-label={title}
    >
      <Heading level={3} variant="h4">
        {title}
      </Heading>
      <Text className="text-foreground-secondary">{description}</Text>
      {action ? <div>{action}</div> : null}
    </section>
  );
}
