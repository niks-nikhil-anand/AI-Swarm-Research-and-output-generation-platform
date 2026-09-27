import { securityItems } from "../data/content";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Security() {
  return (
    <Section>
      <SectionHeader
        eyebrow="SECURITY"
        title={
          <>
            Your workflows. Your data. <Accent>Your control.</Accent>
          </>
        }
        description="Controls you can see and change from workspace settings."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {securityItems.map((s) => (
          <Card key={s.name} direction="row" className="gap-4 p-6 lg:h-[120px]">
            <IconTile>
              <Icon d={s.icon} size={20} strokeWidth={1.5} className="text-brand" />
            </IconTile>
            <div className="flex flex-col gap-1.5">
              <span className="text-[15px] font-medium text-fg">{s.name}</span>
              <span className="text-[13px] leading-[1.55] text-muted">{s.body}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
