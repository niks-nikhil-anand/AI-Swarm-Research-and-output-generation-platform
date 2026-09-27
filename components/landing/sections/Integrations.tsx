import { Fragment } from "react";
import { integrations, toolFlow } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Integrations() {
  return (
    <Section id="integrations">
      <SectionHeader
        eyebrow="TOOLS & INTEGRATIONS"
        title={
          <>
            Your agents work with the tools <Accent>you already use.</Accent>
          </>
        }
        description="Connect once per workspace. Each agent only gets the tools you give it."
      />

      <ul className="m-0 mt-12 grid list-none grid-cols-2 gap-5 p-0 sm:grid-cols-3 lg:grid-cols-6">
        {integrations.map((name) => (
          <li
            key={name}
            className="flex h-[72px] items-center justify-center rounded-2xl border border-line bg-panel font-code text-[13px] text-fg-2"
          >
            {name}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-line px-4 py-6 lg:h-24 lg:py-0">
        {toolFlow.map((step, i) => (
          <Fragment key={step.label}>
            <Chip tone={step.highlight ? "brand" : "neutral"} className="px-3.5 py-2 text-xs">
              {step.label}
            </Chip>
            {i < toolFlow.length - 1 && <Icon d={icons.arrowRight} className="text-faint" />}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
