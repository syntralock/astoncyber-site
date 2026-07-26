import Link from "next/link";

type BreadcrumbItem = Readonly<{
  href?: string;
  label: string;
}>;

type BreadcrumbsProps = Readonly<{
  items: readonly BreadcrumbItem[];
}>;

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(({ href, label }, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={href ?? label}>
              {href && !isCurrent ? (
                <Link href={href}>{label}</Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
