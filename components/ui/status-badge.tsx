import { classNames } from "@/lib/class-names";

const statusClasses = {
  active: "status-active",
  archived: "status-archived",
  completed: "status-completed",
  preliminary: "status-preliminary",
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
