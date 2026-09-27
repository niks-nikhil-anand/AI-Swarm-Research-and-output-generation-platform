import type { ReactNode } from "react";
import { icons } from "../data/icons";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-strong text-white shadow-[0_8px_24px_rgba(124,111,247,0.3)] hover:bg-brand",
  secondary: "border border-brand/30 text-brand-soft hover:border-brand/60 hover:text-fg",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "px-7 py-3.5",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl text-[15px] font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <Icon d={icons.arrowRight} size={15} strokeWidth={1.8} />}
    </a>
  );
}

/** Inline text link with trailing arrow ("Browse All Swarms →"). */
export function ArrowLink({ href, children, className = "text-[15px]" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 font-medium text-brand-soft transition-colors hover:text-fg ${className}`}
    >
      {children}
      <Icon d={icons.arrowRight} size={15} strokeWidth={1.8} />
    </a>
  );
}
