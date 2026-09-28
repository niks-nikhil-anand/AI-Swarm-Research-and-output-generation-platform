import { Fragment } from "react";
import { controlItems, postingFlow } from "../data/content";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function InControl() {
  return (
    <Section id="control">
      <SectionHeader
        eyebrow="YOU STAY IN CONTROL"
        title={
          <>
            Every step visible. <Accent>Every action approved.</Accent>
          </>
        }
        description="The agents do the work. You make the calls: nothing leaves the workspace without your approval, and everything they produce is yours."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card className="p-6 sm:p-9">
          <SectionHeader
            as="h3"
            eyebrow="COMMUNITY & SOCIAL"
            size="sm"
            title={
              <>
                Drafts only. <Accent>You post.</Accent>
              </>
            }
          />
          <p className="mt-3 text-[15px] leading-[1.7] text-muted">
            Reddit, Product Hunt, Hacker News, LinkedIn, X and email all work the same way. No
            auto-posting and no fake accounts. Getting banned is the opposite of a launch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 lg:mt-auto">
            {postingFlow.map((step, i) => (
              <Fragment key={step.label}>
                <Chip tone={step.tone} className="px-3 py-[7px] text-xs">
                  {step.label}
                </Chip>
                {i < postingFlow.length - 1 && <span className="text-faint">→</span>}
              </Fragment>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {controlItems.map((s) => (
            <Card key={s.name} direction="row" className="gap-4 p-6">
              <IconTile>
                <Icon d={s.icon} size={20} strokeWidth={1.5} className="text-brand" />
              </IconTile>
              <div className="flex flex-col gap-1.5">
                <span className="text-[15px] font-medium text-fg">{s.name}</span>
                <span className="text-[13px] leading-[1.55] text-muted">{s.body}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
