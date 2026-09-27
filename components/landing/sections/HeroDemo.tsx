"use client";

import { useState } from "react";
import { demoPresets, type DemoAgent, type DemoPreset } from "../data/content";
import { icons } from "../data/icons";
import { statusTones } from "../data/tones";
import { Icon } from "../ui/Icon";
import { ProgressBar, StatusBadge } from "../ui/StatusBadge";
import { TrafficLights } from "../ui/WindowFrame";

/** Interactive "Try a swarm" window. Pre-recorded runs — no model call. */
export function HeroDemo() {
  const [selected, setSelected] = useState(0);
  const preset = demoPresets[selected];

  return (
    <div className="mt-10 w-full max-w-[1200px] overflow-hidden rounded-3xl border border-white/10 bg-code shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_50px_rgba(124,111,247,0.12)] lg:mt-16">
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 font-code xl:h-11 xl:px-[18px]">
        <span className="hidden xl:block">
          <TrafficLights />
        </span>
        <span className="text-[11px] text-fg-2 xl:text-xs">swarm run · {preset.slug}</span>
        <span className="text-[11px] text-dim">preview</span>
      </div>

      <div className="xl:flex xl:h-[576px]">
        <PresetPanel selected={selected} onSelect={setSelected} preset={preset} />
        <DesktopGraph preset={preset} />
        <MobileGraph preset={preset} />
      </div>
    </div>
  );
}

function PresetPanel({
  selected,
  onSelect,
  preset,
}: {
  selected: number;
  onSelect: (i: number) => void;
  preset: DemoPreset;
}) {
  return (
    <div className="flex flex-col px-4 pt-[18px] xl:w-[340px] xl:shrink-0 xl:border-r xl:border-white/10 xl:p-7">
      <div className="font-code text-[11px] tracking-[0.12em] text-brand">TRY A SWARM</div>

      <div className="mt-4 hidden text-[13px] text-muted xl:block">Goal</div>
      <div className="mt-2 hidden min-h-11 rounded-xl border border-line bg-panel p-3.5 font-code text-[13px] leading-[1.55] text-fg xl:block">
        {preset.goal}
      </div>

      <div className="mt-6 hidden text-[13px] text-muted xl:block">Presets</div>
      <div className="mt-3 flex flex-wrap gap-2 xl:mt-2 xl:flex-col">
        {demoPresets.map((p, i) => {
          const active = i === selected;
          return (
            <button
              key={p.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(i)}
              className={`rounded-full border px-3 py-2 text-left text-[13px] transition-colors xl:rounded-[10px] xl:px-3.5 xl:py-2.5 xl:text-sm ${
                active
                  ? "border-brand/30 bg-brand/10 text-brand-soft"
                  : "border-line bg-transparent text-muted hover:text-fg-2"
              }`}
            >
              <span className="xl:hidden">{p.mobileLabel ?? p.label}</span>
              <span className="hidden xl:inline">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto hidden font-code text-[11px] leading-normal text-dim xl:block">
        Pre-recorded runs. No model call on page load.
      </div>
    </div>
  );
}

const agentLefts = [20, 272, 524];

function DesktopGraph({ preset }: { preset: DemoPreset }) {
  return (
    <div className="hidden grow items-center justify-center bg-dots xl:flex">
      <div className="relative h-[500px] w-[760px]">
        <svg width="760" height="500" viewBox="0 0 760 500" fill="none" className="absolute inset-0" aria-hidden="true">
          <g stroke="rgba(124,111,247,0.55)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-flow">
            <path d="M380 60 L380 100" />
            <path d="M380 152 C380 176 128 172 128 196" />
            <path d="M380 152 L380 196" />
            <path d="M380 152 C380 176 632 172 632 196" />
            <path d="M128 288 C128 312 380 306 380 330" />
            <path d="M380 288 L380 330" />
            <path d="M632 288 C632 312 380 306 380 330" />
            <path d="M380 394 L380 426" />
          </g>
        </svg>

        <div className="absolute top-3.5 left-[200px] flex h-[46px] w-[360px] items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5">
          <Icon d={icons.flag} className="text-muted" />
          <span className="font-code text-[10px] tracking-[0.1em] text-dim">GOAL</span>
          <span className="truncate text-[13px] text-fg">{preset.short}</span>
        </div>

        <div className="absolute top-[100px] left-[270px] flex h-[52px] w-[220px] items-center gap-2.5 rounded-xl border border-brand/45 bg-panel-2 px-3.5 shadow-[0_0_30px_rgba(124,111,247,0.18)]">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-white">
            <Icon d={icons.logo} size={15} strokeWidth={1.8} />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Orchestrator</span>
            <span className="font-code text-[10.5px] text-brand-soft">{preset.plan}</span>
          </div>
        </div>

        {preset.agents.map((a, i) => (
          <AgentNode key={`${preset.slug}-${a.name}`} agent={a} left={agentLefts[i]} />
        ))}

        <div className="absolute top-[330px] left-[272px] flex h-16 w-[216px] items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand-soft">
            <Icon d={icons.shieldCheck} size={15} />
          </span>
          <div className="flex flex-col gap-[3px]">
            <span className="text-sm font-medium">Reviewer</span>
            <span className="font-code text-[11px] text-dim">Waiting for outputs…</span>
          </div>
        </div>

        <div className="absolute top-[426px] left-[200px] flex h-[60px] w-[360px] items-center gap-3 rounded-xl border border-dashed border-mint/35 bg-mint/6 px-3.5">
          <Icon d={icons.file} size={18} className="text-mint" />
          <div className="flex flex-col gap-[3px]">
            <span className="font-code text-[10px] tracking-[0.1em] text-mint">RESULT · AFTER REVIEW</span>
            <span className="text-[13px] text-fg">{preset.result}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentNode({ agent, left }: { agent: DemoAgent; left: number }) {
  return (
    <div
      className={`absolute top-[196px] flex h-[92px] w-[216px] flex-col rounded-xl border bg-panel px-3.5 py-3 ${statusTones[agent.status].card}`}
      style={{ left }}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand-soft">
          <Icon d={agent.icon} size={15} />
        </span>
        <span className="grow text-sm font-medium whitespace-nowrap">{agent.name}</span>
        <StatusBadge status={agent.status} />
      </div>
      <div className="mt-2.5 truncate font-code text-[11px] text-muted">{agent.line}</div>
      <div className="mt-auto flex">
        <ProgressBar status={agent.status} pct={agent.pct} />
      </div>
    </div>
  );
}

/** Vertical timeline version of the graph for narrow screens. */
function MobileGraph({ preset }: { preset: DemoPreset }) {
  return (
    <div className="px-4 pt-5 pb-5 xl:hidden">
      <div className="relative flex flex-col gap-3">
        <div aria-hidden="true" className="absolute top-5 bottom-5 left-[21px] border-l-[1.5px] border-dashed border-brand/50" />

        <div className="relative flex flex-col gap-[3px] rounded-xl border border-line bg-panel px-3.5 py-3">
          <span className="font-code text-[10px] tracking-[0.1em] text-dim">GOAL</span>
          <span className="text-[13px] text-fg">{preset.short}</span>
        </div>

        <div className="relative flex items-center justify-between rounded-xl border border-brand/45 bg-panel-2 px-3.5 py-3">
          <span className="text-sm font-medium">Orchestrator</span>
          <span className="font-code text-[10.5px] text-brand-soft">{preset.plan}</span>
        </div>

        {preset.agents.map((a) => (
          <div
            key={`${preset.slug}-${a.name}`}
            className={`relative ml-5 flex flex-col gap-2 rounded-xl border bg-panel px-3.5 py-3 ${statusTones[a.status].card}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{a.name}</span>
              <StatusBadge status={a.status} className="px-[7px]" />
            </div>
            <span className="font-code text-[11px] text-muted">{a.line}</span>
            <div className="flex">
              <ProgressBar status={a.status} pct={a.pct} />
            </div>
          </div>
        ))}

        <div className="relative flex items-center justify-between rounded-xl border border-line bg-panel px-3.5 py-3">
          <span className="text-sm font-medium">Reviewer</span>
          <span className="font-code text-[10.5px] text-dim">Waiting for outputs…</span>
        </div>

        <div className="relative flex flex-col gap-[3px] rounded-xl border border-dashed border-mint/35 bg-mint/6 px-3.5 py-3">
          <span className="font-code text-[10px] tracking-[0.1em] text-mint">RESULT · AFTER REVIEW</span>
          <span className="text-[13px] text-fg">{preset.result}</span>
        </div>
      </div>
    </div>
  );
}
