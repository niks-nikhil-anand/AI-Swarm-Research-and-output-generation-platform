import { creditEstimate, pricingTiers, stageAvailability, type PricingTier } from "../data/content";
import { Accent } from "../ui/Accent";
import { ButtonLink } from "../ui/ButtonLink";
import { Card } from "../ui/Card";
import { CheckItem } from "../ui/CheckItem";
import { Section } from "../ui/Section";
import { Eyebrow, SectionHeader } from "../ui/SectionHeader";
import { AvailabilityBadge } from "../ui/StatusBadge";

export function Pricing() {
  const estimatedTotal = creditEstimate.reduce((sum, e) => sum + e.v, 0);
  const packs = pricingTiers.slice(0, 3);
  const plans = pricingTiers.slice(3);

  return (
    <Section id="pricing" className="flex flex-col items-center">
      <SectionHeader
        align="center"
        eyebrow="PRICING"
        title={
          <>
            Buy launches, <Accent>not seats.</Accent>
          </>
        }
        description="Pay once per idea or per launch. Keep an AI team on the business afterwards for a lower monthly price."
      />

      <div className="mt-10 grid grid-cols-1 w-full max-w-[1140px] gap-5 lg:grid-cols-3">
        {packs.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 w-full max-w-[1140px] gap-5 lg:grid-cols-2">
        {plans.map((tier) => (
          <TierCard key={tier.name} tier={tier} compact />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 w-full max-w-[1140px] gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-8 lg:h-[300px]">
          <Eyebrow>CREDIT TRANSPARENCY</Eyebrow>
          <h3 className="mt-3 font-display text-[22px] leading-[1.25] font-normal sm:text-[26px]">
            Know what a run will use <Accent>before it starts.</Accent>
          </h3>
          <div className="mt-10 lg:mt-auto">
            <div className="flex justify-between text-[13px] text-muted">
              <span>Pack credits used</span>
              <span className="font-code text-fg tabular-nums">80 / 100 credits</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Pack credits used"
              className="mt-2.5 h-2 overflow-hidden rounded-full bg-line"
            >
              <div className="h-2 w-4/5 rounded-full bg-brand" />
            </div>
            <div className="mt-2.5 font-code text-[11px] text-dim">Alert at 90% · top up anytime</div>
          </div>
        </Card>

        <div className="flex flex-col rounded-3xl border border-white/10 bg-code px-6 py-7 font-code sm:px-8 lg:h-[300px]">
          <div className="text-[11px] tracking-[0.12em] text-dim">ESTIMATE · VALIDATE MY IDEA</div>
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

function TierCard({ tier, compact = false }: { tier: PricingTier; compact?: boolean }) {
  const availability = tier.stage ? stageAvailability[tier.stage] : "live";
  return (
    <Card
      variant={tier.featured ? "glow" : "default"}
      className={`p-8 ${compact ? "lg:grid lg:grid-cols-[1fr_1fr] lg:gap-x-8" : "lg:h-[580px]"}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[17px] font-semibold text-fg">{tier.name}</span>
          {tier.featured && (
            <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-[3px] font-code text-[10px] tracking-[0.08em] text-brand-soft">
              RECOMMENDED
            </span>
          )}
          {availability !== "live" && <AvailabilityBadge value={availability} />}
        </div>
        <span className="mt-2 text-[13px] leading-[1.55] text-muted">{tier.desc}</span>
        <div className="mt-5 flex items-baseline gap-1.5">
          <span className="font-display text-5xl leading-[1.1] tracking-[-0.02em] text-fg tabular-nums">
            {tier.price}
          </span>
          {tier.unit && <span className="text-sm text-muted">{tier.unit}</span>}
        </div>
        <span className="mt-1 font-code text-[11px] text-dim">{tier.note}</span>
        <ButtonLink
          href={tier.href}
          variant={tier.featured ? "primary" : "secondary"}
          className="mt-6 h-12 w-full"
        >
          {tier.cta}
        </ButtonLink>
      </div>
      <ul
        className={`m-0 mt-6 flex list-none flex-col gap-3 border-t border-line p-0 pt-5 text-[13px] text-fg-2 ${
          compact ? "lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8" : ""
        }`}
      >
        {tier.features.map((f) => (
          <li key={f}>
            <CheckItem>{f}</CheckItem>
          </li>
        ))}
      </ul>
    </Card>
  );
}
