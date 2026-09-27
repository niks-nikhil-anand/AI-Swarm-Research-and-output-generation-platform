"use client";

import { useState } from "react";
import { creditEstimate, pricingTiers, type PricingTier } from "../data/content";
import { Accent } from "../ui/Accent";
import { ButtonLink } from "../ui/ButtonLink";
import { Card } from "../ui/Card";
import { CheckItem } from "../ui/CheckItem";
import { Section } from "../ui/Section";
import { Eyebrow, SectionHeader } from "../ui/SectionHeader";

type Period = "monthly" | "yearly";

export function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");
  const estimatedTotal = creditEstimate.reduce((sum, e) => sum + e.v, 0);

  return (
    <Section id="pricing" className="flex flex-col items-center">
      <SectionHeader
        align="center"
        eyebrow="PRICING"
        title={
          <>
            Start free. Scale when <Accent>the work gets bigger.</Accent>
          </>
        }
        description="Pay for runs, not seats. Every plan shows the credit estimate before a swarm starts."
      />

      <PeriodToggle period={period} onChange={setPeriod} />

      <div className="mt-10 grid grid-cols-1 w-full max-w-[1140px] gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} period={period} />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 w-full max-w-[1140px] gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-8 lg:h-[300px]">
          <Eyebrow>CREDIT TRANSPARENCY</Eyebrow>
          <h3 className="mt-3 font-display text-[22px] leading-[1.25] font-normal sm:text-[26px]">
            Know what a swarm will use <Accent>before it runs.</Accent>
          </h3>
          <div className="mt-10 lg:mt-auto">
            <div className="flex justify-between text-[13px] text-muted">
              <span>Monthly usage</span>
              <span className="font-code text-fg tabular-nums">80 / 100 runs</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Monthly usage"
              className="mt-2.5 h-2 overflow-hidden rounded-full bg-line"
            >
              <div className="h-2 w-4/5 rounded-full bg-brand" />
            </div>
            <div className="mt-2.5 font-code text-[11px] text-dim">Resets in 9 days · alert at 90%</div>
          </div>
        </Card>

        <div className="flex flex-col rounded-3xl border border-white/10 bg-code px-6 py-7 font-code sm:px-8 lg:h-[300px]">
          <div className="text-[11px] tracking-[0.12em] text-dim">ESTIMATED EXECUTION</div>
          <div className="mt-4 flex flex-col gap-3 text-[13px] text-fg-2">
            {creditEstimate.map((e) => (
              <div key={e.k} className="flex justify-between">
                <span>{e.k}</span>
                <span className="tabular-nums">{e.v} credits</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t border-white/10 pt-3.5 text-sm text-fg lg:mt-auto">
            <span>Estimated total</span>
            <span className="text-brand-soft tabular-nums">{estimatedTotal} credits</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PeriodToggle({ period, onChange }: { period: Period; onChange: (p: Period) => void }) {
  const options: { value: Period; label: string; save: boolean }[] = [
    { value: "monthly", label: "Monthly", save: false },
    { value: "yearly", label: "Yearly", save: true },
  ];
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="mt-8 flex h-11 gap-1 rounded-full border border-line bg-panel p-1"
    >
      {options.map((o) => {
        const active = o.value === period;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`flex h-[34px] items-center gap-2 rounded-full border-0 px-[18px] text-sm font-medium transition-colors ${
              active ? "bg-brand-strong text-white" : "bg-transparent text-muted hover:text-fg-2"
            }`}
          >
            {o.label}
            {o.save && (
              <span
                className={`rounded-full px-1.5 py-0.5 font-code text-[10px] ${
                  active ? "bg-white/18" : "bg-mint/10 text-mint"
                }`}
              >
                SAVE 20%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TierCard({ tier, period }: { tier: PricingTier; period: Period }) {
  return (
    <Card variant={tier.featured ? "glow" : "default"} className="p-8 lg:h-[560px]">
      <div className="flex items-center justify-between">
        <span className="text-[17px] font-semibold text-fg">{tier.name}</span>
        {tier.featured && (
          <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-[3px] font-code text-[10px] tracking-[0.08em] text-brand-soft">
            RECOMMENDED
          </span>
        )}
      </div>
      <span className="mt-2 text-[13px] leading-[1.55] text-muted">{tier.desc}</span>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-5xl leading-[1.1] tracking-[-0.02em] text-fg tabular-nums">
          {tier.price[period]}
        </span>
        <span className="text-sm text-muted">{tier.unit}</span>
      </div>
      <span className="mt-1 font-code text-[11px] text-dim">{tier.note[period]}</span>
      <ButtonLink
        href={tier.href}
        variant={tier.featured ? "primary" : "secondary"}
        className="mt-6 h-12 w-full"
      >
        {tier.cta}
      </ButtonLink>
      <ul className="m-0 mt-6 flex list-none flex-col gap-3 border-t border-line p-0 pt-5 text-[13px] text-fg-2">
        {tier.features.map((f) => (
          <li key={f}>
            <CheckItem>{f}</CheckItem>
          </li>
        ))}
      </ul>
    </Card>
  );
}
