# Landing Migration Plan: Copy the Homepage to `swarm_landing`

> **Goal:** Launch the AI Swarm marketing homepage as its own project at `/Users/nikhil/Desktop/swarm_landing`, **pixel-identical** to the current homepage (`components/landing` in this repo), then continue the SEO work in [SEO_LAUNCH_PLAN.md](./SEO_LAUNCH_PLAN.md) there.
> **Rule:** Copy first, change nothing visible, verify parity, *then* improve. Every deliberate deviation is listed in §4.

---

## 1. Current state

| | Source: this repo | Target: `swarm_landing` |
|---|---|---|
| Next.js | 16.2.6 | **16.3.6** (read `node_modules/next/dist/docs` in the target before coding) |
| React | 19.2.4 | 19.2.8 |
| Tailwind | v4, **without preflight** (`theme.css` + `utilities.css` only) | v4 default `@import "tailwindcss"` (**includes preflight**) |
| Fonts | `components/landing/fonts.ts` (DM Sans, Libre Baskerville, JetBrains Mono) applied on the `.landing` div | Geist via `app/layout.tsx` (to be replaced) |
| Scroll | `body { overflow: hidden }`; `.landing` is an `h-dvh overflow-y-auto` scroll container | normal document scroll |
| Auth routes | `/register`, `/login` exist | **don't exist**, so CTAs must point to the app's domain |
| Git | repo | **not a git repo** |
| Path alias | `@/*` → `./*` | `@/*` → `./*` ✅ same |

**Landing dependencies (verified):** only `next/link` (Logo) and `next/font/google` (fonts). There are no images, no `public/` assets (icons are inline SVG paths in `data/icons.ts`) and no npm packages beyond Next, React and Tailwind. **Nothing to install.**

**What must stay in the source repo:** `app/login` and `app/register` import landing modules: `Accent`, `CheckItem`, `Icon`, `Eyebrow`, `StatusBadge`, `WindowFrame`, `Logo`, `landingFontVariables`, `icons`, `statusTones`, `demoPresets`. So this is a **copy, not a move**. Do not delete `components/landing` here.

---

## 2. What to copy

| From (source) | To (target) | Notes |
|---|---|---|
| `components/landing/**` (LandingPage, fonts, `data/`, `sections/` ×19, `ui/` ×11) | `components/landing/**` | Verbatim |
| `app/page.tsx` | `app/page.tsx` | Verbatim metadata + `<LandingPage />` |
| `app/favicon.ico` | `app/favicon.ico` | Overwrites the create-next-app icon |
| `app/globals.css` **lines 255–323 only** (landing `@theme`, fonts `@theme inline`, `bg-grid*`/`bg-dots` utilities, `.landing` rules) | `app/globals.css` | Plus the minimal base in §3.2. **Do not copy** the app's legacy tokens (`--bg`, `.glass`, `[data-accent]`, `swarm-*` keyframes, Inter Tight import). The landing uses none of them. |
| `documentation/POSITIONING.md`, `SEO_LAUNCH_PLAN.md` | `docs/` | Reference for later phases |

**Don't copy:** `AGENTS.md`/`CLAUDE.md` wholesale. Create a target `AGENTS.md` with the same "This is NOT the Next.js you know" note. Also skip `public/Founder-led homepage design`, `proxy.ts` and anything under `app/api`.

---

## 3. Steps

### 3.1 Prepare the target
1. `cd /Users/nikhil/Desktop/swarm_landing && git init && git add -A && git commit -m "chore: create-next-app scaffold"`. This gives a clean baseline to diff against.
2. Delete the scaffold assets the landing doesn't use: `public/{file,globe,next,vercel,window}.svg`.

### 3.2 Global CSS: match the source cascade exactly
Preflight is the biggest parity risk. The source landing was built **without** it, and some components compensate by hand (`border-0 bg-transparent p-0` on FAQ buttons, `m-0 list-none p-0` on lists). Preflight would also change `svg` to `display:block` and reset heading sizes and weights. So the target `app/globals.css` mirrors the source:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@layer base {
  * { box-sizing: border-box; }
  html { color-scheme: dark; background: #0a0a0f; }
  body { margin: 0; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  h1, h2, h3, h4, p { margin: 0; }
  a { color: inherit; text-decoration: none; }        /* source: var(--accent); every landing <a> sets its own color */
  ::-webkit-scrollbar { width: 10px; height: 10px; }  /* copied scrollbar look */
  ::-webkit-scrollbar-thumb { background: #262626; border-radius: 999px; border: 3px solid transparent; background-clip: content-box; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
}

/* …then source lines 255–323 verbatim (landing tokens, fonts, utilities, .landing rules) */
```

The source has a global `:focus-visible { box-shadow: var(--ring-focus) }` rule, which the `.landing` rules undo with `revert-layer`. Leaving both out of the target gives the same result. Keep the `.landing :is(a, button):focus-visible` outline rule.

### 3.3 Root layout
Replace Geist in `app/layout.tsx`:
- Import `landingFontVariables` from `@/components/landing/fonts`. Put it on `<html className>` together with `scroll-smooth`.
- `<html lang="en">`, and `<body className="bg-ink font-body text-fg">`.
- Metadata: `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")` and `title.template: "%s | AI Swarm"`. The page title stays as the source has it.

### 3.4 Copy the code
```bash
S=/Users/nikhil/Desktop/AI-Swarm-Research-and-output-generation-platform
T=/Users/nikhil/Desktop/swarm_landing
mkdir -p $T/components && cp -R $S/components/landing $T/components/
cp $S/app/page.tsx $S/app/favicon.ico $T/app/
```

### 3.5 Minimal code adaptations (the only edits to copied files)
1. **Scroll container → document scroll** (`LandingPage.tsx`): the source wrapper `h-dvh overflow-x-hidden overflow-y-auto scroll-smooth` exists only because the app shell locks `<body>`. In a standalone site, use `overflow-x-clip` on the wrapper and let the window scroll. That gives correct mobile browser-chrome behavior, `#anchor` links from other sites, and scroll restoration. Keep `bg-grid`, the fonts and `.landing`. The sticky navbar and `scroll-mt-16` work unchanged with window scroll.
2. **CTA destinations** (`data/content.ts` `routes`): `/register` and `/login` don't exist here. Change them to

   ```ts
   const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
   export const routes = { start: `${appUrl}/register`, signIn: `${appUrl}/login` } as const;
   ```

   Run the landing dev server on **port 3001**, so the main app keeps port 3000 and local sign-up links work end to end.
3. **Logo `href="/"`**: unchanged. It now points at the marketing site root, which is correct.

Nothing else changes: copy, sections, data, `stageAvailability` and interactions stay as they are.

### 3.6 Project config
- `.env.example`: `NEXT_PUBLIC_SITE_URL=`, `NEXT_PUBLIC_APP_URL=`
- `package.json`: `"dev": "next dev -p 3001"`
- `.claude/launch.json`: a `dev` config on port 3001, so it can be previewed and verified
- Replace the create-next-app `README.md` with a short one covering purpose, commands, env vars and where content lives (`components/landing/data/content.ts`)

---

## 4. Deliberate deviations from the source

| # | Change | Why |
|---|---|---|
| 1 | Window scroll instead of a `h-dvh` scroll container | Standalone site. Better mobile behavior, SEO and scroll restoration. Must look identical. |
| 2 | CTAs use absolute URLs to the app | Auth lives in the main app |
| 3 | Minimal base CSS instead of the app's legacy base | The landing never used the legacy tokens |
| 4 | `metadataBase` in the layout | Required for absolute OG URLs (SEO plan P1) |

---

## 5. Parity verification (definition of done)

Run the **source on :3000** and the **target on :3001** side by side.

| Check | How | Pass |
|---|---|---|
| Build | `npx tsc --noEmit && npm run lint && npm run build` in the target | 0 errors |
| Visual parity | Screenshot every section (`#product` → footer) at **1440, 768, 375** on both, and compare | No visible differences in layout, font, color, spacing, radii or icons |
| Fonts | `getComputedStyle` on H1, body text and code text | Libre Baskerville / DM Sans / JetBrains Mono, same sizes as the source |
| Interactions | Hero presets, Team filter, deploy tabs (Vercel/AWS/GCP), FAQ accordion, mobile menu open/close | Same behavior |
| Anchors | Every nav link + footer anchor | Lands below the sticky navbar |
| Overflow | Scan for elements wider than the viewport at 375 | No horizontal page scroll |
| CTAs | "Start with your idea" / "Start Free" / "Sign in" | Open `:3000/register` / `:3000/login` |
| Console | Browser console on both | No errors or hydration warnings |
| Reduced motion | Emulate `prefers-reduced-motion` | Flow and blink animations stop |

Commit on pass: `feat: port AI Swarm homepage from main app`.

---

## 6. After parity: what moves to this project

1. **The SEO plan runs here, not in the main app.** The standalone site **removes the review's #1 blocker (F1)**: there is no auth `proxy.ts`, so `robots.txt`, `sitemap.xml`, the OG image and new pages (`/product`, `/methodology`, `/sample-validation-report`) are public by default. P0.2 onward in `SEO_LAUNCH_PLAN.md` applies unchanged. P0.1 shrinks to the `/new-swarme` typo fix in the main app.
2. **Main app `/`:** once the marketing domain is live, redirect the app's `/` to `NEXT_PUBLIC_SITE_URL` (signed out) or `/new-swarm` (signed in). That avoids two indexable copies of the same page (duplicate content). **Keep** `components/landing` in the main app for the auth pages.
3. **Deploy:** a Vercel project for `swarm_landing` on the marketing domain (e.g. `aiswarm.dev`), with the app on a subdomain (e.g. `app.aiswarm.dev`), and env vars set per environment.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| The two copies drift (auth pages vs marketing site) | The auth pages use only UI primitives, `icons` and `demoPresets[0]`. Accept the drift for now. If both keep changing, extract `ui/` + `data/icons.ts` + `tones.ts` into a shared package later (npm workspace or git submodule). Not needed for launch. |
| Preflight accidentally re-enabled | §3.2 is explicit, and §5 visual parity catches it |
| Next 16.3 vs 16.2 differences | Read the target's `node_modules/next/dist/docs` for fonts, metadata and file conventions before step 3.3. Check the build and console. |
| Source still uncommitted | Commit the source homepage work first, so the copy has a known origin commit to cite in the target's first commit message |

---

## 8. Decisions needed

1. **Commit the source first?** Recommended: yes. It gives the port a traceable origin.
2. **Marketing domain + app domain** (e.g. `aiswarm.dev` and `app.aiswarm.dev`). This sets `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_URL`.
3. **Git remote** for `swarm_landing`: a new GitHub repo, or local only for now?
4. **Main app `/` redirect** (§6.2): do it at launch, or keep both for now?
