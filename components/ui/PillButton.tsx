import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sierra-green focus-visible:outline-offset-2 whitespace-nowrap";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-sierra-green text-white hover:bg-sierra-green-dark active:bg-sierra-green-dark",
  secondary:
    "bg-pair-pearl text-sierra-text-dark hover:bg-[#e8e7e3] hover:text-sierra-green",
  ghost:
    "bg-transparent text-sierra-text hover:bg-black/[0.04] hover:text-sierra-text-dark",
};

const sizeClass: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  sm: "h-8 px-3 text-xs",
};

export default function PillButton({
  variant = "primary",
  size = "md",
  href,
  iconLeft,
  iconRight,
  className = "",
  ariaLabel,
  children,
}: Props) {
  const cls = `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim();

  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("#");
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
