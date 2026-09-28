"use client";

import { Fragment, useState } from "react";
import { deployTargets, stageAvailability } from "../data/content";
import { Card } from "../ui/Card";
import { Eyebrow } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";

/** "Deploy my SaaS to …" demo: one DevOps agent, a different skill per target. */
export function DeployFlows() {
  const [selected, setSelected] = useState(0);
  const target = deployTargets[selected];

  return (
    <Card className="mt-8 p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Eyebrow>DEPLOYMENT SKILLS</Eyebrow>
            <AvailabilityBadge value={stageAvailability.build} />
          </div>
          <h3 className="mt-3 font-display text-[22px] leading-[1.25] font-normal sm:text-[26px]">
            One DevOps agent. A skill for every target.
          </h3>
        </div>
        <div role="group" aria-label="Deploy target" className="flex h-11 gap-1 self-start rounded-full border border-line bg-panel p-1 lg:self-auto">
          {deployTargets.map((t, i) => {
            const active = i === selected;
            return (
              <button
                key={t.name}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(i)}
                className={`flex h-[34px] items-center rounded-full border-0 px-4 text-sm font-medium transition-colors ${
                  active ? "bg-brand-strong text-white" : "bg-transparent text-muted hover:text-fg-2"
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-code p-5 font-code">
        <div className="text-[13px] text-fg">
          <span className="text-dim">you › </span>“{target.prompt}”
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {target.steps.map((step, i) => (
            <Fragment key={`${target.name}-${step}`}>
              <span
                className={`rounded-lg border px-3 py-[7px] ${
                  i === target.steps.length - 1
                    ? "border-mint/35 bg-mint/8 text-mint"
                    : "border-line bg-ink text-fg-2"
                }`}
              >
                {step}
              </span>
              {i < target.steps.length - 1 && <span className="text-faint">→</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}
