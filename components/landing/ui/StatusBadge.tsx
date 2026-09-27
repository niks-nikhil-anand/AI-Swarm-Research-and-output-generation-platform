import { statusTones, type RunStatus } from "../data/tones";

export function StatusBadge({
  status,
  className = "px-[7px] tracking-[0.06em]",
}: {
  status: RunStatus;
  /** Horizontal padding + letter-spacing; defaults match the hero graph nodes. */
  className?: string;
}) {
  const tone = statusTones[status];
  return (
    <span className={`rounded-full border py-0.5 font-code text-[10px] ${tone.badge} ${className}`}>
      {tone.label}
    </span>
  );
}

export function ProgressBar({
  status,
  pct,
  thick = false,
}: {
  status: RunStatus;
  pct: number;
  thick?: boolean;
}) {
  const h = thick ? "h-1" : "h-[3px]";
  return (
    <div className={`${h} grow overflow-hidden rounded-full bg-line`}>
      <div className={`${h} ${statusTones[status].bar}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
