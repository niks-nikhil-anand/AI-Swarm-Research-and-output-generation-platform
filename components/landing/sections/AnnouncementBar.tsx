import { routes } from "../data/content";

export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center gap-2 border-b border-line bg-brand/6 font-code text-[11px] text-muted sm:h-10 sm:gap-3 sm:text-xs">
      <span className="hidden rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] tracking-[0.08em] text-brand-soft sm:inline">
        NEW
      </span>
      <span className="sm:hidden">AI Swarm is live</span>
      <span className="hidden sm:inline">Multiple AI agents, one goal, one finished result</span>
      <a href={routes.start} className="text-brand-soft hover:text-fg">
        <span className="sm:hidden">Start free →</span>
        <span className="hidden sm:inline">Try AI Swarm →</span>
      </a>
    </div>
  );
}
