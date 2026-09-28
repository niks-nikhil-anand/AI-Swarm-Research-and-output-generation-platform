import { Fragment } from "react";
import { contextChain, stageAvailability, stages } from "../data/content";
import { hueTones } from "../data/tones";
import { Accent } from "../ui/Accent";
import { ArrowLink } from "../ui/ButtonLink";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Chip";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";

export function Stages() {
  return (
    <Section id="stages">
      <SectionHeader
        eyebrow="FIVE STAGES"
        title={
          <>
            Everything between the idea <Accent>and the growth.</Accent>
          </>
        }
        description="Each stage has its own team of agents and hands real files to the next. The research informs the spec, the spec drives the code, and both drive the marketing."
      />

      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 font-code text-[11px] tracking-[0.08em] text-dim">SHARED CONTEXT</span>
        {contextChain.map((label, i) => (
          <Fragment key={label}>
            <span
              className={`rounded-lg border px-3 py-[7px] font-code text-xs ${
                i === 0 ? "border-brand/30 bg-brand/10 text-brand-soft" : "border-line bg-ink text-fg-2"
              }`}
            >
              {label}
            </span>
            {i < contextChain.length - 1 && <span className="text-faint">→</span>}
          </Fragment>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
        {stages.map((s, i) => {
          const tone = hueTones[s.hue];
          return (
            <Card key={s.key} className={`p-7 lg:h-[440px] ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-2.5 py-[3px] font-code text-[11px] ${tone.text} ${tone.tint} ${tone.border}`}
                >
                  {s.n} · {s.name}
                </span>
                <AvailabilityBadge value={stageAvailability[s.key]} />
              </div>
              <span className="mt-4 text-[13px] leading-[1.55] text-muted">{s.summary}</span>
              <ol className="m-0 mt-[22px] flex list-none flex-col p-0">
                {s.deliverables.map((label, j) => (
                  <li key={label} className="flex min-h-9 items-center gap-3">
                    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full border border-brand/30 bg-ink font-code text-[10px] text-brand-soft">
                      {j + 1}
                    </span>
                    <span className="text-sm text-fg-2">{label}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 lg:mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {s.agents.map((a) => (
                    <Tag key={a}>{a}</Tag>
                  ))}
                </div>
                {s.sample && (
                  <ArrowLink href={s.sample.href} className="text-[13px]">
                    {s.sample.label}
                  </ArrowLink>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
