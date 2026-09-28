import { icons } from "./icons";
import type { Availability, Hue, RunStatus } from "./tones";

/* ---------- Navigation ---------- */

export const routes = {
  start: "/register",
  signIn: "/login",
} as const;

export const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Stages", href: "#stages" },
  { label: "Team", href: "#team" },
  { label: "Why us", href: "#compare" },
  { label: "Stack", href: "#stack" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* ---------- Stages + availability ---------- */

export type StageKey = "validate" | "plan" | "build" | "launch" | "operate";

/**
 * What is live today. Flip one value when a phase ships and every section
 * that mentions the stage (hero, how it works, stages, pricing, FAQ) follows.
 * Phase 1 = validate + plan · Phase 2 = launch kit · Phase 3 = build · Phase 5 = operate.
 */
export const stageAvailability = {
  validate: "live",
  plan: "live",
  launch: "soon",
  build: "later",
  operate: "later",
} as const satisfies Record<StageKey, Availability>;

export const isLive = (key: StageKey) => stageAvailability[key] === "live";

export type Stage = {
  key: StageKey;
  n: string;
  name: string;
  hue: Hue;
  summary: string;
  agents: string[];
  deliverables: string[];
  /** Real sample output. Leave unset until a genuine file exists in /public/samples. */
  sample?: { label: string; href: string };
};

export const stages: Stage[] = [
  {
    key: "validate",
    n: "01",
    name: "Validate",
    hue: "mint",
    summary: "Is this worth building? Evidence from the market, not a hunch.",
    agents: ["Market", "Competitor", "Customer", "Community", "Pricing", "SEO", "Technical", "Fact-Checker"],
    deliverables: ["Validation report (PDF/DOCX)", "Competitor matrix (XLSX)", "SEO keyword list", "Go / pivot / no-go summary"],
  },
  {
    key: "plan",
    n: "02",
    name: "Plan",
    hue: "sky",
    summary: "Turn the research into a spec you could hand to any team.",
    agents: ["Product Manager", "UX Researcher", "Solution Architect", "Database Architect", "Security Architect"],
    deliverables: ["PRD, feature spec and MVP scope", "Personas and user journeys", "Architecture, DB schema, API spec", "Pitch deck (PPTX)"],
  },
  {
    key: "build",
    n: "03",
    name: "Build",
    hue: "amber",
    summary: "Design, code, test and deploy, with agents that run what they write.",
    agents: ["Design", "Frontend", "Backend", "Database", "Auth", "Payments", "AI", "QA", "Security", "DevOps"],
    deliverables: ["Design system and code prototype", "GitHub repo you own", "Test and browser QA report", "Deploy to Vercel, AWS or Google Cloud"],
  },
  {
    key: "launch",
    n: "04",
    name: "Launch",
    hue: "pink",
    summary: "Everything the launch needs, drafted and ready for your approval.",
    agents: ["SEO", "Content", "Docs", "Social", "Creative", "Email", "Launch Manager"],
    deliverables: ["Landing copy, SEO meta, sitemap", "Blog posts and product docs", "Product Hunt, Reddit, LinkedIn, X drafts", "Email sequence and launch checklist"],
  },
  {
    key: "operate",
    n: "05",
    name: "Operate",
    hue: "brand",
    summary: "After launch, a weekly loop that watches the numbers and proposes fixes.",
    agents: ["Analytics", "Growth", "Support", "Maintenance"],
    deliverables: ["Weekly metrics report", "Anomaly alerts", "Proposed copy, page and code fixes"],
  },
];

/** Research doesn't end at the report: each stage hands its files to the next. */
export const contextChain = ["Research", "PRD", "Design", "Code", "Marketing"];

export const stageByKey = Object.fromEntries(stages.map((s) => [s.key, s])) as Record<StageKey, Stage>;

/* ---------- The team ---------- */

export type Team = {
  name: string;
  stage: StageKey;
  icon: string;
  desc: string;
  agents: string[];
  /** What the team verifies end to end, not just generates. */
  flow?: string[];
};

export const teams: Team[] = [
  {
    name: "Research",
    stage: "validate",
    icon: icons.search,
    desc: "A Research Lead runs the specialists and produces the Research Pack, which becomes context for every team after it.",
    agents: ["Market", "Competitor", "Customer", "Community (read-only)", "SEO", "Pricing", "Technical", "Fact-Checker"],
  },
  {
    name: "Product",
    stage: "plan",
    icon: icons.flag,
    desc: "PRD, personas, journeys, feature spec, MVP scope, architecture, DB schema and API spec, all before any code.",
    agents: ["Product Manager", "UX Researcher", "Product Strategist", "Solution Architect", "Database Architect", "Security Architect"],
  },
  {
    name: "UI/UX & Design",
    stage: "build",
    icon: icons.layout,
    desc: "Designs in code first: flows, wireframes, tokens, components, responsive layouts and accessibility, then developer handoff.",
    agents: ["UX Architect", "UI Designer", "Design System", "Prototype", "Design QA"],
    flow: ["UX requirements", "Design system", "Code prototype", "Browser preview", "Visual QA", "Figma export"],
  },
  {
    name: "Frontend",
    stage: "build",
    icon: icons.code,
    desc: "A Frontend Lead with specialists for each layer of the default stack, checking its own work in a real browser.",
    agents: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Accessibility", "Frontend QA"],
    flow: ["Build", "Browser test", "Screenshot", "Visual QA", "Fix"],
  },
  {
    name: "Backend",
    stage: "build",
    icon: icons.server,
    desc: "Runs the backend, tests every endpoint, and hands a working API to the frontend team, not just generated code.",
    agents: ["Node.js", "NestJS", "REST APIs", "WebSockets", "Authorization", "API QA"],
    flow: ["Write", "Run", "Test endpoints", "Hand off API"],
  },
  {
    name: "Database",
    stage: "build",
    icon: icons.db,
    desc: "Its own specialist on PostgreSQL + Prisma, from requirements to a schema that performs.",
    agents: ["PostgreSQL", "Prisma", "Redis"],
    flow: ["ERD", "Prisma schema", "Migrations", "Indexes", "Seed data", "Performance checks"],
  },
  {
    name: "Authentication",
    stage: "build",
    icon: icons.key,
    desc: "Starts from tested templates instead of writing auth from scratch on every run.",
    agents: ["Email + password", "OAuth", "Sessions", "Roles & permissions", "Password reset", "Email verification", "2FA", "Organizations"],
  },
  {
    name: "Payments",
    stage: "build",
    icon: icons.coin,
    desc: "Stripe for global, Razorpay for India. Subscriptions, one-time payments, plans, coupons, invoices and failed-payment handling.",
    agents: ["Stripe", "Razorpay", "Webhooks", "Subscriptions", "Invoices"],
    flow: ["Checkout", "Provider", "Webhook", "Database", "Subscription", "Entitlement"],
  },
  {
    name: "AI Integration",
    stage: "build",
    icon: icons.sparkle,
    desc: "One AIProvider layer, so your product isn't locked to a single model vendor.",
    agents: ["Anthropic", "OpenAI", "Gemini", "Embeddings", "RAG", "Vector DB", "Tool calling", "AI evals"],
  },
  {
    name: "QA & Security",
    stage: "build",
    icon: icons.test,
    desc: "A browser agent clicks through the real app: forms, checkout, sign-in and every screen size.",
    agents: ["Browser QA", "Test writer", "Visual QA", "Security reviewer"],
    flow: ["Build", "Browser agent", "Test", "Screenshot", "Fix"],
  },
  {
    name: "DevOps",
    stage: "build",
    icon: icons.refresh,
    desc: "A real deployment agent. It loads a skill per target instead of one hard-coded agent per cloud.",
    agents: ["Docker", "CI/CD", "Env vars", "Domains", "SSL", "DNS", "Monitoring", "Rollback"],
  },
  {
    name: "Content",
    stage: "launch",
    icon: icons.pen,
    desc: "Writes from your research and customers' real pain points, so the content isn't generic AI filler.",
    agents: ["Landing copy", "Blog", "Technical writer", "Docs", "Changelog", "Case studies", "Content QA"],
    flow: ["Research", "Pain points", "SEO research", "Content strategy", "Content"],
  },
  {
    name: "SEO",
    stage: "launch",
    icon: icons.trend,
    desc: "Keywords, search intent, SERP analysis, site architecture, metadata, structured data, sitemap, internal links and Search Console.",
    agents: ["Keywords", "SERP analysis", "Technical SEO", "Content briefs"],
    flow: ["Research", "SEO", "Content", "Developer", "Deploy"],
  },
  {
    name: "Marketing & Social",
    stage: "launch",
    icon: icons.users,
    desc: "Works from your research, product, brand and personas. Community research reads; social drafts; you approve and post.",
    agents: ["Positioning", "Messaging", "Social", "Email", "Creative", "Launch Manager"],
    flow: ["Read communities", "Draft", "Your approval", "You post"],
  },
  {
    name: "Operate",
    stage: "operate",
    icon: icons.chart,
    desc: "After launch: watches analytics, signups, revenue and errors, then proposes fixes for your approval.",
    agents: ["Analytics", "Growth", "Support", "Maintenance"],
    flow: ["Analytics", "Insight", "Proposed fix", "Your approval"],
  },
];

/* ---------- Built-in IDE + browser ---------- */

export const ideFiles = [
  { name: "app/", depth: 0 },
  { name: "page.tsx", depth: 1, active: true },
  { name: "pricing/", depth: 1 },
  { name: "components/", depth: 0 },
  { name: "api/", depth: 0 },
  { name: "prisma/", depth: 0 },
  { name: "schema.prisma", depth: 1 },
];

export const ideTerminal = [
  { cmd: true, text: "npm run dev" },
  { cmd: false, text: "✓ Ready on http://localhost:3000" },
  { cmd: true, text: "npm test" },
  { cmd: false, text: "✓ 42 passed · 0 failed" },
];

export const agentLoop = ["Write code", "Run it", "Open browser", "Inspect", "Screenshot", "Find the problem", "Fix", "Repeat"];

export const browserAbilities = ["Navigate pages", "Click and type", "Upload files", "Test forms", "Test checkout", "Test sign-in", "Responsive layouts", "Screenshots"];

/* ---------- Deploy flows ---------- */

export const deployTargets: { name: string; prompt: string; steps: string[] }[] = [
  {
    name: "Vercel",
    prompt: "Deploy my SaaS to Vercel.",
    steps: ["Detect Next.js", "Build", "Configure env", "Deploy", "Health check", "Production URL"],
  },
  {
    name: "AWS",
    prompt: "Deploy my SaaS to AWS.",
    steps: ["Inspect project", "Detect env vars", "Build Docker image", "Run tests", "Create infrastructure", "Push image", "Deploy", "Domain + SSL", "Health check", "Browser test", "Production URL"],
  },
  {
    name: "Google Cloud",
    prompt: "Deploy my SaaS to Google Cloud.",
    steps: ["Docker image", "Artifact Registry", "Cloud Run", "Cloud SQL", "Cloud Storage", "DNS", "Health check", "Production URL"],
  },
];

/* ---------- Engine: agents, skills, tools ---------- */

export const enginePillars: { name: string; body: string; icon: string; items: string[] }[] = [
  { name: "Agent Runtime", body: "Where agents work: their own browser, IDE, sandbox and memory.", icon: icons.terminal, items: ["Browser", "IDE", "Sandbox", "Memory"] },
  { name: "Tool Gateway", body: "Every real action goes through one gate that you control.", icon: icons.shieldCheck, items: ["Permissions", "Budgets", "Approvals", "Audit"] },
  { name: "Skill Registry", body: "Capabilities agents load on demand, added without new agents.", icon: icons.logo, items: ["Vercel", "AWS", "Google Cloud", "Docker", "Stripe", "Razorpay", "Next.js", "PostgreSQL"] },
];

export const engineChains: string[][] = [
  ["DevOps Agent", "AWS Deployment Skill", "Tool Gateway", "AWS APIs"],
  ["Payment Agent", "Stripe Skill", "Stripe Tool", "Stripe API"],
  ["Frontend Agent", "Next.js Skill", "IDE + Terminal + Browser", "Working UI"],
];

/* ---------- Hero demo ---------- */

export type DemoAgent = {
  name: string;
  icon: string;
  status: RunStatus;
  line: string;
  pct: number;
};

export type DemoPreset = {
  label: string;
  mobileLabel?: string;
  slug: string;
  goal: string;
  short: string;
  plan: string;
  result: string;
  agents: DemoAgent[];
  availability?: Availability;
};

const agent = (
  name: string,
  icon: string,
  status: RunStatus,
  line: string,
  pct: number,
): DemoAgent => ({ name, icon, status, line, pct });

const flagshipIdea = "an AI interview-prep SaaS for developers";

export const demoPresets: DemoPreset[] = [
  {
    label: "Validate my idea",
    mobileLabel: "Validate",
    slug: "validate-idea",
    goal: `Validate ${flagshipIdea}. Is there demand, and who already serves it?`,
    short: "Validate: AI interview-prep SaaS",
    plan: "Planning 6 tasks",
    result: "validation-report.pdf · go / pivot / no-go",
    availability: stageAvailability.validate,
    agents: [
      agent("Market", icons.search, "run", "Sizing the dev-hiring market…", 62),
      agent("Community", icons.users, "run", "Reading r/cscareerquestions…", 38),
      agent("Competitor", icons.target, "done", "Mapped 9 products", 100),
    ],
  },
  {
    label: "Competitor analysis",
    mobileLabel: "Competitors",
    slug: "competitor-analysis",
    goal: `Compare every product that already serves ${flagshipIdea}: features, pricing, gaps.`,
    short: "Competitors: interview-prep tools",
    plan: "Planning 4 tasks",
    result: "competitor-matrix.xlsx · pricing tiers · sources",
    availability: stageAvailability.validate,
    agents: [
      agent("Competitor", icons.target, "done", "Mapped 9 products", 100),
      agent("Pricing", icons.coin, "run", "Comparing pricing tiers…", 54),
      agent("Fact-check", icons.shieldCheck, "wait", "Waiting for matrix", 0),
    ],
  },
  {
    label: "Write my PRD",
    mobileLabel: "PRD",
    slug: "write-prd",
    goal: `Write the PRD for ${flagshipIdea}, using the validation research.`,
    short: "PRD: AI interview-prep SaaS",
    plan: "Planning 5 tasks",
    result: "prd.docx · personas · MVP scope · schema",
    availability: stageAvailability.plan,
    agents: [
      agent("Product", icons.flag, "run", "Scoping the MVP…", 47),
      agent("UX", icons.layout, "run", "Drafting user journeys…", 30),
      agent("Architect", icons.db, "wait", "Waiting for scope", 0),
    ],
  },
  {
    label: "Pitch deck",
    slug: "pitch-deck",
    goal: `Build an investor pitch deck for ${flagshipIdea} from the research and PRD.`,
    short: "Pitch deck: interview-prep SaaS",
    plan: "Planning 4 tasks",
    result: "pitch-deck.pptx · 12 slides · sources",
    availability: stageAvailability.plan,
    agents: [
      agent("Analyst", icons.chart, "done", "Market slides ready", 100),
      agent("Writer", icons.pen, "run", "Writing the story arc…", 58),
      agent("Designer", icons.layout, "run", "Laying out slides…", 22),
    ],
  },
  {
    label: "Launch plan",
    slug: "launch-plan",
    goal: `Prepare the launch kit for ${flagshipIdea}: SEO, Product Hunt, Reddit and email.`,
    short: "Launch kit: interview-prep SaaS",
    plan: "Planning 6 tasks",
    result: "launch checklist · PH + Reddit drafts (you post)",
    availability: stageAvailability.launch,
    agents: [
      agent("SEO", icons.trend, "done", "Clustered 40 keywords", 100),
      agent("Social", icons.users, "run", "Reading subreddit rules…", 44),
      agent("Launch", icons.flag, "wait", "Waiting for drafts", 0),
    ],
  },
];

/* ---------- Founder problem ---------- */

export const founderRoles = [
  "Product manager",
  "Researcher",
  "Designer",
  "Developer",
  "QA",
  "DevOps",
  "Marketer",
  "SEO",
  "Content writer",
  "Growth",
];

/* ---------- How it works ---------- */

export const steps: {
  n: string;
  title: string;
  body: string;
  code: string;
  stage?: StageKey;
}[] = [
  {
    n: "01",
    title: "Describe your idea",
    body: "One sentence is enough. Add notes, links or an existing repo if you have them.",
    code: "“AI interview-prep SaaS\nfor developers.”",
  },
  {
    n: "02",
    title: "Validate & plan",
    body: "Researchers test the market, then the product team writes the spec.",
    code: "→ market size\n→ 9 competitors mapped\n→ community insight\n→ PRD + MVP scope",
    stage: "plan",
  },
  {
    n: "03",
    title: "Build",
    body: "Engineers ship a Next.js app from tested templates, with QA and a preview URL.",
    code: "next.js · postgres\nauth · stripe\ntests ✓ · browser QA ✓\npreview URL",
    stage: "build",
  },
  {
    n: "04",
    title: "Launch",
    body: "SEO, content and launch drafts, ready for you to approve and post.",
    code: "landing copy + meta\nproduct hunt kit\nreddit drafts (you post)\nemail sequence",
    stage: "launch",
  },
];

export const howFlow = ["Your idea", "AI product team", "Validate", "Plan", "Build", "Launch", "Your SaaS"];

/* ---------- Live execution ---------- */

export const runAgents: {
  name: string;
  role: string;
  status: RunStatus;
  line: string;
  pct: number;
}[] = [
  { name: "Market Researcher", role: "validate · web", status: "run", line: "Sizing developer hiring spend", pct: 62 },
  { name: "Competitor Analyst", role: "validate · browser", status: "done", line: "Mapped 9 products", pct: 100 },
  { name: "Community Researcher", role: "validate · read-only", status: "run", line: "Reading r/cscareerquestions threads", pct: 41 },
  { name: "Pricing Analyst", role: "validate", status: "wait", line: "Waiting for competitor matrix", pct: 0 },
  { name: "Fact-Checker", role: "verification", status: "wait", line: "Waiting for findings", pct: 0 },
];

export const runStats = [
  { value: "14", label: "TASKS COMPLETED" },
  { value: "3", label: "AGENTS ACTIVE" },
  { value: "31", label: "CREDITS USED · EST. 44" },
];

export const runLog: { t: string; hue: Hue; who: string; msg: string }[] = [
  { t: "00:00", hue: "brand", who: "planner", msg: "split idea into validate → plan graph" },
  { t: "00:02", hue: "sky", who: "competitor", msg: "started · browser" },
  { t: "00:02", hue: "sky", who: "market", msg: "started · web search" },
  { t: "00:05", hue: "sky", who: "community", msg: "read subreddit rules · read-only" },
  { t: "00:41", hue: "mint", who: "competitor", msg: "done · 9 products mapped" },
  { t: "01:12", hue: "brand", who: "market", msg: "retried 1 failed fetch" },
  { t: "01:30", hue: "sky", who: "community", msg: "12 pain points tagged" },
  { t: "01:34", hue: "dim", who: "fact-checker", msg: "queued · waits on findings" },
];

/* ---------- App builders comparison ---------- */

/** 2 = strong · 1 = partial · 0 = none */
export type Coverage = 0 | 1 | 2;

export const compareColumns = [
  { label: "Research", edge: true },
  { label: "Spec", edge: true },
  { label: "Design", edge: false },
  { label: "Code", edge: false },
  { label: "QA", edge: false },
  { label: "Deploy", edge: false },
  { label: "SEO", edge: true },
  { label: "Launch", edge: true },
  { label: "Operate", edge: true },
];

export const compareRows: { name: string; ours?: boolean; cells: Coverage[] }[] = [
  { name: "AI app builders", cells: [0, 0, 1, 2, 1, 2, 0, 0, 0] },
  { name: "Chat assistants", cells: [1, 1, 0, 1, 0, 0, 1, 1, 0] },
  { name: "General AI agents", cells: [2, 1, 0, 1, 0, 0, 1, 0, 0] },
  { name: "SaaS Launch", ours: true, cells: [2, 2, 1, 2, 2, 2, 2, 2, 2] },
];

export const comparePoints = [
  "Before code: validation, research, pricing, PRD",
  "After code: SEO, content, launch kit, growth",
  "One memory connects every stage",
];

/* ---------- Opinionated stack ---------- */

export const stack = [
  { k: "Frontend", v: "Next.js · React · TypeScript" },
  { k: "UI", v: "Tailwind CSS · shadcn/ui" },
  { k: "Backend", v: "Route handlers · NestJS" },
  { k: "Database", v: "PostgreSQL · Prisma · Redis" },
  { k: "Auth", v: "One templated auth library" },
  { k: "Payments", v: "Stripe · Razorpay" },
  { k: "AI", v: "One provider layer · 3 vendors" },
  { k: "Deploy", v: "Vercel · AWS · Google Cloud" },
  { k: "Analytics", v: "PostHog" },
  { k: "Email", v: "Resend" },
];

export const stackReasons = ["Faster runs", "Fewer failures", "Cheaper tokens", "Regression-tested"];

/* ---------- You stay in control ---------- */

export const postingFlow: { label: string; tone: "neutral" | "brand" | "mint" }[] = [
  { label: "Read communities", tone: "neutral" },
  { label: "Find threads", tone: "neutral" },
  { label: "Read the rules", tone: "neutral" },
  { label: "Draft a reply", tone: "neutral" },
  { label: "Your approval", tone: "brand" },
  { label: "You post", tone: "mint" },
];

export const controlItems = [
  { name: "Approval before anything external", body: "Nothing is posted, sent or deployed without your yes.", icon: icons.check },
  { name: "Sources on every claim", body: "Research links back to where each finding came from.", icon: icons.link },
  { name: "Your GitHub, your code", body: "Code lands in a repository you own.", icon: icons.code },
  { name: "Your accounts", body: "Deploys, payments and socials stay on your accounts.", icon: icons.key },
  { name: "Full run log", body: "Every agent step, tool call and retry, recorded.", icon: icons.file },
  { name: "Encryption and retention", body: "Encrypted in transit and at rest. You choose how long we keep it.", icon: icons.lock },
];

/* ---------- Pricing ---------- */

export type PricingTier = {
  name: string;
  desc: string;
  price: string;
  unit: string;
  note: string;
  cta: string;
  href: string;
  featured: boolean;
  features: string[];
  /** Stage this plan depends on; shows its availability badge when not live. */
  stage?: StageKey;
};

// Prices stay placeholders until beta pricing is validated (POSITIONING §8).
export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    desc: "See what the team finds before you pay.",
    price: "$0",
    unit: "",
    note: "No credit card",
    cta: "Start with your idea",
    href: routes.start,
    featured: false,
    features: ["1 validation report", "Market and competitor research", "Go / pivot / no-go summary", "Watermarked export"],
  },
  {
    name: "Validate + Plan",
    desc: "For founders testing an idea properly.",
    price: "[PRICE]",
    unit: "one-time",
    note: "Per idea",
    cta: "Validate an idea",
    href: routes.start,
    featured: false,
    features: ["Full validation report", "Competitor matrix (XLSX)", "SEO keyword list", "PRD, personas, MVP scope", "Architecture and DB schema", "Pitch deck (PPTX)"],
  },
  {
    name: "Launch pack",
    desc: "The whole path from idea to launch.",
    price: "[PRICE]",
    unit: "one-time",
    note: "Per project · credits included",
    cta: "Start a launch",
    href: routes.start,
    featured: true,
    features: ["Everything in Validate + Plan", "Launch kit: SEO, content, drafts", "Product Hunt and Reddit drafts", "Email sequence and checklist", "Build stage when it ships"],
  },
  {
    name: "Operate",
    desc: "Keep an AI team on the business after launch.",
    price: "[PRICE]",
    unit: "/month",
    note: "Lower monthly price",
    cta: "Join the waitlist",
    href: routes.start,
    featured: false,
    stage: "operate",
    features: ["Weekly metrics report", "Anomaly alerts", "Proposed fixes for approval"],
  },
  {
    name: "Studio / Team",
    desc: "For agencies and small teams running several projects.",
    price: "Custom",
    unit: "",
    note: "Billed monthly",
    cta: "Contact us",
    href: "#",
    featured: false,
    features: ["Multiple projects", "Shared workspace", "Priority support"],
  },
];

export const creditEstimate = [
  { k: "Market Researcher", v: 18 },
  { k: "Competitor Analyst", v: 12 },
  { k: "Community Researcher", v: 8 },
  { k: "Fact-Checker", v: 6 },
];

/* ---------- FAQ ---------- */

const listOf = (names: string[]) => new Intl.ListFormat("en", { type: "conjunction" }).format(names);
const liveNow = listOf(stages.filter((s) => isLive(s.key)).map((s) => s.name));
const comingNext = listOf(stages.filter((s) => !isLive(s.key)).map((s) => s.name));

export const faqs = [
  { q: "What is SaaS Launch?", a: "An AI product team in one workspace. Specialist agents validate your idea, write the spec, build a Next.js app and prepare the launch, and you approve each step. It runs on the AI Swarm engine." },
  { q: "What can I use today?", a: `${liveNow} are live in the beta: research, competitors, pricing, SEO keywords, PRD, personas, architecture and a pitch deck, exported as PDF, DOCX, XLSX or PPTX. ${comingNext} are coming in later releases, and we only mark a stage live once it works.` },
  { q: "Will it make my SaaS successful?", a: "No tool can promise that. We make sure you launch faster, with real research behind every decision." },
  { q: "How is this different from AI app builders?", a: "App builders start at code and stop at a running app. SaaS Launch also covers what comes before code (validation, research, spec) and after it (SEO, content, launch), with one shared memory across all of it." },
  { q: "I already built my app with another tool. Can I still use this?", a: "Yes. The Validate, Plan and Launch stages don't need our code. Importing an existing repository for the launch kit is on the roadmap." },
  { q: "Which tech stack do you build with?", a: "Next.js, TypeScript, Tailwind and shadcn/ui, PostgreSQL with Prisma, Stripe or Razorpay, deployed to Vercel. One stack means tested templates, faster runs and fewer failures. Other stacks come later." },
  { q: "Do the agents actually run the code they write?", a: `That's how the Build stage works: each coding agent gets its own IDE, terminal and browser. It runs the app, tests it, takes screenshots and fixes what breaks, then repeats. ${isLive("build") ? "It's live now." : "It ships with the Build stage."}` },
  { q: "Where can it deploy?", a: "Vercel by default, plus AWS and Google Cloud through deployment skills. Deploys run on your own accounts, and nothing goes live without your approval." },
  { q: "Can it design in Figma?", a: "Design starts in code: a design system and a working prototype you can preview in the browser and check visually. Figma export is planned as an integration, not a dependency." },
  { q: "What's the difference between agents, skills and tools?", a: "Agents are roles, like DevOps or Payments. Skills are capabilities they load, like AWS deployment or Stripe billing. Tools are what actually executes, through a gateway with permissions, budgets, approvals and an audit log." },
  { q: "Do you post to Reddit, Product Hunt or X for me?", a: "No. Agents read community rules and draft posts and replies. You review them and post them yourself. No auto-posting, no fake accounts." },
  { q: "Do I own the code and documents?", a: "Yes. Documents are yours to download, and code goes into a GitHub repository on your account." },
  { q: "How are credits calculated?", a: "Each agent step uses credits based on the model and tools it calls. You see an estimate before a run and the actual usage after. [ADD CREDIT RATES]" },
  { q: "Is there a free plan?", a: "Yes. Your first validation report is free, with no credit card." },
];

/* ---------- Footer ---------- */

export const footerColumns = [
  { heading: "PRODUCT", links: ["Stages", "Team", "How it works", "Stack", "Pricing"] },
  { heading: "RESOURCES", links: ["Docs", "Blog", "Sample reports", "Changelog"] },
  { heading: "COMPANY", links: ["About", "Contact", "Security", "Status"] },
  { heading: "LEGAL", links: ["Privacy", "Terms"] },
];
