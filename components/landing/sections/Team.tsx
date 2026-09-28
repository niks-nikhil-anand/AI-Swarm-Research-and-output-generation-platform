"use client";

import { Fragment, useState } from "react";
import { stageAvailability, stageByKey, stages, teams, type StageKey } from "../data/content";
import { hueTones } from "../data/tones";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Tag } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";

type Filter = "all" | StageKey;

export function Team() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = teams.filter((t) => filter === "all" || t.stage === filter);
  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All teams", count: teams.length },
    ...stages.map((s) => ({ key: s.key, label: s.name, count: teams.filter((t) => t.stage === s.key).length })),
  ];

  return (
    <Section id="team">
      <SectionHeader
        eyebrow="YOUR AI STARTUP TEAM"
        title={
          <>
            Not more agents. <Accent>A complete team.</Accent>
          </>
        }
        description={`${teams.length} specialist teams, each with a lead, a clear job and the context from every team before it. They don’t just generate files: they run, test and check what they make.`}
      />

      <div role="group" aria-label="Filter teams by stage" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f.key === filter;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={`h-9 rounded-full border px-4 font-code text-xs transition-colors ${
                active
                  ? "border-brand/30 bg-brand/10 text-brand-soft"
                  : "border-line bg-panel/60 text-muted hover:text-fg-2"
              }`}
            >
              {f.label} <span className="text-dim">{f.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => {
          const stage = stageByKey[t.stage];
          const tone = hueTones[stage.hue];
          return (
            <Card key={t.name} className="p-6 lg:min-h-[330px]">
              <div className="flex items-center justify-between gap-3">
                <IconTile>
                  <Icon d={t.icon} size={20} strokeWidth={1.5} className="text-brand" />
                </IconTile>
                <div className="flex items-center gap-2">
                  <span className={`font-code text-[10px] tracking-[0.06em] ${tone.text}`}>
                    {stage.name.toUpperCase()}
                  </span>
                  <AvailabilityBadge value={stageAvailability[t.stage]} />
                </div>
              </div>
              <span className="mt-3.5 text-[15px] font-medium tracking-[-0.025em] text-fg">{t.name}</span>
              <span className="mt-1.5 text-[13px] leading-[1.55] text-muted">{t.desc}</span>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {t.agents.map((a) => (
                  <Tag key={a}>{a}</Tag>
                ))}
              </div>
              {t.flow && (
                <div className="mt-5 rounded-xl border border-white/10 bg-code px-3.5 py-3 font-code text-[11px] leading-[1.9] text-fg-2 lg:mt-auto">
                  <span className="text-dim">verifies </span>
                  {t.flow.map((step, i) => (
                    <Fragment key={step}>
                      <span className={i === t.flow!.length - 1 ? "text-mint" : ""}>{step}</span>
                      {i < t.flow!.length - 1 && <span className="text-faint"> → </span>}
                    </Fragment>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
