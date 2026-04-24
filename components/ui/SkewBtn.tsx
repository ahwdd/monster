// src/components/ui/SkewButton.tsx
"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "default";

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
};

export default function SkewButton({
  children,
  variant = "primary",
  href,
  onClick,
  disabled,
  type = "button",
  className = "",
  external,
}: Props) {
  const cls = variant === "primary" ? "skew-btn-primary" : "skew-btn-default";

  const inner = (
    <span
      className={`${cls} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <span className="btn-text">{children}</span>
    </span>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return <Link href={href}>{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
