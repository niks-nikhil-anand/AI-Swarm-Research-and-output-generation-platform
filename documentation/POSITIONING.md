# AI Swarm: Positioning

> **Category:** AI SaaS Launch Platform
> **One-liner:** Give your SaaS idea an AI product team, from research to code, marketing and launch.
> **Engine vs product:** *AI Swarm* is the engine (planner, DAG, agents, Tool Gateway, sandboxes). The customer buys **SaaS Launch**, a narrow, opinionated workflow on top of it.

---

## 1. Pressure test before we commit

The positioning is stronger than "multi-agent framework." It also creates four problems. Each one is resolved later in this doc.

| # | Weak point | Why it matters | Resolution |
|---|---|---|---|
| 1 | **The "Build" step is the most crowded AI market there is.** | Lovable, Bolt, v0, Replit Agent, Base44 and others already turn prompts into apps. They are well funded and years ahead on code generation. Leading with "we build your React app" puts us in the weakest possible spot. | **Lead with what app builders don't do:** validation, research, product spec, and go-to-market. Treat code as one stage of the launch, not the headline (§4). |
| 2 | **The flagship "Idea → Production" workflow needs the hardest parts of the system.** | Code, tests, browser QA and deploy need sandboxes (PROJECT_PLAN Phase 3, weeks 9–14). Leading with it at launch breaks the ASAP plan. | **Stage the promise** (§6). The current MVP (research → PDF/DOCX/PPTX) *is* the first stage of SaaS Launch: market research, competitor analysis, PRD, pricing, launch plan. We ship "Plan my SaaS" first. |
| 3 | **Solo founders are a hard market.** | They are price-sensitive, churn fast, and get pitched AI tools every day. A monthly subscription for "a team" they use during one launch will churn after that launch. | Price **per launch / per project pack** plus a lower monthly "Operate" plan after launch (§8). The Operate loop (§5.7) is what turns a one-off into retention. |
| 4 | **"Figma screens" is harder than it sounds.** | Figma's public API is built mainly for reading files. Creating designs usually goes through plugins, which is much harder to automate reliably. | Design in code first (Tailwind + shadcn/ui, rendered previews, screenshots). Figma export is a later feature, not a launch promise. |

Two points in the pasted positioning are right and should be kept:
- **A fixed tech stack.** It does more than reduce agent decision-making. It makes **evaluation possible**: one known-good stack can be regression-tested. Twenty stacks can't.
- **Human-approved posting for Reddit, Product Hunt, LinkedIn, X and email.** It is the only version that doesn't get accounts banned, and it matches the approval architecture already in PROJECT_PLAN (Module N, Tool Gateway).

---

## 2. Positioning statement

**For** solo founders, indie hackers and 2–5 person startup teams
**who** have a SaaS idea but have to be the PM, researcher, designer, developer, QA, marketer and SEO person at once,
**SaaS Launch** is an AI product team in one workspace
**that** validates the idea, writes the spec, builds a production-ready Next.js app, and prepares the go-to-market launch,
**unlike** AI app builders (which start at code and stop at a running app) or chat assistants (which answer but don't deliver),
**we** cover the whole path from *idea → validated plan → working product → launch → growth*, with every step visible, verifiable and approved by you.

### Taglines (defensible)

- **"Launch your SaaS with an AI team."**
- "Give your idea an AI product team."
- "From SaaS idea to launch, with an AI team working alongside you."

### Never say

- ~~"Build and launch a successful SaaS automatically."~~ We can't guarantee market success.
- ~~"One click → finished SaaS."~~ It sets up disappointment and refunds.
- ~~"We build anything."~~ We are optimized for modern web SaaS.
- ~~"Auto-post to Reddit."~~ Drafts only. You post.

---

## 3. Target customer

| Segment | Priority | Why |
|---|---|---|
| **Solo technical founders / indie hackers** | Primary | Can code, but lose weeks on research, positioning, SEO and launch. They value the non-code stages most. |
| **Non-technical solo founders** | Secondary | Want the whole thing built. Highest willingness to pay, but also the highest support load and the most "it doesn't work" risk. |
| **Small startup teams (2–5)** | Secondary | Use it as extra hands on research, marketing and QA. Better retention. |
| **Agencies / studios building MVPs for clients** | Expansion | Repeat usage, multiple projects, team plan. |

**The problem, in their words:** "I'm one person trying to be a whole company."

```text
Product Manager · Researcher · Designer · Developer · QA · DevOps
Marketer · SEO specialist · Content writer · Growth marketer
                     ↓
               ONE FOUNDER
```

---

## 4. Differentiation: where we win

```text
                   Research  Spec/PRD  Design  Code  Test/QA  Deploy  SEO/Content  Social/Launch  Operate
AI app builders       ·         ·        ◐      ●      ◐        ●         ·             ·            ·
Chat assistants       ◐         ◐        ·      ◐      ·        ·         ◐             ◐            ·
General AI agents     ●         ◐        ·      ◐      ·        ·         ◐             ·            ·
SaaS Launch           ●         ●        ◐      ●      ●        ●         ●             ●            ●
                                                        ● strong  ◐ partial  · none
```

**Our wedge is the ends of the pipeline, not the middle:**
1. **Before code:** validation, market and competitor research, Reddit/community insight, pricing, PRD, personas, MVP scope. App builders skip all of this.
2. **After code:** SEO, content, social drafts, Product Hunt kit, email launch, analytics, and then the Operate loop.
3. **Connected by one memory:** the research informs the spec, the spec drives the code, and the code and spec drive the marketing. Separate tools can't share that context.

**Build strategy consequence:** our code stage has to be *good and reliable*, not *better than Lovable*. It also helps to accept "bring your own codebase" (a GitHub repo) so founders already using app builders can still use our Plan and Grow stages.

---

## 5. The product: SaaS Launch workflow

### 5.1 Flagship example

> *"I want to build an AI interview-preparation SaaS for developers."*

### 5.2 The five stages

```text
          IDEA
            │
   ┌────────▼────────┐
   │ 1. VALIDATE     │  Research · Competitors · Reddit insight · Pricing · SEO keywords · Gaps
   └────────┬────────┘
   ┌────────▼────────┐
   │ 2. PLAN         │  PRD · Personas · User journeys · MVP scope · Data model · Tech architecture
   └────────┬────────┘
   ┌────────▼────────┐
   │ 3. BUILD        │  UX/UI · Next.js · API · Postgres · Auth · Payments · AI features · Tests · Browser QA · Security review · Deploy
   └────────┬────────┘
   ┌────────▼────────┐
   │ 4. LAUNCH       │  Landing page SEO · Blog plan · Docs · OG images · Social drafts · Reddit drafts · Product Hunt kit · Email sequence · Launch checklist
   └────────┬────────┘
   ┌────────▼────────┐
   │ 5. OPERATE      │  Analytics · Signups · Activation · Revenue · SEO · Feedback · Errors → proposed fixes
   └────────┬────────┘
            └──────► iterate (back to PLAN/BUILD/LAUNCH)
```

### 5.3 Agent teams per stage

| Stage | Agents | Deliverables |
|---|---|---|
| **Validate** | Market Researcher, Competitor Analyst, Community Researcher (Reddit/forums, read-only), Pricing Analyst, SEO Researcher, Fact-Checker | Validation report (PDF/DOCX), competitor matrix (XLSX), keyword list, "go / pivot / no-go" summary with evidence |
| **Plan** | Product Manager, UX Architect, Solution Architect, Data Modeler | PRD, personas, user journeys, MVP scope, DB schema, architecture doc, pitch deck (PPTX) |
| **Build** | Frontend, Backend, Database, Auth, Payments, AI Integration, QA (browser), Security Reviewer, DevOps | GitHub repo, running preview URL, test report, security checklist, production deploy |
| **Launch** | SEO, Content Writer, Social, Creative (images/OG), Launch Manager | Landing copy + meta, sitemap/robots, blog plan + first posts, docs, social + Reddit + Product Hunt drafts, email sequence, launch calendar |
| **Operate** | Analytics, Growth, Support, Maintenance | Weekly report, anomaly alerts, proposed fixes (copy, pages, code PRs) for approval |

### 5.4 Full task graph (what the planner generates for "Build my SaaS")

```text
VALIDATE   00 Market Research ─┬─ 01 Competitor Research ─┬─ 02 Community Insight ─┬─ 03 Pricing ─ 04 SEO Keywords
                               └──────────────┬───────────┘                        │
PLAN       05 Product Spec (PRD) ◄────────────┴────────────────────────────────────┘
             ├─ 06 Personas & Journeys
             ├─ 07 UX Architecture ── 08 UI Design (code previews)
             └─ 09 Technical Architecture ── 10 Database Schema
BUILD      11 Frontend ∥ 12 Backend/API ∥ 13 Auth ∥ 14 Payments ∥ 15 AI Integration
             └──► 16 Tests ∥ 17 Browser QA ∥ 18 Security Review ──► 19 Deploy
LAUNCH     20 SEO Setup ∥ 21 Content ∥ 22 Creatives ∥ 23 Social/Reddit/PH Drafts ∥ 24 Email
             └──► 25 Launch Checklist ──► [HUMAN APPROVAL] ──► Schedule
OPERATE    26 Analytics hookup ──► weekly loop
```

Independent nodes run in parallel, and the user watches the graph execute live. This is the core demo moment and much more compelling than a chat window.

### 5.5 Opinionated tech stack ("optimized for modern web SaaS")

| Layer | Default |
|---|---|
| Frontend | Next.js + React + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Backend | Next.js route handlers / Node.js (NestJS for larger apps) |
| Database | PostgreSQL + Prisma |
| Auth | Auth.js / Better Auth (one chosen and templated) |
| Payments | Stripe (global) + Razorpay (India) |
| AI | Anthropic / OpenAI / Gemini via one SDK layer |
| Infra | Vercel (default) or Docker → AWS |
| Analytics | PostHog |
| Email | Resend |

**Why:** agents start from **tested starter templates** instead of making architecture decisions on every run. That means faster runs, fewer failures, cheaper tokens, and one stack to run evaluations against. Other stacks (Python/Django, Laravel, Vue) come only after this one works reliably.

### 5.6 Community and social: the only acceptable pattern

```text
Research communities (read) → Find relevant threads → Read community rules
      → Draft a genuinely helpful reply/post → HUMAN APPROVAL → User posts (or approved scheduler)
```

This applies to Reddit, Product Hunt, LinkedIn, X, Hacker News and email. No automated posting to communities. No fake accounts or engagement. Violations get the founder banned, and that is the opposite of a launch.

### 5.7 Operate: the long-term moat

After launch, the swarm connects to PostHog/GA, Stripe, Search Console and error tracking, and runs a weekly loop:

> *"Landing-page conversion dropped 18% since Tuesday's deploy. I found three likely causes and prepared a revised hero section and a PR. Approve?"*

This turns a one-off build tool into an **AI operating team for a SaaS business**. That is the retention engine and the company's long-term direction.

---

## 6. Staged promise: aligned with the ASAP launch plan

The positioning stays the same from day one. **What is available grows by phase.** Only market what is live.

| PROJECT_PLAN phase | Weeks | SaaS Launch stages available | Marketing message at that point |
|---|---|---|---|
| **Phase 1: MVP (private beta)** | 1–4 | **Validate + Plan**: research, competitors, pricing, SEO keywords, PRD, personas, architecture, pitch deck, as PDF/DOCX/PPTX | "Validate and plan your SaaS with an AI team. Build & Launch coming soon." |
| **Phase 2: Paid launch** | 5–8 | + **Launch kit (content)**: landing copy, SEO meta, blog plan and posts, Product Hunt/Reddit/LinkedIn/X **drafts**, email sequence, launch checklist; competitor matrix XLSX; bring-your-own repo/URL for analysis | "Validate, plan and prepare your launch." |
| **Phase 3: Agents with hands** | 9–14 | + **Build**: starter template → Next.js app in sandbox, browser QA, preview URL, GitHub push, Vercel deploy | "Launch your SaaS with an AI team." (full promise) |
| **Phase 4: Social & teams** | 15–20 | + scheduled publishing (approved), content calendar, team workspaces | + "for small teams and agencies" |
| **Phase 5: Platform** | 21+ | + **Operate** loop: analytics, alerts, proposed fixes and PRs | "Your AI operating team." |

**Result:** the ASAP launch plan doesn't change. The Phase 1 research → document MVP gets a sharper audience and a sharper story, and the task templates become SaaS-specific: *Validate my idea, Competitor analysis, Write my PRD, Pitch deck, Launch plan.*

---

## 7. Homepage

**Hero**
> # Launch your SaaS with an AI team.
> Research the market, write the spec, build the Next.js app, test it, deploy it, and prepare your launch, all from one workspace.
> **[Start with your idea →]**

**How it works**

```text
YOUR IDEA → AI PRODUCT TEAM → [ Validate | Plan | Build | Launch ] → YOUR SAAS
```

**Sections (in order)**
1. Live swarm demo: the task graph executing, including agent browser/IDE views
2. The five stages with real sample outputs (download a real validation report and PRD)
3. "What app builders skip": the Validate and Launch comparison (§4)
4. Opinionated stack logos (Next.js, Postgres, Stripe, Vercel...)
5. "You stay in control": approvals, visible sources, your GitHub, your accounts
6. Pricing (per launch pack + Operate plan)
7. FAQ, including the honest one: "Will it make my SaaS successful?" → "No tool can promise that. We make sure you launch faster, with real research behind every decision."

**Current landing page gap:** the existing `components/landing` sections (SwarmBuilder, Developers SDK, Integrations, Security, CaseStudies) describe a general multi-agent platform, and some of it isn't built yet. Rewrite the sections around SaaS Launch. Mark Build/Operate as "coming soon" until Phases 3/5, and remove case studies until they are real.

---

## 8. Pricing direction (validate in beta)

| Plan | Shape | For |
|---|---|---|
| **Free** | 1 validation report (watermarked) | Top of funnel |
| **Validate + Plan pack** | One-time per idea | Founders testing ideas |
| **Launch pack** | One-time per project: Validate + Plan + Build + Launch kit, with credits included | Main revenue event |
| **Operate** | Monthly, lower price, after launch | Retention |
| **Studio / Team** | Monthly, multiple projects | Agencies, small teams |

Founders buy **launches**, not seats. Per-project packs match how they think and avoid "subscribe → launch → cancel" churn. The Operate plan is what they keep.

---

## 9. Metrics that prove the positioning

- % of beta users who finish Validate → Plan (activation)
- % who say the validation report changed a decision (value)
- % who buy the Launch pack after a free/validation run (conversion)
- Time from idea to a deployed preview URL (Phase 3+)
- % of launched projects still on Operate after 90 days (retention)
- Share of runs using the default stack vs asking for others (does opinionated work?)

---

## 10. Open decisions

1. **Product name.** Keep "AI Swarm" as the engine/brand, or give the customer product its own name (e.g. "SaaS Launch by AI Swarm")?
2. **Primary segment at beta:** technical indie hackers (easier, value the Validate/Launch stages) or non-technical founders (higher willingness to pay, harder support)? Recommendation: **technical** first.
3. **Bring-your-own-code in Phase 2?** Letting Lovable/Bolt/Cursor users import a repo for the Launch kit widens the market at low cost.
4. **Per-launch pricing vs subscription.** Test both in beta.
