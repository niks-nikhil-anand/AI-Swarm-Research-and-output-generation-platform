import { steps } from "../data/content";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeader
        eyebrow="HOW IT WORKS"
        title={
          <>
            From idea to <Accent>finished result.</Accent>
          </>
        }
        description="Four steps. You write the goal; the swarm handles the plan, the hand-offs and the review."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.n} className="p-6 lg:h-[340px]">
            <span className="font-code text-xs text-brand">{s.n}</span>
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
