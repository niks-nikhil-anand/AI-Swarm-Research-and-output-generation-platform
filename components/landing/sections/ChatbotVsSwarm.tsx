import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { CheckItem } from "../ui/CheckItem";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

function Arrow({ brand = false, size = 16 }: { brand?: boolean; size?: number }) {
  return <Icon d={icons.arrowRight} size={size} className={brand ? "text-brand" : "text-faint"} />;
}

export function ChatbotVsSwarm() {
  return (
    <Section>
      <SectionHeader
        eyebrow="NOT ANOTHER CHATBOT"
        title={
          <>
            One AI can answer. <Accent>A swarm can work.</Accent>
          </>
        }
        description="Complex work is several jobs in a trench coat. AI Swarm splits a goal across specialized agents, runs them in parallel on shared context, and combines what they produce into one result."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-8 lg:h-[360px]">
          <div className="font-code text-xs tracking-[0.08em] text-dim">SINGLE ASSISTANT</div>
          <div className="my-8 flex flex-wrap items-center gap-3.5 lg:my-0 lg:mt-10 lg:h-[120px]">
            <Chip tone="muted" className="px-4 py-2.5 text-xs">You</Chip>
            <Arrow size={18} />
            <Chip tone="muted" className="px-4 py-2.5 text-xs">One model</Chip>
            <Arrow size={18} />
            <Chip tone="muted" className="px-4 py-2.5 text-xs">Answer</Chip>
          </div>
          <div className="mt-auto flex flex-col gap-2.5 text-[15px] text-muted">
            <span>One context window doing every job</span>
            <span>One pass, no second opinion</span>
            <span>You stitch the pieces together yourself</span>
          </div>
        </Card>

        <Card variant="glow" className="p-6 sm:p-8 lg:h-[360px]">
          <div className="font-code text-xs tracking-[0.08em] text-brand-soft">AI SWARM</div>
          <div className="my-8 flex flex-wrap items-center gap-3 lg:my-0 lg:mt-10 lg:h-[120px]">
            <Chip>You</Chip>
            <Arrow brand />
            <Chip tone="brand">Planner</Chip>
            <Arrow brand />
            <div className="flex flex-col gap-1.5">
              {["Research", "Analysis", "Execution"].map((s) => (
                <Chip key={s} className="px-3 py-1.5 text-[11px]">
                  {s}
                </Chip>
              ))}
            </div>
            <Arrow brand />
            <Chip>Review</Chip>
            <Arrow brand />
            <Chip tone="mint">Result</Chip>
          </div>
          <div className="mt-auto flex flex-col gap-2.5 text-[15px] text-fg">
            <CheckItem>Tasks split across specialist agents</CheckItem>
            <CheckItem>Parallel work on shared project context</CheckItem>
            <CheckItem>A reviewer checks output before you see it</CheckItem>
          </div>
        </Card>
      </div>
    </Section>
  );
}
