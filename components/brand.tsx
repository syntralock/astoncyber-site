type BrandProps = Readonly<{
  className?: string;
}>;

export function Brand({ className = "" }: BrandProps) {
  return (
    <span
      className={`inline-flex min-h-11 items-center font-display text-xl font-semibold tracking-tight text-foreground ${className}`}
      aria-label="Aston Cyber"
    >
      Aston Cyber
    </span>
  );
}
