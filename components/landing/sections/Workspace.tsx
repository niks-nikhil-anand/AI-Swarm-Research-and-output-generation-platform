import { Fragment } from "react";
import { agentLoop, browserAbilities, ideFiles, ideTerminal, stageAvailability } from "../data/content";
import { Accent } from "../ui/Accent";
import { CheckItem } from "../ui/CheckItem";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";
import { WindowFrame } from "../ui/WindowFrame";

const panelLabel = "font-code text-[10.5px] tracking-[0.12em] text-dim";

const code = [
  <><span className="text-brand-soft">export default</span> <span className="text-brand-soft">function</span> <span className="text-sky">Pricing</span>() {"{"}</>,
  <>  <span className="text-brand-soft">const</span> plans = <span className="text-brand-soft">await</span> <span className="text-sky">getPlans</span>();</>,
  <>  <span className="text-brand-soft">return</span> &lt;<span className="text-mint">PlanGrid</span> plans={"{plans}"} /&gt;;</>,
  "}",
];

export function Workspace() {
  return (
    <Section id="workspace" className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <AvailabilityBadge value={stageAvailability.build} />
          <span className="font-code text-[11px] text-dim">ships with the Build stage</span>
        </div>
        <div className="mt-4">
          <SectionHeader
            eyebrow="BUILT-IN IDE & BROWSER"
            title={
              <>
                Agents that run <Accent>what they write.</Accent>
              </>
            }
            description="Every coding agent gets its own IDE, terminal, live preview and Chromium browser. It doesn't hand you code and hope. It runs it, looks at it, and fixes it."
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {agentLoop.map((step, i) => (
            <Fragment key={step}>
              <span
                className={`rounded-lg border px-3 py-[7px] font-code text-xs ${
                  i === agentLoop.length - 1
                    ? "border-mint/35 bg-mint/8 text-mint"
                    : "border-line bg-ink text-fg-2"
                }`}
              >
                {step}
              </span>
              {i < agentLoop.length - 1 && <span className="text-faint">→</span>}
            </Fragment>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] text-fg-2">
          {browserAbilities.map((a) => (
            <CheckItem key={a}>{a}</CheckItem>
          ))}
        </div>
      </div>

      <WindowFrame
        className="lg:h-[520px]"
        title={<span className="grow font-code text-xs text-fg-2">ai swarm ide · frontend agent</span>}
      >
        <div className="flex grow flex-col">
          <div className="flex grow">
            <div className="hidden w-[170px] shrink-0 border-r border-white/10 p-4 sm:block">
              <div className={panelLabel}>FILES</div>
              <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0 font-code text-xs">
                {ideFiles.map((f) => (
                  <li
                    key={f.name}
                    style={{ paddingLeft: f.depth * 14 }}
                    className={f.active ? "text-brand-soft" : f.name.endsWith("/") ? "text-fg-2" : "text-muted"}
                  >
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 grow p-4">
              <div className={panelLabel}>PAGE.TSX</div>
              <pre className="m-0 mt-3 overflow-x-auto font-code text-[12.5px] leading-[1.9] text-fg-2">
                {code.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
            <div className="p-4 sm:border-r sm:border-white/10">
              <div className={panelLabel}>TERMINAL</div>
              <div className="mt-3 flex flex-col gap-1 font-code text-[11.5px]">
                {ideTerminal.map((l, i) => (
                  <span key={i} className={l.cmd ? "text-fg-2" : "text-mint"}>
                    {l.cmd && <span className="text-dim">$ </span>}
                    {l.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 p-4 sm:border-t-0">
              <div className="flex items-center justify-between">
                <span className={panelLabel}>PREVIEW</span>
                <span className="font-code text-[10.5px] text-dim">localhost:3000/pricing</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`flex h-[58px] flex-col gap-1.5 rounded-lg border p-2 ${
                      i === 1 ? "border-brand/40 bg-brand/8" : "border-line bg-panel"
                    }`}
                  >
                    <span className="h-1.5 w-8 rounded-full bg-dim/50" />
                    <span className="h-2.5 w-10 rounded-full bg-fg-2/40" />
                    <span className={`mt-auto h-2 rounded ${i === 1 ? "bg-brand" : "bg-line"}`} />
                  </div>
                ))}
              </div>
              <div className="mt-2 font-code text-[10.5px] text-mint">✓ screenshot matched · 3 viewports</div>
            </div>
          </div>
        </div>
      </WindowFrame>
    </Section>
  );
}
