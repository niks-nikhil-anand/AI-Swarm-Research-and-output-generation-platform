import { isLive, routes } from "../data/content";
import { Accent } from "../ui/Accent";
import { ButtonLink } from "../ui/ButtonLink";
import { CheckItem } from "../ui/CheckItem";
import { HeroDemo } from "./HeroDemo";

const assurances = ["Free validation report", "No credit card", "You approve every step"];

// Only promise Build once it ships (POSITIONING §6).
const subhead = isLive("build")
  ? "Research your idea. Design it, build it and deploy it. Create the content, market it and launch it. Then keep improving it, all from one workspace."
  : "Validate the idea, research the market and write the spec today. Build and launch come next, all in one workspace.";

export function Hero() {
  return (
    <section id="product" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(124,111,247,0.18),transparent_70%)] lg:h-[420px] lg:w-[900px]"
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-12 pb-20 sm:px-8 lg:pt-24 lg:pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-[5px] font-code text-[11px] text-brand-soft lg:px-3.5 lg:py-1.5 lg:text-xs">
          <span className="size-1.5 animate-blink rounded-full bg-mint" />
          <span className="lg:hidden">AI SaaS Launch Platform</span>
          <span className="hidden lg:inline">AI SaaS Launch Platform · for solo founders</span>
        </div>

        <h1 className="mt-5 text-center font-display text-[40px] leading-[1.12] font-normal tracking-[-0.02em] text-fg lg:mt-6 lg:text-[68px] lg:leading-[1.1]">
          Launch your SaaS
          <br />
          <Accent>with an AI team.</Accent>
        </h1>

        <p className="mt-[18px] max-w-[620px] text-center text-base leading-[1.65] text-muted lg:mt-6 lg:text-[17px]">
          {subhead}
        </p>

        <div className="mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3 lg:mt-10">
          <ButtonLink href={routes.start} arrow className="h-12 px-7 sm:h-auto sm:py-3.5">
            Start with your idea
          </ButtonLink>
          <ButtonLink href="#how" variant="secondary" className="h-12 px-7 sm:h-auto sm:py-3.5">
            See how it works
          </ButtonLink>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 font-code text-[11px] text-dim lg:mt-5 lg:text-xs">
          {assurances.map((item) => (
            <CheckItem key={item} size={13} className="gap-1.5">
              {item}
            </CheckItem>
          ))}
        </div>

        <HeroDemo />
      </div>
    </section>
  );
}
