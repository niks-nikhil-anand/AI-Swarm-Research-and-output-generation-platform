import type { ReactNode } from "react";

type WindowFrameProps = {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  barClassName?: string;
};

export function TrafficLights() {
  return (
    <div className="flex gap-[7px]" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-dot" />
      <span className="size-2.5 rounded-full bg-dot" />
      <span className="size-2.5 rounded-full bg-dot" />
    </div>
  );
}

/** Dark app-window chrome with traffic lights; `title` fills the rest of the bar. */
export function WindowFrame({ title, children, className = "", barClassName = "h-11 px-[18px]" }: WindowFrameProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-code shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className={`flex shrink-0 items-center gap-4 border-b border-white/10 ${barClassName}`}>
        <TrafficLights />
        {title}
      </div>
      {children}
    </div>
  );
}
