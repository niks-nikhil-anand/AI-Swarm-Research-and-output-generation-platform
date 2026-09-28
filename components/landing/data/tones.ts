// Tailwind class sets for agent run status and category hues.
// Kept as full literal class strings so Tailwind can detect them.

export type RunStatus = "run" | "done" | "wait";

export const statusTones: Record<
  RunStatus,
  { label: string; badge: string; card: string; bar: string }
> = {
  run: {
    label: "RUNNING",
    badge: "text-brand-soft bg-brand/10 border-brand/30",
    card: "border-brand/30",
    bar: "bg-brand-soft",
  },
  done: {
    label: "DONE",
    badge: "text-mint bg-mint/10 border-mint/30",
    card: "border-line",
    bar: "bg-mint",
  },
  wait: {
    label: "QUEUED",
    badge: "text-dim bg-transparent border-line",
    card: "border-line",
    bar: "bg-dim",
  },
};

export type Availability = "live" | "soon" | "later";

export const availabilityTones: Record<Availability, { label: string; badge: string }> = {
  live: { label: "LIVE", badge: "text-mint bg-mint/10 border-mint/30" },
  soon: { label: "SOON", badge: "text-brand-soft bg-brand/10 border-brand/30" },
  later: { label: "COMING LATER", badge: "text-dim bg-transparent border-line" },
};

export type Hue ="amber" | "pink" | "sky" | "mint" | "brand" | "dim";

export const hueTones: Record<
  Hue,
  { text: string; bg: string; tint: string; border: string }
> = {
  amber: { text: "text-amber", bg: "bg-amber", tint: "bg-amber/10", border: "border-amber/30" },
  pink: { text: "text-pink", bg: "bg-pink", tint: "bg-pink/10", border: "border-pink/30" },
  sky: { text: "text-sky", bg: "bg-sky", tint: "bg-sky/10", border: "border-sky/30" },
  mint: { text: "text-mint", bg: "bg-mint", tint: "bg-mint/10", border: "border-mint/30" },
  brand: { text: "text-brand-soft", bg: "bg-brand-soft", tint: "bg-brand/10", border: "border-brand/30" },
  dim: { text: "text-dim", bg: "bg-dim", tint: "bg-dim/10", border: "border-line" },
};
