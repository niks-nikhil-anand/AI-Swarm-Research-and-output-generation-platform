import { caseStudies } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const metaLabel = "font-code text-[10px] tracking-[0.1em]";

export function CaseStudies() {
  return (
    <Section>
      <SectionHeader
        eyebrow="CASE STUDIES"
        title={
          <>
            What teams are building <Accent>with AI Swarm.</Accent>
          </>
        }
        description="Real workflows from real users, published with their permission and their numbers."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((c) => (
          <Card key={c.title} className="p-7 lg:h-[380px]">
            <span className="font-code text-[11px] tracking-[0.08em] text-dim">{c.tag}</span>
            <span className="mt-3 text-lg font-medium text-fg">{c.title}</span>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-xl border border-line p-3.5">
                <span className={`${metaLabel} text-dim`}>BEFORE</span>
                <span className="font-display text-[22px] text-fg">[HOURS]</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-mint/30 p-3.5">
                <span className={`${metaLabel} text-mint`}>AFTER</span>
                <span className="font-display text-[22px] text-fg">[MINUTES]</span>
              </div>
            </div>
            <span className={`${metaLabel} mt-5 text-dim`}>WORKFLOW</span>
            <span className="mt-2 font-code text-xs leading-[1.6] text-fg-2">{c.flow}</span>
            <a href="#" className="mt-6 text-[13px] font-medium text-brand-soft hover:text-fg lg:mt-auto">
              Read the Case Study →
            </a>
          </Card>
        ))}

        <Card variant="accent" className="p-7 lg:h-[380px]">
          <Icon d={icons.quote} size={28} strokeWidth={1.5} className="text-brand" />
          <p className="mt-5 font-display text-xl leading-normal text-fg">
            [A real quote from a user who shipped with AI Swarm. One or two sentences about the job it did.]
          </p>
          <div className="mt-8 flex items-center gap-3 lg:mt-auto">
            <span className="size-10 rounded-full border border-dashed border-white/15 bg-line" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">[NAME]</span>
              <span className="font-code text-[11px] text-dim">[ROLE · COMPANY]</span>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
