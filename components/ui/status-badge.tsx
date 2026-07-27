import { classNames } from "@/lib/class-names";

const statusClasses = {
  active: "status-active",
  archived: "status-archived",
  beta: "status-preliminary",
  completed: "status-completed",
  experimental: "status-preliminary",
  preliminary: "status-preliminary",
  prototype: "status-preliminary",
  published: "status-published",
  stable: "status-published",
  "technical-validation": "status-technical-validation",
} as const;

type StatusBadgeProps = Readonly<{
  className?: string;
  label?: string;
  status: keyof typeof statusClasses;
}>;

export function StatusBadge({ className, label, status }: StatusBadgeProps) {
  return (
    <span
      className={classNames(
        "component-status type-caption",
        statusClasses[status],
        className,
      )}
    >
      <span className="status-dot" aria-hidden="true" />
      {label ?? status}
    </span>
  );
}
