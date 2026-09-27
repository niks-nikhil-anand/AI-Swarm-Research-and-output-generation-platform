import { demoPresets } from "@/components/landing/data/content";
import { icons } from "@/components/landing/data/icons";
import { statusTones } from "@/components/landing/data/tones";
import { Accent } from "@/components/landing/ui/Accent";
import { CheckItem } from "@/components/landing/ui/CheckItem";
import { Icon } from "@/components/landing/ui/Icon";
import { Eyebrow } from "@/components/landing/ui/SectionHeader";
import { ProgressBar, StatusBadge } from "@/components/landing/ui/StatusBadge";
import { WindowFrame } from "@/components/landing/ui/WindowFrame";

const preset = demoPresets[0];

const copy = {
  login: {
    eyebrow: "WELCOME BACK",
    title: (
      <>
        Your swarm is <Accent>right where you left it.</Accent>
      </>
    ),
    points: ["Runs, sources and outputs saved per project", "Pick up any paused task", "Every step inspectable"],
  },
  register: {
    eyebrow: "GET STARTED",
    title: (
      <>
        Give your next goal <Accent>a team.</Accent>
      </>
    ),
    points: ["Free plan", "No credit card", "Start in seconds"],
  },
};

/** Right-hand marketing panel on auth pages: a static swarm run preview. */
export function AuthShowcase({ mode }: { mode: "login" | "register" }) {
  const c = copy[mode];
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden border-l border-line bg-panel/40 px-12 py-16 xl:px-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(124,111,247,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-[520px]">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-[34px] leading-[1.15] font-normal text-fg xl:text-[38px]">
          {c.title}
        </h2>
        <div className="mt-5 flex flex-col gap-2.5 text-[15px] text-muted">
          {c.points.map((p) => (
            <CheckItem key={p}>{p}</CheckItem>
          ))}
        </div>

        <WindowFrame
          className="mt-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_50px_rgba(124,111,247,0.12)]"
          title={
            <>
              <span className="grow truncate font-code text-xs text-fg-2">swarm run · {preset.slug}</span>
              <span className="flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-[3px] font-code text-[10.5px] text-brand-soft">
                <span className="size-1.5 animate-blink rounded-full bg-brand-soft" />
                RUNNING
              </span>
            </>
          }
        >
          <div className="flex flex-col gap-3 bg-dots p-5">
            <div className="flex items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5 py-3">
              <Icon d={icons.flag} className="text-muted" />
              <span className="font-code text-[10px] tracking-[0.1em] text-dim">GOAL</span>
              <span className="truncate text-[13px] text-fg">{preset.short}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-brand/45 bg-panel-2 px-3.5 py-3 shadow-[0_0_30px_rgba(124,111,247,0.18)]">
              <span className="text-sm font-medium">Orchestrator</span>
              <span className="font-code text-[10.5px] text-brand-soft">{preset.plan}</span>
            </div>
            {preset.agents.map((a) => (
              <div
                key={a.name}
                className={`ml-5 flex flex-col gap-2 rounded-xl border bg-panel px-3.5 py-3 ${statusTones[a.status].card}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand-soft">
                    <Icon d={a.icon} size={15} />
                  </span>
                  <span className="grow text-sm font-medium">{a.name}</span>
                  <StatusBadge status={a.status} />
                </div>
                <span className="font-code text-[11px] text-muted">{a.line}</span>
                <div className="flex">
                  <ProgressBar status={a.status} pct={a.pct} />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-mint/35 bg-mint/6 px-3.5 py-3">
              <Icon d={icons.file} size={18} className="text-mint" />
              <div className="flex flex-col gap-[3px]">
                <span className="font-code text-[10px] tracking-[0.1em] text-mint">RESULT · AFTER REVIEW</span>
                <span className="text-[13px] text-fg">{preset.result}</span>
              </div>
            </div>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
}
