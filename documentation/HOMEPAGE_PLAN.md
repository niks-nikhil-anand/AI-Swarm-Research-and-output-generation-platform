# Homepage Rewrite Plan: SaaS Launch Positioning

> **Goal:** Rewrite the homepage (`app/page.tsx` → `components/landing`) so it sells **SaaS Launch** as described in [POSITIONING.md](./POSITIONING.md) §7, not a general multi-agent platform.
> **Hard constraint:** Keep the current UI/UX exactly. Same design tokens (`bg-ink`, `bg-grid`, `brand`, `mint`, `sky`, `amber`, `pink`), same fonts (`fonts.ts`), same primitives (`Section`, `SectionHeader`, `Card`, `Chip`, `Tag`, `StatusBadge`, `WindowFrame`, `ButtonLink`, `CheckItem`, `Accent`), same spacing, radii and motion. This is a **copy, content and structure** change. It is not a redesign.
> **Truth rule:** Only market what is live (POSITIONING §6). Today that is **Phase 1: Validate + Plan**. Launch kit = soon (Phase 2), Build = Phase 3, Operate = Phase 5.

---

## 1. Section map: current → new

| # | Current section | Action | New section (file) | Anchor |
|---|---|---|---|---|
| 1 | `AnnouncementBar` | Rewrite copy | Beta status bar | – |
| 2 | `Navbar` | New links | Same component | – |
| 3 | `Hero` + `HeroDemo` | Rewrite copy + presets | Hero: "Launch your SaaS with an AI team." | `#product` |
| 4 | `ChatbotVsSwarm` | Rewrite into problem section | `FounderProblem.tsx`: "One founder, ten jobs" | `#problem` |
| 5 | `HowItWorks` | Rewrite data | Idea → AI product team → stages → your SaaS | `#how` |
| 6 | `LiveExecution` | Rewrite data | Live swarm demo on the flagship example | `#demo` |
| 7 | `AgentLibrary` + `ReadySwarms` | **Replace** | `Stages.tsx`: the five stages, agents, deliverables, sample downloads | `#stages` |
| 8 | `SwarmBuilder` | **Replace** | `AppBuildersSkip.tsx`: comparison matrix (§4) | `#compare` |
| 9 | `Integrations` | **Replace** | `Stack.tsx`: opinionated stack (§5.5) | `#stack` |
| 10 | `MemoryReview` + `Security` | **Merge** | `InControl.tsx`: approvals, sources, your GitHub, drafts-only posting | `#control` |
| 11 | `UseCases` | **Remove** | – | – |
| 12 | `Developers` | **Remove** (SDK not built) | – | – |
| 13 | `CaseStudies` | **Remove** until real (§7) | – | – |
| 14 | `Pricing` | Rewrite tiers + drop monthly/yearly toggle | Per-launch packs + Operate | `#pricing` |
| 15 | `Faq` | Rewrite data | SaaS-founder FAQ incl. the honest one | `#faq` |
| 16 | `FinalCta` | Rewrite copy | "Give your idea an AI product team." | – |
| 17 | `Footer` | Update columns | Same component | – |

**New order in `LandingPage.tsx`** (matches POSITIONING §7):

```text
AnnouncementBar · Navbar
Hero → FounderProblem → HowItWorks → LiveExecution (demo)
→ Stages → AppBuildersSkip → Stack → InControl
→ Pricing → Faq → FinalCta · Footer
```

16 sections become 11. The page gets shorter and every section serves one story.

---

## 2. Foundation (do first)

### 2.1 One source of truth for availability

Add to `data/content.ts`:

```ts
export type Availability = "live" | "soon" | "later";

export const stageAvailability = {
  validate: "live",
  plan: "live",
  launch: "soon",   // Phase 2
  build: "later",   // Phase 3
  operate: "later", // Phase 5
} as const satisfies Record<StageKey, Availability>;
```

Every section that mentions a stage (hero demo, how it works, stages, pricing, FAQ) reads from this map. When a phase ships, flip one value and the whole page updates. No copy hunt.

### 2.2 `AvailabilityBadge` (UI primitive)

Add it to `ui/StatusBadge.tsx` next to `StatusBadge`, using the same pill classes and existing tones:

| Value | Label | Tone (reuse from `tones.ts`) |
|---|---|---|
| `live` | `LIVE` | `mint` (same as `DONE`) |
| `soon` | `SOON` | `brand` (same as `RUNNING`) |
| `later` | `COMING LATER` | `dim` (same as `QUEUED`) |

Add `availabilityTones` to `data/tones.ts` as full literal class strings, following the Tailwind detection comment already in that file.

### 2.3 Stage model

A shared `stages` array in `content.ts` drives HowItWorks, Stages and the hero demo:

```ts
{ key: "validate", n: "01", name: "Validate", hue: "mint",
  summary: "Is this worth building? Evidence, not vibes.",
  agents: ["Market Researcher", "Competitor Analyst", "Community Researcher", "Pricing Analyst", "SEO Researcher", "Fact-Checker"],
  deliverables: ["Validation report (PDF/DOCX)", "Competitor matrix (XLSX)", "Keyword list", "Go / pivot / no-go summary"],
  sample?: { label: "Download a real validation report", href: "/samples/validation-report.pdf" } }
```

Hues: Validate `mint`, Plan `sky`, Build `amber`, Launch `pink`, Operate `brand`. All five already exist in `hueTones`.

---

## 3. Section-by-section spec

### 3.1 AnnouncementBar
- Pill: `BETA`
- Desktop: "Validate and plan your SaaS with an AI team. Build & Launch coming soon."
- Mobile: "Private beta is open"
- Link: "Start with your idea →" (`routes.start`)

### 3.2 Navbar
`navLinks` → Product `#product` · How it works `#how` · Stages `#stages` · Why us `#compare` · Stack `#stack` · Pricing `#pricing` · FAQ `#faq`. Keep the component unchanged.

### 3.3 Hero (`Hero.tsx`, `HeroDemo.tsx`)
- Badge: `AI SaaS Launch Platform` (desktop adds ` · for solo founders`)
- H1: "Launch your SaaS" / `<Accent>with an AI team.</Accent>`
- Sub: "Research the market, write the spec, build the Next.js app, test it, deploy it, and prepare your launch, all from one workspace."
  - While Build is `later`, the sub must not read as a live promise. Use: "Validate the idea, research the market and write the spec today. Build and launch are next, all in one workspace." Pick the variant from `stageAvailability.build`.
- Primary CTA: **Start with your idea →** (`routes.start`). Secondary: **See how it works** (`#how`).
- Assurances: `Free validation report` · `No credit card` · `You approve every step`
- **HeroDemo presets** become the Phase 1 SaaS task templates (§6). Each uses the flagship idea *"AI interview-prep SaaS for developers"*:
  1. Validate my idea → Market Researcher / Competitor Analyst / Community Researcher → `validation-report.pdf · go/pivot/no-go`
  2. Competitor analysis → `competitor-matrix.xlsx · pricing tiers · sources`
  3. Write my PRD → Product Manager / UX Architect / Solution Architect → `prd.docx · personas · MVP scope`
  4. Pitch deck → `pitch-deck.pptx`
  5. Launch plan (`SOON` badge on the tab) → SEO / Content / Launch Manager → `launch-checklist · PH + Reddit drafts`
  - Remove the current "Build a SaaS", "Analyze data" and "Debug code" presets. They promise things that aren't live or aren't on-positioning.
  - The `DemoPreset` type gains `availability?: Availability`, shown as a small badge on the preset tab.

### 3.4 FounderProblem (from `ChatbotVsSwarm.tsx`)
Keep the two-card layout exactly: plain `Card` on the left, `Card variant="glow"` on the right, `Chip` flows and `CheckItem` lists.
- Eyebrow: `THE PROBLEM`
- Title: "I'm one person trying to be" / `<Accent>a whole company.</Accent>`
- Left card `SOLO FOUNDER TODAY`: a wrapped grid of muted `Chip`s (PM, Researcher, Designer, Developer, QA, DevOps, Marketer, SEO, Content, Growth) → arrow → `Chip` "One founder". Lines: "Weeks lost before the first line of code" / "Research, spec and launch done last or skipped" / "Five tools that don't share context".
- Right card `SAAS LAUNCH`: You → `AI product team` (brand) → Validate / Plan / Build / Launch (stacked chips) → `Your SaaS` (mint). Checks: "Specialist agents for every stage" / "One memory from research to launch" / "Every step visible and approved by you".

### 3.5 HowItWorks
- Title: "From idea to <Accent>launched SaaS.</Accent>"
- Description: "Describe the idea once. The AI product team validates it, plans it, builds it and prepares the launch, and you approve each step."
- Replace `steps` with 4 cards: **01 Your idea** / **02 Validate & plan** / **03 Build** / **04 Launch**. Each has an `AvailabilityBadge` beside the number and a code block, for example:
  - 01 `"AI interview-prep SaaS\nfor developers."`
  - 02 `→ market size\n→ 9 competitors mapped\n→ r/cscareerquestions insight\n→ PRD + MVP scope`
  - 03 `next.js · postgres\nauth · stripe\ntests ✓ · browser QA ✓\npreview URL`
  - 04 `landing copy + meta\nproduct hunt kit\nreddit drafts (you post)\nemail sequence`
- Add a one-line `Chip` strip above the grid: `YOUR IDEA → AI PRODUCT TEAM → [ Validate | Plan | Build | Launch ] → YOUR SAAS` (the §7 diagram, using the ChatbotVsSwarm arrow pattern).

### 3.6 LiveExecution (demo)
Same `WindowFrame`, agent cards, stats and log. Data only:
- Title bar: `run_0142` · "Validate: AI interview-prep SaaS for developers" · RUNNING
- `runAgents`: Market Researcher (run), Competitor Analyst (done, "Mapped 9 products"), Community Researcher (run, "Reading r/cscareerquestions, read-only"), Pricing Analyst (wait), Fact-Checker (wait)
- `runStats`: `14 TASKS COMPLETED` · `3 AGENTS ACTIVE` · `CREDITS USED · EST.`
- `runLog`: planner split idea into Validate → Plan graph, competitor done, community researcher "read subreddit rules", fact-checker queued, and so on
- Copy: eyebrow `LIVE SWARM`, title "Watch your AI product team <Accent>work.</Accent>", description stays close to the current one (visible, inspectable, no black box).
- *Later (Phase 3):* add agent browser/IDE tabs to the window. Out of scope now.

### 3.7 Stages (new `Stages.tsx`, replaces AgentLibrary + ReadySwarms)
Reuse the **ReadySwarms card** (hue pill, title, desc, numbered step list, footer meta). It is the closest existing pattern.
- Eyebrow `FIVE STAGES` · Title "Everything between the idea <Accent>and the growth.</Accent>"
- Five cards (Validate, Plan, Build, Launch, Operate). Each card shows:
  - the hue pill with the stage name and an `AvailabilityBadge`
  - a one-line summary
  - the numbered list of **deliverables** (§5.3)
  - a footer with agent `Tag`s
  - an optional `ArrowLink` "Download sample →" **only if** `sample` is set
- Layout: `lg:grid-cols-3` for the first 3 cards, then 2 cards in a second row. Alternatively use one full-width Operate card with the §5.7 quote in a code block ("Landing-page conversion dropped 18%… Approve?") as the retention teaser.
- **Sample downloads:** POSITIONING wants *real* files. Put them in `public/samples/` (validation-report.pdf, prd.docx) generated by the actual Phase 1 pipeline. **No fake samples.** Until they exist, `sample` stays unset and the link doesn't render.

### 3.8 AppBuildersSkip (new `AppBuildersSkip.tsx`, replaces SwarmBuilder)
- Eyebrow `WHERE WE'RE DIFFERENT` · Title "App builders start at code. <Accent>We start at the idea.</Accent>"
- A `Card` with the §4 matrix as a real `<table>`. Rows: AI app builders / Chat assistants / General AI agents / **SaaS Launch** (glow row). Columns: Research · Spec · Design · Code · QA · Deploy · SEO · Launch · Operate.
  - Glyphs: ● = `size-2 rounded-full bg-mint`, ◐ = half-filled, · = `bg-line`. Legend underneath in `font-code text-[11px] text-dim`.
  - Highlight the **Research/Spec** and **SEO/Launch/Operate** column groups with a `bg-brand/6` tint. That is the "wedge at the ends" message.
  - Mobile: horizontal scroll *inside* the card (`overflow-x-auto`) with a sticky first column. The page itself must not scroll sideways.
- Three `CheckItem`s below: "Before code: validation, research, PRD" / "After code: SEO, content, launch kit" / "One memory connects them all".
- Name **categories only**, no competitor brands.

### 3.9 Stack (new `Stack.tsx`, replaces Integrations)
Reuse the Integrations layout (chip grid + small flow).
- Eyebrow `OPINIONATED STACK` · Title "One stack, <Accent>tested end to end.</Accent>"
- Description: "Agents start from tested starter templates instead of re-deciding architecture on every run. Faster, cheaper, and regression-tested."
- A grid of `layer → default` pairs from §5.5 (Frontend: Next.js + TypeScript, UI: Tailwind + shadcn/ui, DB: PostgreSQL + Prisma, Auth, Payments: Stripe + Razorpay, AI, Infra: Vercel, Analytics: PostHog, Email: Resend), styled like `devFeatures` rows (`k`/`v`).
- Text wordmarks in `Chip`s for now. If we use real logos, they go in `public/icons/stack/` as mono SVGs tinted `text-muted`.
- Footnote chip: `Bring your own repo · SOON` (open decision §10.3).
- Header badge "Optimized for modern web SaaS". Never "we build anything".

### 3.10 InControl (new `InControl.tsx`, merges MemoryReview + Security)
Keep the MemoryReview two-panel layout.
- Eyebrow `YOU STAY IN CONTROL` · Title "Every step visible. <Accent>Every action approved.</Accent>"
- Left panel: a **drafts-only posting flow** using the `reviewChain` chip pattern: `Read communities → Find threads → Read the rules → Draft reply → HUMAN APPROVAL (brand) → You post (mint)`. Caption: "No auto-posting. No fake accounts. Getting banned is the opposite of a launch."
- Right panel: 6 items in the `securityItems` icon-list style:
  - Approval before every external action
  - Sources attached to every claim
  - Your GitHub, your code
  - Your accounts (Vercel, Stripe, socials)
  - Full run log
  - Encryption and data retention
- Delete `memoryTree`, `reviewChecks` and `securityItems` from content once they're unused (or reuse their shapes).

### 3.11 Pricing
- Title "Buy launches, <Accent>not seats.</Accent>" · Description "Pay per idea or per launch. Keep an AI team on after launch for less."
- **Remove the monthly/yearly toggle.** Packs are one-time payments. Replace `PricingTier.price` with `{ amount, unit }`, where `unit` is `"one-time"` / `"/month"`.
- Tiers (§8):
  - **Free**: 1 validation report (watermarked)
  - **Validate + Plan**: one-time per idea
  - **Launch pack**: featured. Validate + Plan + Build + Launch kit, credits included. Shows "Build included when it ships" while `build` is `later`.
  - **Operate**: `/month`, `SOON` badge
  - **Studio / Team**: `/month`, Contact
- 5 tiers: the first 3 packs go in the existing `lg:grid-cols-3`, and Operate + Studio sit in a slimmer 2-column row below (same `TierCard`, compact variant).
- Keep the **credit transparency** card. Change the example to "Validate my idea" with credits by agent (Market 18, Competitor 12, Community 8, Fact-check 6).
- Prices are **placeholders** (`[PRICE]`) until beta pricing is decided (§10.4). See open decisions.

### 3.12 FAQ (`faqs` data)
Replace all 12. Suggested set:
1. What is SaaS Launch?
2. What can I use today? → Validate + Plan live, Launch kit next, Build in a later release (reads `stageAvailability`)
3. **Will it make my SaaS successful?** → "No tool can promise that. We make sure you launch faster, with real research behind every decision." (verbatim from §7)
4. How is this different from AI app builders?
5. I already built my app with another tool. Can I still use it? → Plan and Launch stages; bring-your-own repo coming
6. Which tech stack do you build with? Can I change it?
7. Do you post to Reddit, Product Hunt or X for me? → Drafts only, you approve and post
8. Do I own the code and documents?
9. What do I actually get from Validate? → file list
10. How are credits calculated?
11. Is there a free plan?

Keep bracketed placeholders only where facts aren't decided yet (models, credit rates).

### 3.13 FinalCta
- Title "Give your idea <Accent>an AI product team.</Accent>"
- CTA: **Start with your idea →**, secondary **See pricing**
- Assurances: same as the hero.

### 3.14 Footer
Columns: PRODUCT (Stages, How it works, Stack, Pricing) · RESOURCES (Docs, Blog, Sample reports, Changelog) · COMPANY (About, Contact, Security, Status) · LEGAL (Privacy, Terms). Remove "Case studies" and "API".

### 3.15 Metadata (`app/page.tsx`)
- `title`: "Launch your SaaS with an AI team | AI Swarm"
- `description`: "Validate your SaaS idea, write the spec, build the app and prepare your launch with an AI product team, all in one workspace."
- `keywords`: SaaS launch, validate SaaS idea, AI product team, SaaS market research, PRD generator, AI for indie hackers, Product Hunt launch kit, …
- `openGraph` to match.
- Read `node_modules/next/dist/docs` for the Metadata API before editing (AGENTS.md).

---

## 4. Copy guardrails (checked in review)

Grep the final page for these. Each one is a positioning violation:

- ❌ "automatically build/launch a successful SaaS", "one click", "we build anything", "auto-post"
- ❌ Build/Operate described as live while `stageAvailability` says otherwise
- ❌ Fake case studies, logos, testimonials or sample files
- ❌ Competitor brand names
- ✅ "optimized for modern web SaaS", "drafts, you post", "you approve every step"

---

## 5. Files touched

| Change | Files |
|---|---|
| Edit | `app/page.tsx`, `components/landing/LandingPage.tsx`, `data/content.ts`, `data/tones.ts`, `ui/StatusBadge.tsx`, `sections/{AnnouncementBar,Navbar,Hero,HeroDemo,HowItWorks,LiveExecution,Pricing,Faq,FinalCta,Footer}.tsx` |
| Rename + rewrite | `ChatbotVsSwarm.tsx` → `FounderProblem.tsx` |
| New | `sections/Stages.tsx`, `sections/AppBuildersSkip.tsx`, `sections/Stack.tsx`, `sections/InControl.tsx`, `public/samples/` (when real files exist) |
| Delete | `sections/{AgentLibrary,ReadySwarms,SwarmBuilder,Integrations,MemoryReview,Security,UseCases,Developers,CaseStudies}.tsx` and their unused exports and icons in `content.ts` / `icons.ts` (grep for other importers first) |

---

## 6. Implementation order (one commit each)

1. **Foundation:** `Availability` type, `stageAvailability`, `stages` data, `AvailabilityBadge` + tones.
2. **Above the fold:** AnnouncementBar, Navbar, Hero, HeroDemo presets, metadata.
3. **Story:** FounderProblem, HowItWorks, LiveExecution data.
4. **New sections:** Stages, AppBuildersSkip, Stack, InControl.
5. **Conversion:** Pricing restructure, FAQ, FinalCta, Footer.
6. **Cleanup:** remove the 9 old sections and dead data/icons, reorder `LandingPage.tsx`.
7. **Verify** (below), then fix anything it finds.

---

## 7. Verification checklist

- `npx tsc --noEmit` and `npm run lint` are clean. No unused exports are left in `content.ts`.
- `preview_start` the dev server and walk the page at **1440px, 768px and 375px**:
  - no horizontal page scroll (the comparison table scrolls inside its card only)
  - every nav anchor lands on its section
  - hero demo preset switching still animates
  - no console errors
- Visual parity: spacing, card heights and type scale match the current page. Only the copy changes.
- Flip `stageAvailability.build` to `"live"` locally and confirm the hero sub, HowItWorks badge, Stages badge, pricing note and FAQ answer all update. Then revert.
- Run the copy guardrail grep (§4).
- Lighthouse SEO: title, description and a single `h1` are present.

---

## 8. Open decisions (need an answer before step 2 / step 5)

1. **Brand on the page:** "AI Swarm" only, or "SaaS Launch by AI Swarm" in the hero badge, logo lockup and title? (POSITIONING §10.1)
2. **Pricing numbers:** real prices for the packs, or `[PRICE]` placeholders during beta? (§10.4)
3. **Sample files:** can we generate a real validation report and PRD from the Phase 1 pipeline for `public/samples/`? If not, the download links stay hidden.
4. **Primary CTA target:** `/register` (current) or a waitlist, given "private beta" in the announcement bar?
