# SEO & Phase-1 Launch Fix Plan

> **Goal:** Fix the issues in the homepage SEO review (overall **53/100**) so the page ranks and converts for what Phase 1 delivers: **Validate + Plan**. Build, Launch and Operate become the roadmap, and we add a launch countdown.
> **Constraints:** Keep the current UI/UX, components and design tokens. `stageAvailability` in `components/landing/data/content.ts` stays the single source of truth for what is live. Only market what is live ([POSITIONING.md](./POSITIONING.md) §6).
> **Next.js 16:** read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` (robots, sitemap, opengraph-image) and `proxy.md` before implementing (AGENTS.md).

---

## 1. Findings, verified against the code

The review's findings hold up in the codebase. It also missed two issues, and one of them blocks everything else.

| # | Finding | Verified | Evidence |
|---|---|---|---|
| F1 | **`proxy.ts` redirects every public SEO asset to `/login`** *(missed by review)* | ✅ **Blocker** | `PUBLIC_PATHS = ["/", "/login", "/register"]`, and the matcher only excludes `api`, `_next/*`, `favicon.ico`, `icons`, `logo`. A signed-out crawler requesting `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/samples/*.pdf`, `/social-icon/*` or any new page (`/product`, `/methodology` …) gets a redirect to `/login`. |
| F2 | **Typo in redirect** *(missed by review; your uncommitted change)* | ✅ | `proxy.ts` redirects authed users to `/new-swarme`. The route is `/new-swarm`. |
| F3 | Phase-1 intent mismatch (H1 "Launch your SaaS") | ✅ | `Hero.tsx` H1. Build/Launch/Operate content is about 55% of the page. |
| F4 | Page too long, focus diluted | ✅ | Measured **2,588 words**. Team 604 · Stages 274 · Pricing 237 · Control 160 · Demo 158 · How 157 · FAQ 150+ · Compare 134 · Stack 132 · Workspace 130 · Engine 122 |
| F5 | No canonical, `og:url`, `metadataBase`, OG/Twitter image | ✅ | `app/page.tsx` has title, description, keywords and a partial `openGraph` only |
| F6 | Root layout brand is inconsistent | ✅ | `app/layout.tsx` title is "Swarm — AI orchestration", with the old description |
| F7 | No `robots`, `sitemap`, JSON-LD | ✅ | None exist in `app/` |
| F8 | Dead links | ✅ | Every footer link (`Footer.tsx` maps all to `#`), "Ask a Question" (`Faq.tsx`), Studio "Contact us" (`content.ts`), "Built by DevKit Market" |
| F9 | `[PRICE]` placeholders | ✅ | 3 tiers in `pricingTiers` |
| F10 | No real proof (sample, methodology) | ✅ | `stages[].sample` is unset. No methodology content. |
| F11 | No analytics | ✅ | No analytics package or wrapper in the repo |

**Where this plan differs from the review:**
- **Keep the "What app builders skip" comparison on the homepage.** It is ~130 words, and it is our core differentiator (POSITIONING §4). Everything else Build-heavy moves off the page.
- **Keywords field:** remove it. The review is right that it doesn't help ranking.
- **FAQ schema:** skip it, as the review says.

---

## 2. Decisions needed before starting (owner: you)

| # | Decision | Needed for | Default if not decided |
|---|---|---|---|
| D1 | **Production domain** (e.g. `https://aiswarm.dev`) | canonical, `metadataBase`, sitemap, JSON-LD | Read from `NEXT_PUBLIC_SITE_URL`. The build fails in production if it is unset. |
| D2 | **Launch date + time** (ISO UTC) | countdown | None. The countdown stays hidden until this is set. |
| D3 | **Phase-1 prices** (Validate + Plan pack) | pricing, `Offer` JSON-LD | Hide the price and use "Free during beta" plus a waitlist CTA. **No placeholders in production.** |
| D4 | **CTA destination**: `/register` or a waitlist | all CTAs | `/register` with `?source=` for attribution |
| D5 | **Sample report**: a real run of the Phase-1 pipeline on the flagship idea | proof section, `/sample-validation-report` | The section doesn't render until the file exists |
| D6 | **Analytics provider** | events | PostHog (the default stack in POSITIONING §5.5) behind a no-op wrapper |
| D7 | **Legal pages** (Privacy, Terms) text | footer, registration | Required before collecting sign-ups. You supply the text. |
| D8 | "Built by DevKit Market" URL | footer | Remove the link and keep plain text |

---

## 3. Work plan

### P0: Unblock & tell the truth (day 1–2)

**P0.1 Fix `proxy.ts` (F1, F2)**
- Replace the exact-match `PUBLIC_PATHS` array with a public-route check. It should allow `/`, `/login`, `/register`, `/product`, `/roadmap`, `/methodology`, `/sample-validation-report`, `/privacy` and `/terms`, plus metadata files.
- Extend the matcher exclusion list to cover `robots.txt`, `sitemap.xml`, `opengraph-image`, `twitter-image`, `samples` and `social-icon`.
- Fix `/new-swarme` → `/new-swarm`.
- *Acceptance:* `curl -sI localhost:3000/robots.txt` (and each URL above) returns `200` with no cookie, and `/dashboard` still redirects to `/login`.

**P0.2 Phase-1 message (F3)**
- `app/page.tsx` title: **"Validate Your SaaS Idea with an AI Team | AI Swarm"** (50 chars)
- Description: **"Research your market, compare competitors, test pricing, and get a PRD and MVP plan from an AI product team. Start with a free SaaS validation report."** (~155 chars)
- `Hero.tsx`:
  - H1 "Validate and plan your SaaS" / `<Accent>with an AI team.</Accent>`
  - Sub: "Turn one SaaS idea into market research, competitor analysis, pricing recommendations, an MVP scope and a build-ready PRD."
  - Badge: "AI SaaS idea validation · for solo founders"
  - Keep the `isLive("build")` switch, so the H1 and sub can return to "Launch your SaaS…" once Build ships. Move H1 strings into `content.ts` as `heroCopy[phase]`.
- Move the vision line ("Launch your SaaS with an AI team.") to the Roadmap section heading below the fold.
- Hero demo: drop the "Launch plan" (SOON) preset. Keep the four live Validate/Plan presets.

**P0.3 Prices and CTAs (F9, D3, D4)**
- Pricing becomes a Phase-1 layout:
  - **Free** (1 validation report)
  - **Validate + Plan** (featured)
- Launch pack, Operate and Studio move to a compact "Coming with the roadmap" row that shows `AvailabilityBadge` and no price.
- Remove every `[PRICE]`. If D3 is undecided, show "Free during beta".
- One CTA label everywhere: **"Get beta access"**, or "Validate my idea" once the beta is live, using `routes.start` plus `?source=hero|bar|pricing|final_cta`.

**P0.4 Dead links (F8, D7, D8)**
- `footerColumns` becomes `{ label, href }[]`, and `Footer.tsx` renders the real `href`.
  - **Keep:** Stages `#stages`, How it works `#how`, Pricing `#pricing`, Product `/product`, Roadmap `/roadmap`, Methodology `/methodology`, Sample report `/sample-validation-report`, Privacy `/privacy`, Terms `/terms`, Contact `mailto:`.
  - **Remove until real:** Docs, Blog, Changelog, About, Security, Status, Case studies.
- "Ask a Question" and Studio "Contact us" become `mailto:` links.
- DevKit Market becomes a real URL or plain text.
- *Acceptance:* `grep -rn 'href="#"\|href: "#"' components/landing` returns nothing.

### P1: SEO foundation (day 3–4)

**P1.1 Site config**: new `lib/site.ts`:

```ts
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL!,   // D1
  name: "AI Swarm",
  product: "SaaS Launch",
  locale: "en_US",
};
```

**P1.2 `app/layout.tsx`**
- `metadataBase: new URL(site.url)`
- `title: { default: …, template: "%s | AI Swarm" }`
- Brand description, `openGraph.siteName`, `twitter.card = "summary_large_image"`.
- This also fixes the old "Swarm — AI orchestration" title on app pages (F6).

**P1.3 `app/page.tsx`**
- `alternates: { canonical: "/" }`
- `openGraph: { url: "/", type: "website", title, description }`
- `twitter: { card, title, description }`
- **Delete `keywords`.**

**P1.4 OG image**
- `app/opengraph-image.tsx` (and `twitter-image.tsx` re-exporting it), 1200×630, using `ImageResponse`.
- It shows the H1, the "LIVE · Validate + Plan" pill and the logo mark in brand colors (`#0a0a0f` background, `#7c6ff7` accent).
- It is generated, so no design asset is needed.

**P1.5 `app/robots.ts`**
- Allow `/`.
- Disallow `/api/`, `/dashboard`, `/projects`, `/chat`, `/new-swarm`, `/settings`, `/profile`, `/skills`.
- `sitemap: ${site.url}/sitemap.xml`.

**P1.6 `app/sitemap.ts`**
- Lists only public, indexable pages: `/` plus the P2/P3 pages as they ship.
- `lastModified` comes from a constant, updated on content changes.

**P1.7 JSON-LD**
- `components/seo/JsonLd.tsx` renders a `<script type="application/ld+json">` on the homepage.
- It includes:
  - `Organization` (name, url, logo)
  - `WebSite` (name, url)
  - `SoftwareApplication`: `applicationCategory: "BusinessApplication"`. Include `offers` only once D3 is decided. Its `featureList` is **generated from live `stages`** only, so it can never claim Build.
- No FAQ schema.

*Acceptance:* view-source shows one `<link rel="canonical">`, the `og:url`, `og:image` and `twitter:image` tags, and JSON-LD that passes validator.schema.org.

### P2: Homepage restructure (day 4–5)

**Target: 1,200–1,600 words.** Every section before the Roadmap describes only live features.

| # | New section | Built from | Words (est.) |
|---|---|---|---|
| 1 | AnnouncementBar + **countdown** (P2.3) | `AnnouncementBar.tsx` | – |
| 2 | Hero (Phase-1 copy) + HeroDemo (live presets only) | existing | 90 |
| 3 | **Example: idea → result** | `LiveExecution` (keep, already Validate-focused) | 140 |
| 4 | **What you receive** (new `Deliverables.tsx`): market report, competitor matrix, pricing analysis, SEO opportunities, PRD + MVP scope, go/pivot/no-go | card grid from `Stages` pattern, data from `stages.validate/plan.deliverables` | 170 |
| 5 | **How the research works** (new `Methodology.tsx`): sources cited, specialist agents, fact-checker, your approval. Also covers "What AI validation can and can't prove." | `InControl` two-panel layout | 200 |
| 6 | **Sample report** (new `SampleReport.tsx`): rendered excerpt + download. Renders only when D5 exists. | `WindowFrame` | 80 |
| 7 | How it works, rewritten for Phase 1: Describe idea → Review research plan → Watch analysis → Download deliverables | `HowItWorks` | 130 |
| 8 | What app builders skip (kept, see §1) | `AppBuildersSkip` | 130 |
| 9 | Pricing (Phase-1, P0.3) | `Pricing` | 150 |
| 10 | **Roadmap**: "Launch your SaaS with an AI team." Validate + Plan launching · Launch kit next · Build later · Operate later, plus a link "See the full product →" `/product` | `Stages` (condensed: name, badge, 1-line summary, 3 deliverables) | 180 |
| 11 | Focused FAQ (8 Qs; drop the agents/skills/deploy/Figma Qs, which move to `/product`) | `Faq` | 250 |
| 12 | Final CTA (Phase-1 copy, beta CTA) | `FinalCta` | 40 |

≈ **1,560 words**.

**Removed from the homepage** and moved to `/product` (P2.2): FounderProblem (folded into the Methodology intro), Team, Workspace, Stack + DeployFlows, Engine.

**P2.1 Nav** becomes What you get `#deliverables` · How it works `#how` · Sample `#sample` · Pricing `#pricing` · Roadmap `#roadmap` · FAQ `#faq`.

**P2.2 `/product` page** (`app/product/page.tsx`, public in proxy): "The full SaaS Launch team".
- Reuses `Team`, `Workspace`, `Stack`/`DeployFlows` and `Engine` unchanged. They are already self-contained.
- It gets its own metadata and canonical, sits in the sitemap, and every future-stage section keeps its availability badges.
- Shares `Navbar`/`Footer` through a small `LandingShell` component extracted from `LandingPage.tsx`.

**P2.3 Launch countdown**
- `components/landing/data/launch.ts`:

  ```ts
  export const phaseOneLaunch = {
    status: "scheduled" as "scheduled" | "live",   // flipped by deploy, never by the clock
    targetAt: "2026-10-15T04:30:00.000Z",          // D2: full ISO UTC only
    displayTimezone: "Asia/Kolkata",
    label: "Phase 1 private beta",
    ctaLabel: "Get beta access",
    ctaHref: "/register?source=countdown_bar",
  };
  ```

- `ui/LaunchCountdown.tsx` (client):
  - The server renders a static `<time dateTime={targetAt}>15 October 2026</time>`, formatted with `Intl.DateTimeFormat` in `displayTimezone`. This keeps it readable without JavaScript and avoids a hydration mismatch.
  - After mount, a `useEffect` starts a 1s interval. It shows `16d 08h 24m 10s` (mobile: `16d 08h 24m`) in `tabular-nums` with fixed-width units (`w-[2ch]`), so the layout doesn't shift.
  - It pauses on `visibilitychange` (hidden) and recomputes from `Date.now()` on resume, so it never drifts. Reduced motion means no blink animation.
  - Accessibility: `aria-label` holds the full remaining time and updates each minute. No `aria-live` ticking.
  - At zero, or when `status === "live"`, it swaps once to "Phase 1 private beta is live". A `useRef` guard makes the completion run only once. It never shows negatives.
  - It **never** touches `stageAvailability` or gates product access.
- `AnnouncementBar.tsx`:
  - Desktop: `PHASE 1 PRIVATE BETA — Launching 15 Oct 2026 · 16d 08h 24m` plus "Get beta access →".
  - Mobile: short form.
  - Hero: a small launch card under the assurances on `<sm` only.
  - Not in the H1 or the metadata.

**P2.4 Analytics** (D6)
- `lib/analytics.ts` exposes `track(event, props)`. It is a no-op unless `NEXT_PUBLIC_POSTHOG_KEY` is set.
- Events:
  - `launch_countdown_viewed`: IntersectionObserver, once
  - `launch_countdown_cta_clicked`
  - `beta_registration_started`: register page mount with `source`
  - `beta_registration_completed`: after the register API succeeds
  - `sample_report_viewed`
  - `sample_report_downloaded`
- Every event includes `{ placement: "countdown_bar" | "hero" | "pricing" | "final_cta" }`, read from `?source=`.

### P3: Proof & search pages (week 2, after launch)

Each page is public in proxy, has unique copy (no reused homepage text), its own metadata and canonical, and is in the sitemap:
- `/sample-validation-report` (D5, highest priority)
- `/methodology`
- `/roadmap`
- `/saas-idea-validation`
- `/saas-competitor-analysis`
- `/saas-market-research`
- `/prd-generator`

Plus one long-form guide: *How to validate a SaaS idea before building.*

### P4: Launch-week validation

- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Validate JSON-LD at validator.schema.org.
- Check social previews on X, LinkedIn and Slack.
- Confirm Google's chosen canonical in URL Inspection.
- Run Lighthouse on production (SEO ≥ 95, CLS < 0.05 with the countdown running).
- Watch the analytics funnel: countdown view → CTA → registration started → completed.

---

## 4. Test plan

| Area | Test |
|---|---|
| Proxy | Signed out: public URLs → 200, private → 307 `/login`. Signed in: `/login` → `/new-swarm`. |
| Metadata | Page source has 1 canonical and absolute `og:url`/`og:image`. The layout title template applies on `/product`. |
| Countdown | Mock `Date.now()` for: 16 days out, 59s out, exactly 0, 1 day past, and `status: "live"`. Check hidden tab → resume stays correct. Timezone label is right when the device is in UTC−8. No-JS shows the static date. |
| Copy guardrail | Nothing before `#roadmap` mentions deploy, IDE, AWS, or "build the app". Grep for `[PRICE]` and `href="#"` returns nothing. |
| Responsive | 375 / 768 / 1440: no horizontal scroll, the countdown fits the bar, all nav anchors land. |
| Quality | `tsc --noEmit`, `eslint`, no console errors, Lighthouse (local) SEO 100 and a11y ≥ 95. |

---

## 5. Sequence

| Day | Work | Depends on |
|---|---|---|
| 1 | **P0.1 proxy fix**, lock D1–D4, P0.2 metadata/H1/hero | – |
| 2 | P0.3 pricing and CTAs, P0.4 dead links + legal page stubs (D7) | D3, D4, D7 |
| 3 | P1 site config, layout, canonical, OG image, robots, sitemap, JSON-LD | D1 |
| 4 | P2 homepage restructure + `/product` page | – |
| 5 | P2.3 countdown, P2.4 analytics | D2, D6 |
| 6 | Sample report section (D5), full test plan (§4) | D5 |
| 7 | P4 production validation and launch | deploy |

---

## 6. Definition of done

- [ ] Signed-out requests to `robots.txt`, `sitemap.xml`, the OG image, `/product` and `/samples/*` return 200.
- [ ] Title, H1 and description claim only Validate + Plan. Nothing above `#roadmap` claims Build/Launch/Operate.
- [ ] Homepage is 1,200–1,600 words. Future-stage detail lives on `/product`.
- [ ] One canonical URL. OG and Twitter previews show an image.
- [ ] JSON-LD (Organization, WebSite, SoftwareApplication) validates and lists only live features.
- [ ] No `[PRICE]` and no `href="#"` anywhere in `components/landing`.
- [ ] Countdown reads from one UTC config, shows the static date without JavaScript, switches to "live" exactly once, and never gates features.
- [ ] One real sample deliverable is reachable, or its section is hidden.
- [ ] Analytics events fire with a `placement` value.
- [ ] Lighthouse SEO ≥ 95 in production.
