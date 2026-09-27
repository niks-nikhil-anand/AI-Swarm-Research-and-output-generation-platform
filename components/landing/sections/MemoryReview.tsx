import { Fragment } from "react";
import { memoryTree, reviewChain, reviewChecks } from "../data/content";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

function chainTone(label: string) {
  if (label === "Reviewer") return "brand" as const;
  if (label === "Output") return "mint" as const;
  return "neutral" as const;
}

export function MemoryReview() {
  return (
    <Section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card className="p-6 sm:p-9 lg:h-[568px]">
        <SectionHeader
          as="h3"
          eyebrow="MEMORY"
          size="sm"
          title={
            <>
              Give your swarm context <Accent>that lasts.</Accent>
            </>
          }
        />
        <p className="mt-3 text-[15px] leading-[1.7] text-muted">
          Agents work from project knowledge, past runs, documents and your standing instructions,
          instead of starting from zero every time.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-code p-6 font-code text-[13px] leading-[2] text-fg-2 lg:mt-auto">
          <div className="text-brand-soft">project/</div>
          {memoryTree.map((row) => (
            <div key={row.name} className="whitespace-pre">
              {`${row.branch} ${row.name.padEnd(18)}`}
              <span className="text-dim">{row.note}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-9 lg:h-[568px]">
        <SectionHeader
          as="h3"
          eyebrow="REVIEW"
          size="sm"
          title={
            <>
              Let agents <Accent>check the work.</Accent>
            </>
          }
        />
        <p className="mt-3 text-[15px] leading-[1.7] text-muted">
          Review is a step in the workflow, not a promise that AI is always right. Reviewers catch
          gaps and send tasks back; you still make the call.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2">
          {reviewChain.map((label, i) => (
            <Fragment key={label}>
              <Chip tone={chainTone(label)} className="px-3 py-[7px] text-xs">
                {label}
              </Chip>
              {i < reviewChain.length - 1 && <span className="text-faint">→</span>}
            </Fragment>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-auto">
          {reviewChecks.map((c) => (
            <div
              key={c.label}
              className="flex h-[52px] items-center gap-2.5 rounded-xl border border-line bg-ink px-4 text-sm text-fg"
            >
              <Icon d={c.icon} strokeWidth={2} className="text-mint" />
              {c.label}
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
