import { engineChains, enginePillars } from "../data/content";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Chip, Tag } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const chainHeads = ["AGENT", "SKILL", "TOOL", "RESULT"];

function chainTone(i: number) {
  if (i === 0) return "brand" as const;
  if (i === chainHeads.length - 1) return "mint" as const;
  return "neutral" as const;
}

export function Engine() {
  return (
    <Section id="engine">
      <SectionHeader
        eyebrow="POWERED BY AI SWARM"
        title={
          <>
            Agents are roles. <Accent>Skills are capabilities.</Accent>
          </>
        }
        description="Tools do the actual work. New clouds, payment providers and frameworks arrive as skills an agent loads, not as hundreds of hard-coded agents."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {enginePillars.map((p) => (
          <Card key={p.name} className="p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <IconTile>
                <Icon d={p.icon} size={20} strokeWidth={1.5} className="text-brand" />
              </IconTile>
              <span className="text-[17px] font-medium text-fg">{p.name}</span>
            </div>
            <span className="mt-3 text-[13px] leading-[1.55] text-muted">{p.body}</span>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.items.map((item) => (
                <Tag key={item} className="text-fg-2">
                  {item}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line">
        <div className="hidden grid-cols-4 gap-4 border-b border-line px-6 py-3 font-code text-[11px] tracking-[0.12em] text-dim lg:grid">
          {chainHeads.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {engineChains.map((chain) => (
          <div
            key={chain[0]}
            className="flex flex-wrap items-center gap-2.5 border-b border-line px-6 py-4 last:border-b-0 lg:grid lg:grid-cols-4 lg:gap-4"
          >
            {chain.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  <Chip tone={chainTone(i)} className="px-3 py-[7px] text-xs">
                    {step}
                  </Chip>
                  {i < chain.length - 1 && <span className="text-faint">→</span>}
                </span>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
