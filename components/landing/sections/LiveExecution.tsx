import { runAgents, runLog, runStats } from "../data/content";
import { hueTones, statusTones } from "../data/tones";
import { Accent } from "../ui/Accent";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { ProgressBar, StatusBadge } from "../ui/StatusBadge";
import { WindowFrame } from "../ui/WindowFrame";

const panelLabel = "font-code text-[11px] tracking-[0.12em] text-dim";

export function LiveExecution() {
  return (
    <Section id="demo">
      <SectionHeader
        eyebrow="LIVE SWARM"
        title={
          <>
            Watch your AI product team <Accent>work.</Accent>
          </>
        }
        description="Independent tasks run in parallel and you watch the graph execute: which agent is doing what, what it found, and what it cost. Nothing happens in a black box."
      />

      <WindowFrame
        className="mt-12 lg:h-[660px]"
        barClassName="h-12 px-5"
        title={
          <>
            <span className="hidden font-code text-xs text-dim sm:inline">run_0142</span>
            <span className="grow truncate text-sm text-fg-2">Validate: AI interview-prep SaaS for developers</span>
            <span className="flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-[3px] font-code text-[10.5px] text-brand-soft">
              <span className="size-1.5 animate-blink rounded-full bg-brand-soft" />
              RUNNING
            </span>
          </>
        }
      >
        <div className="flex grow flex-col lg:flex-row">
          <div className="flex grow flex-col p-5 sm:p-6">
            <div className={panelLabel}>AGENTS</div>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {runAgents.map((r) => (
                <div
                  key={r.name}
                  className={`flex h-[150px] flex-col rounded-2xl border bg-panel p-4 ${statusTones[r.status].card}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-fg">{r.name}</span>
                    <StatusBadge status={r.status} className="px-2 tracking-[0.06em]" />
                  </div>
                  <span className="mt-1 font-code text-[11px] text-dim">{r.role}</span>
                  <span className="mt-3.5 truncate font-code text-[11.5px] text-fg-2">{r.line}</span>
                  <div className="mt-auto flex items-center gap-2.5">
                    <ProgressBar status={r.status} pct={r.pct} thick />
                    <span className="font-code text-[10.5px] text-dim tabular-nums">{r.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-auto">
              {runStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5 rounded-2xl border border-line px-5 py-[18px]">
                  <span className="font-display text-[28px] tabular-nums">{s.value}</span>
                  <span className="font-code text-[11px] tracking-[0.08em] text-dim">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-t border-white/10 p-5 sm:p-6 lg:w-[400px] lg:shrink-0 lg:border-t-0 lg:border-l">
            <div className={panelLabel}>TIMELINE</div>
            <ol className="m-0 mt-4 flex list-none flex-col gap-3.5 p-0">
              {runLog.map((l, i) => {
                const tone = hueTones[l.hue];
                return (
                  <li key={i} className="flex gap-3 font-code text-[11.5px] leading-normal">
                    <span className="shrink-0 text-faint tabular-nums">{l.t}</span>
                    <span className={`mt-[5px] size-[7px] shrink-0 rounded-full ${tone.bg}`} />
                    <span className="text-fg-2">
                      <span className={tone.text}>{l.who}</span> {l.msg}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </WindowFrame>
    </Section>
  );
}
