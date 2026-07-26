import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { classNames } from "@/lib/class-names";

type ErrorStateProps = Readonly<{
  action?: ReactNode;
  className?: string;
  description: string;
  title: string;
}>;

export function ErrorState({
  action,
  className,
  description,
  title,
}: ErrorStateProps) {
  return (
    <section
      className={classNames(
        "component-state component-error-state stack-md",
        className,
      )}
      aria-label={title}
      role="alert"
    >
      <Heading level={3} variant="h4">
        {title}
      </Heading>
      <Text className="text-foreground-secondary">{description}</Text>
      {action ? <div>{action}</div> : null}
    </section>
  );
}
