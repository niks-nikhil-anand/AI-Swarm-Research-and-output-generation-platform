import type { ReactNode } from "react";
import { devBadges, devFeatures } from "../data/content";
import { Accent } from "../ui/Accent";
import { ButtonLink } from "../ui/ButtonLink";
import { CopyButton } from "../ui/CopyButton";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { WindowFrame } from "../ui/WindowFrame";

const kw = (s: string) => <span className="text-brand-soft">{s}</span>;
const str = (s: string) => <span className="text-mint">{s}</span>;
const fn = (s: string) => <span className="text-sky">{s}</span>;
const cmt = (s: string) => <span className="text-dim">{s}</span>;

const codeLines: ReactNode[] = [
  <>{kw("import")} {"{ Swarm }"} {kw("from")} {str('"@aiswarm/sdk"')};</>,
  " ",
  <>{kw("const")} swarm = {kw("new")} {fn("Swarm")}({"{ apiKey: process.env.AISWARM_KEY }"});</>,
  " ",
  <>{kw("const")} run = {kw("await")} swarm.{fn("run")}({"{"}</>,
  <>  goal: {str('"Analyze our competitors"')},</>,
  <>  agents: [{str('"researcher"')}, {str('"analyst"')}, {str('"reviewer"')}],</>,
  <>  output: {str('"report.md"')},</>,
  "});",
  " ",
  <>{cmt("// stream task events as agents work")}</>,
  <>run.{fn("on")}({str('"task"')}, (t) =&gt; console.{fn("log")}(t.agent, t.status));</>,
];

const sdkSnippet = `import { Swarm } from "@aiswarm/sdk";

const swarm = new Swarm({ apiKey: process.env.AISWARM_KEY });

const run = await swarm.run({
  goal: "Analyze our competitors",
  agents: ["researcher", "analyst", "reviewer"],
  output: "report.md",
});

// stream task events as agents work
run.on("task", (t) => console.log(t.agent, t.status));
`;

export function Developers() {
  return (
    <Section id="developers" className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="flex flex-col">
        <SectionHeader
          eyebrow="FOR DEVELOPERS"
          title={
            <>
              Built for people who <Accent>actually ship.</Accent>
            </>
          }
          description="Everything the UI does, the API does. Trigger swarms from your code, stream task events, and plug in your own tools."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {devBadges.map((b) => (
            <span key={b} className="rounded-full border border-line bg-panel/60 px-3 py-[5px] font-code text-xs text-fg-2">
              {b}
            </span>
          ))}
        </div>
        <dl className="m-0 mt-8 flex flex-col">
          {devFeatures.map((d) => (
            <div key={d.k} className="flex min-h-11 items-center gap-4 border-t border-line py-2">
              <dt className="w-[110px] shrink-0 font-code text-[13px] text-brand-soft">{d.k}</dt>
              <dd className="m-0 text-sm text-muted">{d.v}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href="#" variant="secondary" arrow className="mt-8 self-start px-7 py-3.5">
          Read the Documentation
        </ButtonLink>
      </div>

      <WindowFrame
        className="lg:h-[500px]"
        title={
          <>
            <span className="grow font-code text-xs text-fg-2">run-swarm.ts</span>
            <CopyButton text={sdkSnippet} />
          </>
        }
      >
        <pre className="m-0 overflow-x-auto p-7 font-code text-[13.5px] leading-[1.9] text-fg-2">
          {codeLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
      </WindowFrame>
    </Section>
  );
}
