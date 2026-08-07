import Image from "next/image";

type BrandProps = Readonly<{
  className?: string;
}>;

export function Brand({ className = "" }: BrandProps) {
  return (
    <span className={`brand-mark ${className}`}>
      <Image
        alt=""
        className="brand-logo"
        height="42"
        src="/brand/aston-cyber-logo-dark.svg"
        width="120"
      />
    </span>
  );
}
