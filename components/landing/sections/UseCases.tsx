import { useCases } from "../data/content";
import { hueTones } from "../data/tones";
import { Accent } from "../ui/Accent";
import { Card, IconTile } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHeader
        eyebrow="USE CASES"
        title={
          <>
            Put AI swarms <Accent>to work.</Accent>
          </>
        }
        description="Pick the job. Each links to a walkthrough with a ready swarm you can run."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((u) => {
          const tone = hueTones[u.hue];
          return (
            <Card key={u.name} className="p-6 lg:h-[340px]">
              <IconTile className={`size-10 rounded-xl ${tone.tint}`}>
                <Icon d={u.icon} size={20} strokeWidth={1.5} className={tone.text} />
              </IconTile>
              <span className="mt-4 text-lg font-medium text-fg">{u.name}</span>
              <div className="mt-3.5 flex flex-col">
                {u.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="group flex h-[34px] items-center justify-between border-t border-line text-sm text-muted hover:text-fg"
                  >
                    {item}
                    <span className="text-faint group-hover:text-brand-soft">→</span>
                  </a>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
