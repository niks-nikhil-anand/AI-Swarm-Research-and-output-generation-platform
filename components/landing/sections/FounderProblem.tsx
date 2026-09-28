import { founderRoles } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { Card } from "../ui/Card";
import { CheckItem } from "../ui/CheckItem";
import { Chip } from "../ui/Chip";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

function Arrow({ brand = false, size = 16 }: { brand?: boolean; size?: number }) {
  return <Icon d={icons.arrowRight} size={size} className={brand ? "text-brand" : "text-faint"} />;
}

export function FounderProblem() {
  return (
    <Section id="problem">
      <SectionHeader
        eyebrow="THE PROBLEM"
        title={
          <>
            I’m one person trying to be <Accent>a whole company.</Accent>
          </>
        }
        description="A SaaS needs research, a spec, design, code, QA, SEO and a launch. Solo founders do all of it, usually in that order, and the parts before and after the code get skipped."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-8 lg:h-[400px]">
          <div className="font-code text-xs tracking-[0.08em] text-dim">SOLO FOUNDER TODAY</div>
          <div className="my-8 flex flex-wrap items-center gap-2 lg:my-0 lg:mt-8">
            {founderRoles.map((role) => (
              <Chip key={role} tone="muted" className="px-3 py-1.5 text-[11px]">
                {role}
              </Chip>
            ))}
            <Arrow size={18} />
            <Chip tone="muted" className="px-4 py-2.5 text-xs">One founder</Chip>
          </div>
          <div className="mt-auto flex flex-col gap-2.5 text-[15px] text-muted">
            <span>Weeks lost before the first line of code</span>
            <span>Research, spec and launch done last, or skipped</span>
            <span>Five tools that don’t share any context</span>
          </div>
        </Card>

        <Card variant="glow" className="p-6 sm:p-8 lg:h-[400px]">
          <div className="font-code text-xs tracking-[0.08em] text-brand-soft">SAAS LAUNCH</div>
          <div className="my-8 flex flex-wrap items-center gap-3 lg:my-0 lg:mt-8">
            <Chip>You</Chip>
            <Arrow brand />
            <Chip tone="brand">AI product team</Chip>
            <Arrow brand />
            <div className="flex flex-col gap-1.5">
              {["Validate", "Plan", "Build", "Launch"].map((s) => (
                <Chip key={s} className="px-3 py-1.5 text-[11px]">
                  {s}
                </Chip>
              ))}
            </div>
            <Arrow brand />
            <Chip tone="mint">Your SaaS</Chip>
          </div>
          <div className="mt-auto flex flex-col gap-2.5 text-[15px] text-fg">
            <CheckItem>Specialist agents for every stage</CheckItem>
            <CheckItem>One memory from research to launch</CheckItem>
            <CheckItem>Every step visible and approved by you</CheckItem>
          </div>
        </Card>
      </div>
    </Section>
  );
}
