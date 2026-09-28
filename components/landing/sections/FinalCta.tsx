import { Fragment } from "react";
import { routes } from "../data/content";
import { Accent } from "../ui/Accent";
import { ButtonLink } from "../ui/ButtonLink";
import { Eyebrow } from "../ui/SectionHeader";

const corner = "absolute size-3.5 border-brand/50";
const flow = ["idea", "research", "design", "build", "deploy", "launch", "improve"];

export function FinalCta() {
  return (
    <section className="border-t border-line/60">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[28px] border border-line bg-panel bg-grid-brand px-6 py-16 shadow-[0_32px_80px_rgba(0,0,0,0.5)] lg:h-[492px] lg:py-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[120px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(124,111,247,0.22),transparent_70%)]"
          />
          <span aria-hidden="true" className={`${corner} top-5 left-5 border-t border-l`} />
          <span aria-hidden="true" className={`${corner} top-5 right-5 border-t border-r`} />
          <span aria-hidden="true" className={`${corner} bottom-5 left-5 border-b border-l`} />
          <span aria-hidden="true" className={`${corner} right-5 bottom-5 border-r border-b`} />

          <div className="relative">
            <Eyebrow>SAAS LAUNCH</Eyebrow>
          </div>
          <h2 className="relative mt-4 text-center font-display text-[38px] leading-[1.08] font-normal tracking-[-0.03em] lg:text-[58px]">
            Your AI <Accent strong>startup team.</Accent>
          </h2>
          <p className="relative mt-5 max-w-[520px] text-center text-base leading-[1.7] text-muted">
            Start with a free validation report today. Design, build, deploy and launch join the team as each stage ships.
          </p>
          <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.start}>Start with your idea →</ButtonLink>
            <ButtonLink href="#pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
          <div className="relative mt-11 flex flex-wrap items-center justify-center gap-2.5 font-code text-[11px] text-dim">
            {flow.map((step, i) => (
              <Fragment key={step}>
                <span className={i === flow.length - 1 ? "text-mint" : ""}>{step}</span>
                {i < flow.length - 1 && <span className="text-faint">→</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
