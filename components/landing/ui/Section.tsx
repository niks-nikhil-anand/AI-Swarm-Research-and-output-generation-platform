import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Standard page band: top hairline, 96px top padding, 1440px content column. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line/60">
      <div className={`mx-auto max-w-[1440px] px-5 pt-16 pb-20 sm:px-8 lg:pt-24 lg:pb-28 ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-5 sm:px-8 ${className}`}>{children}</div>;
}
