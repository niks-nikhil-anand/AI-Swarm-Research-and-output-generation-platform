import Link from "next/link";
import Image from "next/image";
import { Icon } from "../swarm/ui";
import { HomeNav } from "./HomeNav";
import { HomeParticles } from "./HomeParticles";
import styles from "./home.module.css";

const workflowSteps = [
  ["01 · RESEARCH", "Gathers sources, keeps citations attached to every claim."],
  ["02 · ANALYZE", "Clusters findings, compares options, surfaces contradictions."],
  ["03 · VERIFY", "Checks claims against sources before anything ships."],
  ["04 · OUTPUT", "Briefs, reports, drafts and structured insights, export-ready."],
];

const howSteps = [
  ["Add a goal", "Enter a research question, an idea, or a full project brief. Plain language is enough."],
  ["Swarm plans the work", "Agents split the task into research, analysis, verification, and output. The plan stays visible."],
  ["AI Nexus Chat refines", "Chat with the run, ask follow-ups, and explore deeper context without losing the thread."],
  ["Export usable outputs", "Summaries, briefs, reports, content, plans, and structured insights are ready to use."],
];

const nexusFeatures = [
  "Long-form chat",
  "Project-aware conversations",
  "Model selection",
  "Saved chat history",
  "Research-focused answers",
  "Built for builders and researchers",
];

const sessionFeatures = [
  ["Persistent chats", "Every conversation is stored against its project, so threads pick up where they stopped."],
  ["Reusable context", "Sources, findings, and prior outputs stay attached and can be fed into the next run."],
  ["Continuous iteration", "Re-run a step, swap a model, or extend a brief without rebuilding the whole workflow."],
];

const techStack = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "OpenRouter / LLM APIs",
  "Agent workflow architecture",
  "Auth and session management",
  "SEO metadata-ready frontend",
];

const useCases = [
  ["Market research", "Map markets, competitors, positioning, source confidence, and unanswered questions before you write the final brief."],
  ["Founder strategy", "Turn rough ideas into plans, research tasks, GTM notes, investor summaries, and decision-ready tradeoffs."],
  ["Developer research", "Compare APIs, libraries, architecture patterns, implementation risks, and technical references in one workflow."],
  ["Content operations", "Generate outlines, drafts, repurposed posts, newsletters, and editorial briefs from verified source material."],
];

const outputTypes = [
  "Research briefs",
  "Source-backed summaries",
  "Project plans",
  "Technical comparisons",
  "Content drafts",
  "Slide outlines",
  "Decision memos",
  "Reusable prompts",
];

const faqs = [
  ["What is AI Swarm?", "AI Swarm is an open-source AI research platform that uses agent workflows and AI Nexus Chat to turn a goal into researched, verified, and structured outputs."],
  ["How is AI Nexus Chat different from a normal chatbot?", "AI Nexus Chat is connected to the research workflow. It is designed for long-running conversations, saved history, model selection, and project-aware follow-ups."],
  ["Does AI Swarm really have unlimited tokens?", "The platform is designed for extended research sessions and persistent chats. Token limits still depend on the selected model and provider, but the workflow helps preserve context across long projects."],
  ["Who is AI Swarm for?", "It is built for founders, developers, researchers, students, marketers, and indie builders who need deeper research and practical outputs from AI."],
];

export function HomePage() {
  return (
    <main className={styles.page}>
      <HomeParticles />
      <div className={styles.glow} />
      <div className={styles.shell}>
        <HomeNav />
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <NexusSection />
        <ExtendedSessionsSection />
        <UseCasesSection />
        <OutputsSection />
        <TechSection />
        <FounderSection />
        <FaqSection />
        <CtaSection />
        <HomeFooter />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.pill}>
        <span className={styles.pulseDot} />
        open-source · AI agent workflow engine
      </div>
      <h1 className={styles.heroTitle}>AI Swarm Research Platform</h1>
      <p className={styles.heroLead}>
        Research deeper, chat longer, and turn ideas into verified outputs with coordinated AI agents.
      </p>
      <div className={styles.heroActions}>
        <Link href="/new-swarm" className={styles.primaryButton}>
          <Icon name="plus" size={16} />
          Start New Swarm
        </Link>
        <Link href="/chat" className={styles.secondaryButton}>
          <Icon name="message-square" size={16} />
          Open AI Nexus Chat
        </Link>
      </div>
      <p className={styles.trustLine}>
        Open-source AI research, extended chat workflows, source-aware outputs, and agent-powered reasoning.
      </p>
      <WorkflowPreview />
    </section>
  );
}

function WorkflowPreview() {
  return (
    <div className={styles.workflowPreview} aria-label="AI Swarm workflow preview">
      <div className={styles.previewHeader}>
        <span className={styles.pulseDot} />
        swarm · run_014 · goal to verified output
        <span style={{ marginLeft: "auto", color: "#5f6b78" }}>4 agents active</span>
      </div>
      <div className={styles.previewGrid}>
        {workflowSteps.map(([code, body], index) => (
          <div key={code} className={styles.agentStep}>
            <div className={styles.stepCode}>{code}</div>
            <p>{body}</p>
            <div className={styles.flowBar}>
              <span style={{ animationDelay: `${index * 0.5}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.split}>
        <SectionIntro kicker="01 — About" title="A workspace for AI agents, not another chat box" />
        <div className={styles.copyStack}>
          <p className={styles.lead}>
            AI Swarm is an open-source AI research platform where multiple agents work together on research, planning, summarization, content generation, verification, and structured output creation.
          </p>
          <p className={styles.lead}>
            Instead of using one chat window for everything, AI Swarm breaks a goal into focused steps. Agents research, verify, organize, and generate usable outputs while keeping the workflow visible.
          </p>
          <div className={styles.tagRow}>
            {["AI agent workflow", "source-aware", "AI output generation", "self-hostable"].map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how" className={styles.sectionAlt}>
      <div className={styles.section}>
        <SectionIntro kicker="02 — How it works" title="From one goal to usable output in four steps" />
        <div className={styles.cardGrid} style={{ marginTop: 46 }}>
          {howSteps.map(([title, body], index) => <StepCard key={title} index={index + 1} title={title} body={body} />)}
        </div>
      </div>
    </section>
  );
}

function NexusSection() {
  return (
    <section id="nexus" className={styles.section} style={{ borderTop: "1px solid var(--home-line)" }}>
      <div className={styles.nexusGrid}>
        <div>
          <SectionIntro kicker="03 — AI Nexus Chat" title="The conversational layer of AI Swarm" />
          <p className={styles.lead} style={{ marginTop: 20, marginBottom: 28 }}>
            AI Nexus Chat lets you ask questions, refine research, compare ideas, summarize findings, and continue long conversations around a project. It is a long-context AI chat built around what the swarm already found.
          </p>
          <div className={styles.featureGrid}>
            {nexusFeatures.map((feature) => <div key={feature} className={styles.miniFeature}>{feature}</div>)}
          </div>
        </div>
        <ChatMock />
      </div>
    </section>
  );
}

function ExtendedSessionsSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className={styles.section}>
        <SectionIntro kicker="04 — Extended sessions" title="Designed for extended research sessions and long-running conversations" />
        <p className={styles.lead} style={{ maxWidth: "72ch", marginTop: 14, marginBottom: 40 }}>
          AI Swarm is built around persistent chats, saved project context, and structured workflows so you are not forced to restart from scratch. The system supports long research sessions, reusable context, and continuous iteration.
        </p>
        <div className={styles.sessionGrid}>
          {sessionFeatures.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  return (
    <section id="tech" className={styles.section} style={{ borderTop: "1px solid var(--home-line)" }}>
      <div className={styles.split}>
        <div>
          <SectionIntro kicker="07 — Tech" title="Tech behind AI Swarm" />
          <p className={styles.lead} style={{ marginTop: 18 }}>
            The platform combines a modern full-stack web app with database-backed conversations, model-routing APIs, and agent-based workflow orchestration. It is a Next.js AI platform built to be read, forked, and self-hosted.
          </p>
        </div>
        <div className={styles.techGrid}>
          {techStack.map((item) => <div key={item} className={styles.techChip}>{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className={styles.section}>
        <SectionIntro kicker="05 — Use cases" title="Built for research-heavy work that needs more than one prompt" />
        <div className={styles.cardGrid} style={{ marginTop: 42 }}>
          {useCases.map(([title, body]) => <InfoCard key={title} title={title} body={body} />)}
        </div>
      </div>
    </section>
  );
}

function OutputsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.split}>
        <div>
          <SectionIntro kicker="06 — Outputs" title="Move from research to something you can ship" />
          <p className={styles.lead} style={{ marginTop: 18 }}>
            AI Swarm is built for output generation, not just exploration. The goal is to turn every useful thread into a concrete artifact: a brief, plan, report, outline, memo, draft, or reusable prompt.
          </p>
        </div>
        <div className={styles.outputPanel}>
          {outputTypes.map((item) => (
            <div key={item} className={styles.outputItem}>
              <Icon name="check-circle" size={15} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section id="founder" className={styles.sectionAlt}>
      <div className={styles.section}>
        <div className={styles.founderSplit}>
          <div>
            <div className={styles.sectionKicker}>08 — Why I&apos;m building this</div>
            <blockquote className={styles.quote}>
              <p>
                I&apos;m building AI Swarm because most AI tools still feel like isolated chat boxes. Builders need systems that can research, reason, verify, and produce real outputs, not just answer one prompt at a time.
              </p>
            </blockquote>
            <p className={styles.lead} style={{ maxWidth: "74ch", marginTop: 26, color: "var(--home-muted)" }}>
              Built by Nikhil Anand, Lead Developer at DevKit and creator of DevKit Market, focused on Next.js starter kits, SaaS templates, AI developer tools, and practical tools for indie builders.
            </p>
          </div>
          <div className={styles.profilePhotoWrap}>
            <Image src="/logo/profile.png" alt="Nikhil Anand" width={320} height={430} className={styles.profilePhoto} />
          </div>
        </div>
        <div className={styles.founderCard}>
          <div className={styles.founderBody}>
            <h3>Nikhil Anand</h3>
            <div className={styles.founderRole}>Lead Developer @ DevKit</div>
            <p className={styles.lead} style={{ color: "var(--home-muted)", fontSize: 15 }}>
              Developer, product builder, and creator of DevKit Market. I build practical developer tools, AI workflows, SaaS templates, and open-source systems that help builders ship faster.
              </p>
              <div className={styles.profileActions}>
                <a className={styles.profileButton} href="https://www.devkitmarket.com/about-me" target="_blank" rel="noopener noreferrer">
                  <Icon name="user" size={15} />
                  Portfolio
                </a>
                <a className={styles.profileButton} href="https://www.devkitmarket.com/" target="_blank" rel="noopener noreferrer">
                  <Icon name="globe" size={15} />
                  DevKit Market
                </a>
                <a className={styles.profileButton} href="https://www.linkedin.com/in/nikhilanand86/" target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkedinIcon} aria-hidden="true">in</span>
                  LinkedIn
                </a>
                <a className={styles.profileButton} href="https://github.com/niks-nikhil-anand" target="_blank" rel="noopener noreferrer">
                  <span className={styles.githubIconWrap} aria-hidden="true">
                    <span className={styles.githubPngIcon} />
                  </span>
                  GitHub
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.section}>
      <SectionIntro kicker="09 — FAQ" title="Questions builders ask before trying AI Swarm" />
      <div className={styles.faqGrid}>
        {faqs.map(([question, answer]) => (
          <article key={question} className={styles.faqItem}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={`${styles.section} ${styles.cta}`}>
      <h2>Start your first swarm</h2>
      <p>Give it one research goal and see the agents plan, verify, and hand back something you can actually use.</p>
      <div className={styles.centerActions}>
        <Link href="/new-swarm" className={styles.primaryButton}>Start New Swarm</Link>
        <Link href="/chat" className={styles.secondaryButton}>Open AI Nexus Chat</Link>
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerTitle}>AI Swarm</div>
            <p style={{ marginTop: 12 }}>
              An open-source AI chat platform and AI research assistant for AI agent workflows, long-context AI chat, and AI output generation, built with Next.js for developers and researchers.
            </p>
          </div>
          <FooterColumn title="Platform" links={[["AI research platform", "#about"], ["AI agent workflow", "#how"], ["AI Nexus Chat", "#nexus"]]} />
          <FooterColumn title="For developers" links={[["AI tools for developers", "#tech"], ["Next.js AI platform", "#tech"], ["Start a swarm", "/new-swarm"]]} />
          <FooterColumn title="Founder" links={[["Why I am building this", "#founder"], ["Nikhil Anand", "https://www.devkitmarket.com/about-me"], ["DevKit Market", "https://www.devkitmarket.com"]]} />
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 AI Swarm — open source</span>
          <span>Built by Nikhil Anand</span>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className={styles.sectionKicker}>{kicker}</div>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

function StepCard({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <article className={styles.stepCard}>
      <div className={styles.stepNumber}>{String(index).padStart(2, "0")}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className={styles.sessionCard}>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function ChatMock() {
  return (
    <div className={styles.chatMock} aria-label="AI Nexus Chat preview">
      <div className={styles.chatHeader}>
        <span>nexus / market-sizing-q3</span>
        <span className={styles.modelBadge}>model ▾</span>
      </div>
      <div className={styles.chatBody}>
        <div className={styles.userBubble}>Summarize the verified findings and flag anything with a single source.</div>
        <div className={styles.assistantBubble}>
          <div className={styles.assistantMeta}>SWARM · 3 AGENTS · 14 SOURCES</div>
          <div>Three findings hold across independent sources. One claim, pricing elasticity, rests on a single source and is marked unverified.</div>
          <div className={styles.sourceRow}>
            <span className={styles.sourceTag}>[1]</span>
            <span className={styles.sourceTag}>[2]</span>
            <span className={styles.sourceTag}>[7]</span>
            <span className={`${styles.sourceTag} ${styles.sourceWarn}`}>1 unverified</span>
          </div>
        </div>
        <div className={styles.composerMock}>
          Ask a follow-up, or turn this into a brief...
          <span className={styles.cursor} />
        </div>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div className={styles.footerColumn}>
      <span className={styles.footerLabel}>{title}</span>
      {links.map(([label, href]) => href.startsWith("http") ? (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
      ) : (
        <Link key={label} href={href}>{label}</Link>
      ))}
    </div>
  );
}
