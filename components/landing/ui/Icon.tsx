type IconProps = {
  d: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** 24×24 stroke icon; colour comes from `currentColor` (set via text-* classes). */
export function Icon({ d, size = 16, strokeWidth = 1.6, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path d={d} />
    </svg>
  );
}
