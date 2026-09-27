import type { ReactNode } from "react";

type ChipTone = "neutral" | "muted" | "brand" | "mint";

const tones: Record<ChipTone, string> = {
  neutral: "border-line bg-ink text-fg-2",
  muted: "border-line bg-ink text-muted",
  brand: "border-brand/30 bg-brand/10 text-brand-soft",
  mint: "border-mint/35 bg-mint/8 text-mint",
};

/** Monospace node label used in flow diagrams (You → Planner → …). */
export function Chip({
  children,
  tone = "neutral",
  className = "px-3.5 py-2.5 text-xs",
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span className={`rounded-lg border font-code whitespace-nowrap ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Small grey tool tag (web-search, browser, …). */
export function Tag({ children, className = "text-muted" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`rounded-[5px] bg-line px-2 py-[3px] font-code text-[10.5px] ${className}`}>
      {children}
    </span>
  );
}
