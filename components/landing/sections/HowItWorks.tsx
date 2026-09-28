import { Fragment } from "react";
import { howFlow, stageAvailability, steps } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";

function flowTone(i: number) {
  if (i === 1) return "brand" as const;
  if (i === howFlow.length - 1) return "mint" as const;
  return "neutral" as const;
}

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeader
        eyebrow="HOW IT WORKS"
        title={
          <>
            From idea to <Accent>launched SaaS.</Accent>
          </>
        }
        description="Describe the idea once. The AI product team validates it, plans it, builds it and prepares the launch, and you approve each step."
      />

      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        {howFlow.map((label, i) => (
          <Fragment key={label}>
            <Chip tone={flowTone(i)} className="px-3 py-[7px] text-xs">
              {label}
            </Chip>
            {i < howFlow.length - 1 && <Icon d={icons.arrowRight} size={14} className="text-faint" />}
          </Fragment>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.n} className="p-6 lg:h-[340px]">
            <div className="flex items-center justify-between">
              <span className="font-code text-xs text-brand">{s.n}</span>
              {s.stage && <AvailabilityBadge value={stageAvailability[s.stage]} />}
            </div>
            <span className="mt-3.5 text-lg font-medium text-fg">{s.title}</span>
            <span className="mt-2 text-[13px] leading-[1.55] text-muted">{s.body}</span>
            <div className="mt-6 h-[130px] rounded-xl border border-white/10 bg-code p-4 font-code text-xs leading-[1.8] whitespace-pre-line text-fg-2 lg:mt-auto">
              {s.code}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
