import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

type ButtonProps = Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  }
>;

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        variant === "primary" ? "button-primary" : "button-secondary",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
