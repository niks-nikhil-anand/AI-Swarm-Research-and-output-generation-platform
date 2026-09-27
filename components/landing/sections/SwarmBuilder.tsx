import { builderAddItems, routes } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { IconTile } from "../ui/Card";
import { Tag } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { WindowFrame } from "../ui/WindowFrame";

const node = "absolute flex w-[176px] flex-col justify-center gap-0.5 rounded-xl border bg-panel px-3.5";

function BuilderCanvas() {
  return (
    <div className="relative h-[440px] w-[600px] shrink-0">
      <svg width="600" height="440" viewBox="0 0 600 440" fill="none" className="absolute inset-0" aria-hidden="true">
        <g stroke="rgba(124,111,247,0.55)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-flow">
          <path d="M300 68 C300 110 88 108 88 150" />
          <path d="M300 68 L300 150" />
          <path d="M300 68 C300 110 512 108 512 150" />
          <path d="M88 206 C88 244 300 242 300 280" />
          <path d="M300 206 L300 280" />
          <path d="M512 206 C512 244 300 242 300 280" />
          <path d="M300 332 L300 380" />
        </g>
      </svg>
      <div className="absolute top-5 left-[200px] flex h-12 w-[200px] items-center justify-center rounded-xl border border-brand/45 bg-panel-2 text-sm font-medium">
        Orchestrator
      </div>
      <div className={`${node} top-[150px] left-0 h-14 border-brand shadow-[0_0_0_4px_rgba(124,111,247,0.18)]`}>
        <span className="text-sm font-medium">Research</span>
        <span className="font-code text-[10.5px] text-brand-soft">selected</span>
      </div>
      <div className={`${node} top-[150px] left-[212px] h-14 border-line`}>
        <span className="text-sm font-medium">Coding</span>
        <span className="font-code text-[10.5px] text-dim">github · sandbox</span>
      </div>
      <div className={`${node} top-[150px] left-[424px] h-14 border-line`}>
        <span className="text-sm font-medium">Analyst</span>
        <span className="font-code text-[10.5px] text-dim">csv · sql</span>
      </div>
      <div className={`${node} top-[280px] left-[212px] h-[52px] border-line`}>
        <span className="text-sm font-medium">Reviewer</span>
        <span className="font-code text-[10.5px] text-dim">if fail → retry ×2</span>
      </div>
      <div className="absolute top-[380px] left-[212px] flex h-11 w-[176px] items-center justify-center rounded-xl border border-dashed border-mint/35 bg-mint/6 font-code text-xs text-mint">
        output · report.md
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[13px] text-fg-2">
      {label}
      <span className="font-code text-xs text-brand-soft">{value}</span>
    </div>
  );
}

function Inspector() {
  return (
    <div className="flex flex-col gap-[18px] border-t border-white/10 p-5 xl:w-[300px] xl:shrink-0 xl:border-t-0 xl:border-l">
      <div className="flex items-center gap-2.5">
        <IconTile className="size-8 rounded-[10px] bg-brand/10">
          <Icon d={icons.search} strokeWidth={1.5} className="text-brand" />
        </IconTile>
        <div className="flex flex-col">
          <span className="text-[15px] font-medium">Research Agent</span>
          <span className="font-code text-[10.5px] text-dim">node · research_1</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-muted">
        Instructions
        <span className="rounded-xl border border-white/10 bg-panel px-3 py-2.5 text-[13px] leading-normal text-fg-2">
          Find primary sources only. Attach a URL to every claim.
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-muted">
        Tools
        <div className="flex gap-1.5">
          <Tag className="text-fg-2">web-search</Tag>
          <Tag className="text-fg-2">browser</Tag>
          <span className="rounded-[5px] border border-dashed border-white/15 px-2 py-[3px] font-code text-[10.5px] text-dim">
            + add
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[13px] text-fg-2">
        Project memory
        <span role="img" aria-label="On" className="relative h-5 w-9 rounded-full bg-brand-strong">
          <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-white" />
        </span>
      </div>
      <SettingRow label="Max retries" value="2" />
      <SettingRow label="Output" value="brief.md" />
    </div>
  );
}

export function SwarmBuilder() {
  return (
    <Section>
      <SectionHeader
        eyebrow="SWARM BUILDER"
        title={
          <>
            Build your own <Accent>AI workforce.</Accent>
          </>
        }
        description="Drag agents onto a canvas, wire their hand-offs, attach tools and memory, and set what counts as done."
      />

      <WindowFrame
        className="mt-12 xl:h-[580px]"
        title={
          <>
            <span className="grow truncate font-code text-xs text-fg-2">market-research.swarm</span>
            <span className="hidden font-code text-[11px] text-dim sm:inline">est. 44 credits / run</span>
            <a
              href={routes.start}
              className="rounded-[10px] bg-brand-strong px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-white hover:bg-brand"
            >
              Run Swarm
            </a>
          </>
        }
      >
        <div className="flex grow flex-col xl:flex-row">
          <div className="hidden w-[200px] shrink-0 flex-col gap-2 border-r border-white/10 px-4 py-5 xl:flex">
            <span className="mb-1 font-code text-[11px] tracking-[0.12em] text-dim">ADD</span>
            {builderAddItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-10 items-center gap-2.5 rounded-[10px] border border-white/10 bg-transparent px-3 text-left text-[13px] text-fg-2 hover:border-brand/30"
              >
                <Icon d={icons.plus} size={14} strokeWidth={1.8} className="text-brand-soft" />
                {item}
              </button>
            ))}
          </div>
          <div className="flex grow items-center overflow-x-auto bg-dots py-6 xl:justify-center xl:py-0">
            <div className="mx-auto px-4">
              <BuilderCanvas />
            </div>
          </div>
          <Inspector />
        </div>
      </WindowFrame>
    </Section>
  );
}
