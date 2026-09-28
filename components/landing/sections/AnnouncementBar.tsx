import { routes } from "../data/content";

export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center gap-2 border-b border-line bg-brand/6 font-code text-[11px] text-muted sm:h-10 sm:gap-3 sm:text-xs">
      <span className="hidden rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] tracking-[0.08em] text-brand-soft sm:inline">
        BETA
      </span>
      <span className="sm:hidden">Private beta is open</span>
      <span className="hidden sm:inline">
        Validate and plan your SaaS with an AI team. Build &amp; Launch coming soon.
      </span>
      <a href={routes.start} className="text-brand-soft hover:text-fg">
        <span className="sm:hidden">Start →</span>
        <span className="hidden sm:inline">Start with your idea →</span>
      </a>
    </div>
  );
}
