import { icons } from "./icons";
import type { Hue, RunStatus } from "./tones";

/* ---------- Navigation ---------- */

export const routes = {
  start: "/register",
  signIn: "/login",
} as const;

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Agents", href: "#agents" },
  { label: "Swarms", href: "#swarms" },
  { label: "Templates", href: "#use-cases" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#developers" },
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
};

const agent = (
  name: string,
  icon: string,
  status: RunStatus,
  line: string,
  pct: number,
): DemoAgent => ({ name, icon, status, line, pct });

export const demoPresets: DemoPreset[] = [
  {
    label: "Research competitors",
    slug: "competitor-research",
    goal: "Research the top AI coding-agent products and compare pricing and features.",
    short: "Research AI coding-agent competitors",
    plan: "Planning 4 tasks",
    result: "competitors.md · pricing matrix · sources",
    agents: [
      agent("Researcher", icons.search, "run", "Searching sources…", 62),
      agent("Analyst", icons.chart, "run", "Comparing pricing tiers…", 38),
      agent("Competitor", icons.target, "done", "Mapped 9 products", 100),
    ],
  },
  {
    label: "Build a SaaS",
    slug: "saas-mvp",
    goal: "Scaffold a Next.js SaaS with auth, billing and a dashboard.",
    short: "Scaffold a Next.js SaaS MVP",
    plan: "Planning 6 tasks",
    result: "repo · README · passing tests",
    agents: [
      agent("Architect", icons.layout, "done", "Schema + routes drafted", 100),
      agent("Coder", icons.code, "run", "Writing billing webhooks…", 54),
      agent("Tester", icons.test, "wait", "Waiting for build", 0),
    ],
  },
  {
    label: "Analyze data",
    slug: "data-analysis",
    goal: "Find what drove churn in last quarter’s subscription export.",
    short: "Explain last quarter’s churn",
    plan: "Planning 3 tasks",
    result: "charts · findings summary",
    agents: [
      agent("Data agent", icons.db, "done", "Cleaned 3 CSV files", 100),
      agent("Analyst", icons.chart, "run", "Testing churn drivers…", 47),
      agent("Writer", icons.pen, "wait", "Waiting for findings", 0),
    ],
  },
  {
    label: "Create SEO content",
    mobileLabel: "SEO content",
    slug: "seo-article",
    goal: "Write a search-ready guide on multi-agent AI for developers.",
    short: "SEO guide: multi-agent AI",
    plan: "Planning 5 tasks",
    result: "article draft · meta tags · outline",
    agents: [
      agent("SEO agent", icons.trend, "done", "Clustered keywords", 100),
      agent("Researcher", icons.search, "run", "Reading primary sources…", 58),
      agent("Writer", icons.pen, "run", "Drafting section 2…", 22),
    ],
  },
  {
    label: "Debug code",
    slug: "debug-session",
    goal: "Find why checkout fails intermittently in production.",
    short: "Fix intermittent checkout failure",
    plan: "Planning 4 tasks",
    result: "patch · root-cause note · tests",
    agents: [
      agent("Log reader", icons.search, "done", "Traced race condition", 100),
      agent("Coder", icons.code, "run", "Patching retry logic…", 66),
      agent("Tester", icons.test, "wait", "Waiting for patch", 0),
    ],
  },
];

/* ---------- How it works ---------- */

export const steps = [
  {
    n: "01",
    title: "Describe your goal",
    body: "Plain language. One sentence or a full brief with files attached.",
    code: "“Analyze the AI\ncoding-agent market.”",
  },
  {
    n: "02",
    title: "The swarm plans",
    body: "The orchestrator breaks the goal into tasks and picks an agent for each.",
    code: "→ research competitors\n→ analyze pricing\n→ compare features\n→ find openings",
  },
  {
    n: "03",
    title: "Agents execute",
    body: "Specialists work in parallel, pass results along, and retry what fails.",
    code: "researcher   running\nanalyst      running\ncompetitor   done\nreviewer     queued",
  },
  {
    n: "04",
    title: "You get the result",
    body: "Reviewed output as real files, with the sources and steps behind it.",
    code: "report.md\npricing.csv\nsources.json\nrun_log.txt",
  },
];

/* ---------- Live execution ---------- */

export const runAgents: {
  name: string;
  role: string;
  status: RunStatus;
  line: string;
  pct: number;
}[] = [
  { name: "Researcher", role: "research · web", status: "run", line: "Reading pricing page 7 of 12", pct: 62 },
  { name: "Analyst", role: "analysis", status: "run", line: "Building feature matrix", pct: 41 },
  { name: "Competitor", role: "research · browser", status: "done", line: "Mapped 9 products", pct: 100 },
  { name: "Reviewer", role: "verification", status: "wait", line: "Waiting for analyst", pct: 0 },
  { name: "Writer", role: "content", status: "wait", line: "Waiting for review", pct: 0 },
];

export const runStats = [
  { value: "17", label: "TASKS COMPLETED" },
  { value: "3", label: "AGENTS ACTIVE" },
  { value: "31", label: "CREDITS USED · EST. 44" },
];

export const runLog: { t: string; hue: Hue; who: string; msg: string }[] = [
  { t: "00:00", hue: "brand", who: "orchestrator", msg: "split goal into 5 tasks" },
  { t: "00:02", hue: "sky", who: "competitor", msg: "started · browser" },
  { t: "00:02", hue: "sky", who: "researcher", msg: "started · web search" },
  { t: "00:41", hue: "mint", who: "competitor", msg: "done · 9 products mapped" },
  { t: "00:43", hue: "sky", who: "analyst", msg: "started · feature matrix" },
  { t: "01:12", hue: "brand", who: "researcher", msg: "retried 1 failed fetch" },
  { t: "01:30", hue: "sky", who: "analyst", msg: "pricing tiers 4 of 9" },
  { t: "01:34", hue: "dim", who: "reviewer", msg: "queued · waits on analyst" },
];

/* ---------- Agent library ---------- */

export const agentCategories = [
  "All",
  "Research",
  "Development",
  "Business",
  "Content",
  "Data",
  "Automation",
] as const;

export type AgentCategory = (typeof agentCategories)[number];

export const libraryAgents: {
  name: string;
  cat: Exclude<AgentCategory, "All">;
  icon: string;
  desc: string;
  tools: string[];
  io: string;
}[] = [
  { name: "Research Agent", cat: "Research", icon: icons.search, desc: "Finds sources, gathers evidence and summarizes what it found.", tools: ["web-search", "browser"], io: "in: question · out: brief.md" },
  { name: "Coding Agent", cat: "Development", icon: icons.code, desc: "Writes, refactors and explains code against your repository.", tools: ["github", "sandbox"], io: "in: spec · out: diff" },
  { name: "Data Analyst", cat: "Data", icon: icons.chart, desc: "Cleans datasets, runs the analysis and charts the results.", tools: ["csv", "sql"], io: "in: dataset · out: charts" },
  { name: "Competitor Agent", cat: "Business", icon: icons.target, desc: "Maps competitors’ features, pricing and positioning.", tools: ["web-search", "browser"], io: "in: market · out: matrix.csv" },
  { name: "SEO Agent", cat: "Content", icon: icons.trend, desc: "Clusters keywords and checks drafts against search intent.", tools: ["keywords", "serp"], io: "in: topic · out: brief" },
  { name: "Writer Agent", cat: "Content", icon: icons.pen, desc: "Turns research and outlines into structured, editable drafts.", tools: ["docs", "markdown"], io: "in: outline · out: draft.md" },
  { name: "Reviewer Agent", cat: "Automation", icon: icons.shieldCheck, desc: "Checks other agents’ output, flags gaps and requests retries.", tools: ["diff", "citations"], io: "in: output · out: review" },
  { name: "Browser Agent", cat: "Automation", icon: icons.browser, desc: "Navigates sites, fills forms and extracts structured page data.", tools: ["browser", "mcp"], io: "in: url · out: data.json" },
  { name: "DevOps Agent", cat: "Development", icon: icons.server, desc: "Reads logs, drafts configs and prepares deploy steps.", tools: ["github", "webhooks"], io: "in: logs · out: config" },
  { name: "Finance Agent", cat: "Business", icon: icons.coin, desc: "Builds models from spreadsheets and flags anomalies.", tools: ["csv", "sheets"], io: "in: sheet · out: model.xlsx" },
];

/* ---------- Ready-made swarms ---------- */

export const readySwarms: {
  cat: string;
  hue: Hue;
  name: string;
  desc: string;
  steps: string[];
  meta: string;
}[] = [
  { cat: "Business", hue: "amber", name: "SaaS Launch Swarm", desc: "From market scan to a launch plan you can act on this week.", steps: ["Market research", "Competitor analysis", "Customer research", "Pricing", "Launch plan"], meta: "5 agents · reviewer on" },
  { cat: "Content", hue: "pink", name: "SEO Content Swarm", desc: "Keyword to publish-ready draft, checked against search intent.", steps: ["Keyword research", "Source research", "Outline", "Writing", "SEO review"], meta: "4 agents · reviewer on" },
  { cat: "Development", hue: "sky", name: "Development Swarm", desc: "Spec to reviewed pull request, with tests written alongside.", steps: ["Product manager", "Architect", "Developer", "Code reviewer", "QA"], meta: "5 agents · github required" },
];

/* ---------- Swarm builder ---------- */

export const builderAddItems = ["Agent", "Tool", "Condition", "Memory", "Output"];

/* ---------- Integrations ---------- */

export const integrations = [
  "GitHub",
  "GitLab",
  "Notion",
  "Slack",
  "Google Drive",
  "PostgreSQL",
  "REST APIs",
  "Web search",
  "Browser",
  "MCP",
  "Webhooks",
  "Custom tools",
];

export const toolFlow: { label: string; highlight: boolean }[] = [
  { label: "Agent", highlight: true },
  { label: "Tool call", highlight: false },
  { label: "Data", highlight: false },
  { label: "Decision", highlight: false },
  { label: "Next agent", highlight: true },
];

/* ---------- Memory + review ---------- */

export const memoryTree = [
  { branch: "├──", name: "knowledge/", note: "docs you upload" },
  { branch: "├──", name: "past-runs/", note: "what worked before" },
  { branch: "├──", name: "agent-memory/", note: "per-agent notes" },
  { branch: "├──", name: "instructions.md", note: "house rules" },
  { branch: "└──", name: "outputs/", note: "every file produced" },
];

export const reviewChain = ["Researcher", "Analyst", "Fact checker", "Reviewer", "Output"];

export const reviewChecks = [
  { label: "Sources attached", icon: icons.link },
  { label: "Claims checked", icon: icons.check },
  { label: "Output reviewed", icon: icons.eye },
  { label: "Failed task retried", icon: icons.refresh },
];

/* ---------- Use cases ---------- */

export const useCases: { name: string; icon: string; hue: Hue; items: string[] }[] = [
  { name: "Development", icon: icons.code, hue: "sky", items: ["Software development", "Code review", "QA and testing", "Debugging", "DevOps", "Architecture"] },
  { name: "Research", icon: icons.search, hue: "mint", items: ["Market research", "Competitor analysis", "Deep research", "Document analysis", "Data research"] },
  { name: "Business", icon: icons.briefcase, hue: "amber", items: ["Strategy", "Reporting", "Operations", "Analytics", "Planning"] },
  { name: "Content", icon: icons.pen, hue: "pink", items: ["SEO", "Blog writing", "Content research", "Social media", "Documentation"] },
];

/* ---------- Developers ---------- */

export const devBadges = ["TypeScript", "Next.js", "API-first", "MCP", "Webhooks", "Custom agents"];

export const devFeatures = [
  { k: "REST API", v: "Start runs, read results, manage agents" },
  { k: "SDK", v: "Typed TypeScript client with event streaming" },
  { k: "Webhooks", v: "Get notified when a task or run finishes" },
  { k: "MCP", v: "Expose your own servers as agent tools" },
  { k: "Custom tools", v: "Wrap any HTTP endpoint as a tool" },
];

/* ---------- Case studies (placeholders until real) ---------- */

export const caseStudies = [
  { tag: "RESEARCH · [COMPANY]", title: "Automated weekly market research", flow: "research → analysis → review → report" },
  { tag: "CONTENT · [COMPANY]", title: "SEO briefs without the manual research", flow: "keywords → sources → outline → SEO review" },
];

/* ---------- Pricing ---------- */

export type PricingTier = {
  name: string;
  desc: string;
  price: { monthly: string; yearly: string };
  unit: string;
  note: { monthly: string; yearly: string };
  cta: string;
  href: string;
  featured: boolean;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    desc: "For trying swarms on real tasks.",
    price: { monthly: "$0", yearly: "$0" },
    unit: "/month",
    note: { monthly: "No credit card", yearly: "No credit card" },
    cta: "Start Free",
    href: routes.start,
    featured: false,
    features: ["5 swarm runs / month", "Core agents and templates", "Limited web research", "Up to 3 agents per swarm", "7-day run history"],
  },
  {
    name: "Pro",
    desc: "For builders running swarms every week.",
    price: { monthly: "$19", yearly: "$15" },
    unit: "/month",
    note: { monthly: "Billed monthly", yearly: "Billed $182 yearly" },
    cta: "Start Pro",
    href: routes.start,
    featured: true,
    features: ["100 swarm runs / month", "Advanced agents and models", "Custom agents", "Project memory", "Scheduling and webhooks", "Exports", "API access"],
  },
  {
    name: "Business",
    desc: "For teams sharing agents and workflows.",
    price: { monthly: "$149+", yearly: "$119+" },
    unit: "/month",
    note: { monthly: "Billed monthly", yearly: "Billed yearly" },
    cta: "Contact Sales",
    href: "#",
    featured: false,
    features: ["Team workspaces", "Shared and private agents", "Roles and permissions", "SSO", "Audit logs", "Usage controls", "Priority support"],
  },
];

export const creditEstimate = [
  { k: "Research agent", v: 18 },
  { k: "Analyst agent", v: 12 },
  { k: "Writer agent", v: 8 },
  { k: "Reviewer", v: 6 },
];

/* ---------- Security ---------- */

export const securityItems = [
  { name: "Encryption", body: "Data encrypted in transit and at rest.", icon: icons.lock },
  { name: "Access controls", body: "Choose which tools each agent can call.", icon: icons.shield },
  { name: "Workspace permissions", body: "Roles decide who can run, edit or share.", icon: icons.users },
  { name: "API-key security", body: "Scoped keys, rotation and revocation.", icon: icons.key },
  { name: "Audit logs", body: "Every run, tool call and change, recorded.", icon: icons.file },
  { name: "Data retention", body: "Set how long runs and outputs are kept.", icon: icons.clock },
];

/* ---------- FAQ ---------- */

export const faqs = [
  { q: "What is an AI swarm?", a: "A group of specialized AI agents coordinated toward one goal. An orchestrator splits the goal into tasks, agents handle them in parallel or in sequence, and a reviewer checks the combined output before you get it." },
  { q: "How is an AI swarm different from an AI agent?", a: "An agent does one job with its own tools. A swarm is several agents plus the plan and the hand-offs between them, so larger jobs get split instead of crammed into one context." },
  { q: "How do multiple AI agents work together?", a: "The orchestrator assigns tasks, agents pass results through shared project context, and reviewer steps can send work back for another pass." },
  { q: "Can I create my own agents?", a: "Yes, on Pro and above. Set the instructions, tools, memory access and output format, then use the agent alone or inside any swarm." },
  { q: "Which AI models are supported?", a: "[LIST THE MODELS AI SWARM SUPPORTS AT LAUNCH, AND WHETHER USERS CAN PICK PER AGENT.]" },
  { q: "Can agents browse the web?", a: "Yes, through the web-search and browser tools, for agents you enable them on." },
  { q: "Can I connect my own APIs?", a: "Yes. Wrap any HTTP endpoint as a custom tool, or trigger and receive runs with webhooks." },
  { q: "Does AI Swarm support MCP?", a: "Yes. Connect an MCP server and its tools become available to the agents you choose." },
  { q: "How are credits calculated?", a: "Each agent step uses credits based on the model and tools it calls. You see an estimate before a run and the actual usage after. [ADD CREDIT RATES]" },
  { q: "What happens when an agent fails?", a: "The task is retried up to the limit you set. If it still fails, the run pauses on that step and shows you what broke instead of quietly returning a partial result." },
  { q: "Can I schedule a swarm?", a: "Yes, on Pro and above: run any swarm on a schedule or from a webhook." },
  { q: "Is AI Swarm free?", a: "There is a free plan with 5 runs a month and no credit card. Upgrade when you need more runs, custom agents or the API." },
];

/* ---------- Footer ---------- */

export const footerColumns = [
  { heading: "PRODUCT", links: ["Agents", "Swarms", "Templates", "Integrations", "Pricing", "API"] },
  { heading: "RESOURCES", links: ["Docs", "Blog", "Guides", "Case studies", "Changelog"] },
  { heading: "COMPANY", links: ["About", "Contact", "Security", "Status"] },
  { heading: "LEGAL", links: ["Privacy", "Terms"] },
];
