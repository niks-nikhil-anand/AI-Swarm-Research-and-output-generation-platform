import type { ReactNode } from "react";

/** Italic highlighted phrase inside serif headings. */
export function Accent({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return <em className={strong ? "text-brand" : "text-brand-soft"}>{children}</em>;
}
