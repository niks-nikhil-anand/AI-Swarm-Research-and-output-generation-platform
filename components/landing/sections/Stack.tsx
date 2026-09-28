import { stack, stackReasons } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { DeployFlows } from "./DeployFlows";
import { AvailabilityBadge } from "../ui/StatusBadge";

export function Stack() {
  return (
    <Section id="stack">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="OPINIONATED STACK"
          title={
            <>
              One stack, <Accent>tested end to end.</Accent>
            </>
          }
          description="Agents start from tested starter templates instead of re-deciding the architecture on every run. Optimized for modern web SaaS, not for everything."
        />
        <span className="flex items-center gap-2 self-start rounded-full border border-line bg-panel/60 px-3 py-[5px] font-code text-xs text-fg-2 lg:self-end">
          Bring your own repo
          <AvailabilityBadge value="soon" />
        </span>
      </div>

      <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {stack.map((s) => (
          <li
            key={s.k}
            className="flex h-[88px] flex-col justify-center gap-1.5 rounded-2xl border border-line bg-panel px-5"
          >
            <span className="font-code text-[11px] tracking-[0.08em] text-brand-soft">{s.k.toUpperCase()}</span>
            <span className="text-[13.5px] text-fg-2">{s.v}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-line px-4 py-6 lg:h-24 lg:py-0">
        <Chip tone="brand" className="px-3.5 py-2 text-xs">One known-good stack</Chip>
        <Icon d={icons.arrowRight} className="text-faint" />
        {stackReasons.map((r, i) => (
          <Chip key={r} tone={i === stackReasons.length - 1 ? "mint" : "neutral"} className="px-3.5 py-2 text-xs">
            {r}
          </Chip>
        ))}
      </div>

      <DeployFlows />
    </Section>
  );
}
