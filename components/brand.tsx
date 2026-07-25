type BrandProps = Readonly<{
  className?: string;
}>;

export function Brand({ className = "" }: BrandProps) {
  return (
    <span className={`brand-wordmark ${className}`} aria-label="Aston Cyber">
      Aston Cyber
    </span>
  );
}
