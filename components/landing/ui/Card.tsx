import type { ReactNode } from "react";

const cardVariants = {
  default: "border-line",
  accent: "border-brand/30",
  glow: "border-brand/30 shadow-[0_0_50px_rgba(124,111,247,0.12)]",
};

/** Base panel surface: #111118 with hairline border and 16px radius. */
export function Card({
  children,
  className = "p-6",
  variant = "default",
  direction = "col",
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof cardVariants;
  direction?: "row" | "col";
}) {
  return (
    <div
      className={`flex rounded-2xl border bg-panel ${direction === "row" ? "flex-row" : "flex-col"} ${
        cardVariants[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Square icon tile (40×40 by default) with tinted background. */
export function IconTile({
  children,
  className = "size-10 rounded-xl bg-brand/10",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`flex shrink-0 items-center justify-center ${className}`}>{children}</span>;
}
