import { footerColumns } from "../data/content";
import { LogoMark } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-16 pb-8 sm:px-8 lg:min-h-[380px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-3.5 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[15px] font-medium">AI Swarm</span>
            </div>
            <p className="m-0 max-w-[280px] text-[13px] leading-[1.65] text-muted">
              Your AI startup team: research, design, build, deploy, market and launch your SaaS.
            </p>
            <a href="#" className="font-code text-xs text-brand-soft hover:text-fg">
              Built by DevKit Market →
            </a>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-2.5">
              <span className="font-code text-xs tracking-[0.08em] text-dim">{col.heading}</span>
              {col.links.map((link) => (
                <a key={link} href="#" className="text-[13px] text-muted hover:text-fg">
                  {link}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line pt-5 font-code text-[11px] text-dim sm:flex-row lg:mt-auto">
          <span>© 2026 AI Swarm · a DevKit Market product</span>
          <span>Built by a developer · for developers</span>
        </div>
      </div>
    </footer>
  );
}
