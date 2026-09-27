import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  as?: "h2" | "h3";
};

const headingSizes = {
  sm: "text-[24px] leading-[1.25] lg:text-[28px] lg:leading-[1.2]",
  md: "text-[30px] leading-[1.15] lg:text-[38px]",
  lg: "text-[36px] leading-[1.1] tracking-[-0.02em] lg:text-[48px]",
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-code text-[11px] tracking-[0.12em] text-brand">{children}</div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  as: Heading = "h2",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        className={`mt-3 font-display font-normal text-fg ${headingSizes[size]}`}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-muted">{description}</p>
      )}
    </div>
  );
}
