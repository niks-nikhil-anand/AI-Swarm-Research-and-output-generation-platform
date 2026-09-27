import { readySwarms, routes } from "../data/content";
import { hueTones } from "../data/tones";
import { Accent } from "../ui/Accent";
import { ArrowLink } from "../ui/ButtonLink";
import { Card } from "../ui/Card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function ReadySwarms() {
  return (
    <Section id="swarms">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="READY-MADE SWARMS"
          title={
            <>
              Start with a workflow, <Accent>not a blank canvas.</Accent>
            </>
          }
          description="Pre-wired swarms for the jobs people run most. Fork one, change any step, save it as yours."
        />
        <ArrowLink href="#">Browse All Swarms</ArrowLink>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {readySwarms.map((s) => {
          const tone = hueTones[s.hue];
          return (
            <Card key={s.name} className="p-7 lg:h-[420px]">
              <span
                className={`self-start rounded-full border px-2.5 py-[3px] font-code text-[11px] ${tone.text} ${tone.tint} ${tone.border}`}
              >
                {s.cat}
              </span>
              <span className="mt-4 text-lg font-medium text-fg">{s.name}</span>
              <span className="mt-1.5 text-[13px] leading-[1.55] text-muted">{s.desc}</span>
              <ol className="m-0 mt-[22px] flex list-none flex-col p-0">
                {s.steps.map((label, i) => (
                  <li key={label} className="flex h-9 items-center gap-3">
                    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full border border-brand/30 bg-ink font-code text-[10px] text-brand-soft">
                      {i + 1}
                    </span>
                    <span className="text-sm text-fg-2">{label}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 lg:mt-auto">
                <span className="font-code text-[11px] text-dim">{s.meta}</span>
                <a href={routes.start} className="text-[13px] font-medium text-brand-soft hover:text-fg">
                  Use This Swarm →
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
