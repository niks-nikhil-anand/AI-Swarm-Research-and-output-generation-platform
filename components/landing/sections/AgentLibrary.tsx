"use client";

import { useState } from "react";
import { agentCategories, libraryAgents, routes, type AgentCategory } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Tag } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function AgentLibrary() {
  const [category, setCategory] = useState<AgentCategory>("All");
  const agents = libraryAgents.filter((a) => category === "All" || a.cat === category);

  return (
    <Section id="agents">
      <SectionHeader
        eyebrow="AGENT LIBRARY"
        title={
          <>
            Specialized agents for <Accent>every kind of work.</Accent>
          </>
        }
        description="Each agent has one job, a fixed set of tools, and a clear input and output. Use them alone or drop them into a swarm."
      />

      <div role="group" aria-label="Filter agents" className="mt-8 flex flex-wrap gap-2">
        {agentCategories.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={`h-9 rounded-full border px-4 font-code text-xs transition-colors ${
                active
                  ? "border-brand/30 bg-brand/10 text-brand-soft"
                  : "border-line bg-panel/60 text-muted hover:text-fg-2"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {agents.map((a) => (
          <Card key={a.name} className="h-[300px] p-5">
            <div className="flex items-center justify-between">
              <IconTile>
                <Icon d={a.icon} size={20} strokeWidth={1.5} className="text-brand" />
              </IconTile>
              <span className="font-code text-[10px] text-dim">{a.cat}</span>
            </div>
            <span className="mt-3.5 text-[15px] font-medium tracking-[-0.025em] text-fg">{a.name}</span>
            <span className="mt-1.5 text-[13px] leading-[1.55] text-muted">{a.desc}</span>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {a.tools.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <span className="mt-2.5 font-code text-[11px] text-dim">{a.io}</span>
            <a
              href={routes.start}
              className="mt-auto flex h-9 items-center justify-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 text-[13px] font-medium text-brand-soft transition-colors hover:bg-brand/20"
            >
              Use Agent <Icon d={icons.arrowRight} size={14} strokeWidth={1.8} />
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
