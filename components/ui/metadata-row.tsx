import type { ReactNode } from "react";

import { classNames } from "@/lib/class-names";

export type MetadataItem = Readonly<{
  label: string;
  value: ReactNode;
}>;

type MetadataRowProps = Readonly<{
  className?: string;
  items: readonly MetadataItem[];
}>;

export function MetadataRow({ className, items }: MetadataRowProps) {
  return (
    <dl className={classNames("metadata-row", className)}>
      {items.map(({ label, value }) => (
        <div className="metadata-item" key={label}>
          <dt className="type-caption text-foreground-muted">{label}</dt>
          <dd className="type-small text-foreground-secondary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
