# Specification — Chaitanya Ubale Portfolio

## 1. Purpose

A fast, single-page personal portfolio for Chaitanya Ubale (Software Developer — Full-Stack MERN & AI/RAG). It presents professional identity, experience, skills, selected projects, banking-integration work, awards, publications, and contact details, and is optimized for search engines and social sharing.

## 2. Scope

| In scope | Out of scope |
|----------|--------------|
| Static, client-rendered marketing/portfolio site | Backend / API / database |
| One primary page (`/`) plus a 404 route | User accounts, auth, forms that submit anywhere |
| Content authored in-code as data arrays | CMS / admin UI |
| Automated deploy to GitHub Pages | Server-side rendering, i18n |

## 3. Tech stack

- **Build:** Vite 5, `@vitejs/plugin-react-swc` (SWC transform, no type-check in build)
- **Language:** TypeScript 5 (loose config — `strict: false`)
- **UI:** React 18, MUI 7 (`@mui/material`, `@emotion`) for the portfolio page; Tailwind 3 + shadcn-ui primitives (`src/components/ui/*`) available and used by the 404 page
- **Motion:** `framer-motion` (reveals, parallax, heading masks, diagrams), `lenis` (smooth scroll)
- **Forms:** `react-hook-form` + `zod`; contact submissions via Web3Forms (`VITE_WEB3FORMS_KEY`) with a `mailto:` fallback
- **Routing:** `react-router-dom` 6 (`BrowserRouter`, `basename` from `import.meta.env.BASE_URL`)
- **Data layer:** `@tanstack/react-query` provider is mounted but currently unused (no network calls)
- **Testing:** Vitest 3 + jsdom + `@testing-library/react` + `@testing-library/dom`
- **Hosting:** GitHub Pages via GitHub Actions (Node 20); `vite.config.ts` splits `react` / `mui` / `motion` vendor chunks

## 4. Functional requirements

### 4.1 Page structure

`Portfolio.tsx` is the composition root; larger sections are extracted to `src/components/Portfolio/sections/` (`Nav`, `Stats`, `Partners`, `Projects`, `ContactForm`). Single scrolling page with anchored sections, in order:

1. **Hero** — name, title, primary CTAs (view work, download resume), background image.
2. **About** — bio, location, headline stats (`STATS`: years of experience, weekly volume automated, customers served, banking partners integrated).
3. **Skills** — grouped skill chips (`SKILL_GROUPS`: Backend & Databases, Frontend, Cloud, AI & ML, AI Tools & Productivity).
4. **Banking Partners** — cards per bank (`BANKING_PARTNERS`: ICICI, HDFC, SBM, RBL, Standard Chartered) with logo, description, service tags.
5. **Experience** — reverse-chronological roles (`EXPERIENCE`): period, role, company, bullet points.
6. **Projects** — the 3 `featured` fintech projects render as full-width alternating feature rows (generated `ProjectDiagram` SVG + `metric` callout); the rest render as a grid under "More work".
7. **Awards** — award entries with imagery (`award-gold.jpg`, `award-silver.jpg`).
8. **Publications** — external links to published papers (e.g. IRJET).
9. **Contact** — email, phone, LinkedIn, location.

### 4.2 Navigation (`sections/Nav.tsx`)

- Fixed top nav listing the section IDs in `NAV`; items are real `<a href="#id">` links, `scrollToId()` routes the scroll through Lenis.
- Active section highlights via `useScrollSpy`; a 2px progress bar tracks scroll depth; underline-draw on hover/active.
- Nav gains a blurred background once the page is scrolled.
- Below the MUI `md` breakpoint the nav collapses into a toggle-able drawer.

### 4.3 Single palette

- One committed identity (gold / obsidian) defined in `src/theme/palette.ts`; `muiTheme.ts` reads from it. The former runtime multi-scheme switcher has been removed.

### 4.4 Resume download

- A "Download Resume" action (a magnetic button) serves `public/Chaitanya-Ubale-Resume.pdf`. Updating the résumé = replacing that file.

### 4.5 Motion system

- `framer-motion` drives all reveals, the hero parallax (content vs. background), Ken-Burns drift, word-by-word heading masks (`AnimatedHeading`), staggered card groups, and the `ProjectDiagram` line-draw.
- `lenis` provides inertial smooth scrolling (`useSmoothScroll`, mounted in `Index.tsx`).
- **Every animation gates on `useReducedMotion()`**; with `prefers-reduced-motion: reduce`, Lenis is not initialised, reveals render immediately, the logo ribbon and Ken-Burns stop, and a global CSS safety net in `index.css` neutralises transitions/animations.

### 4.6 Routing / 404

- `/` renders the portfolio.
- Any other path renders `src/pages/NotFound.tsx` (logs the attempted path to console, links back to `/`).

### 4.7 Content editing model

- All human-authored copy lives in `src/content/portfolio.ts` (`const` arrays + typed interfaces). No JSX edits are needed to change text, links, stats, skills, experience, partners, or projects. `GITHUB_URL` there is a placeholder.
- Structured metadata (Person schema, OpenGraph, Twitter card, keywords, description) lives in `index.html`.

## 5. Non-functional requirements

| Area | Requirement |
|------|-------------|
| **SEO** | `index.html` carries title, meta description, keywords, canonical author, `robots: index, follow`, and JSON-LD `Person` schema. Keep these in sync with on-page content. |
| **Social** | OpenGraph + Twitter card tags with `professional-photo.jpg` preview image. |
| **Performance** | SWC build; `react` / `mui` / `motion` split into separate vendor chunks (~90 KB gz app chunk, ~260 KB gz total). Google Fonts (`Space Grotesk`, `Inter`) preconnected in `index.html`. HMR overlay disabled in dev. |
| **Responsiveness** | Layout must work from small mobile up; MUI `md` breakpoint is the mobile/desktop divide for navigation. |
| **Accessibility** | One `<h1>` (hero), `<h2>` per section (`SectionLabel`), `<h3>` for cards/rows; keyboard-reachable nav/CTAs with focus rings; email/phone are links; all motion respects `prefers-reduced-motion`. |
| **Browser support** | Modern evergreen browsers (ES2020 target). |

## 6. Build & deployment

- `npm run build` → `/dist` (no type-check step; type errors do not block).
- `.github/workflows/deploy.yml` runs on push to `main` and on manual dispatch: `npm install` → resolve base path → `npm run build` → add `.nojekyll` → publish to GitHub Pages.
- **Base path:** must match the deployed URL. Currently hardcoded in `vite.config.ts` as `base: '/Chaitanya_Ubale_Portfollio/'` (the workflow's `BASE_PATH` env var is **not** consumed while that line is hardcoded). Changing the repo name or Pages URL requires editing `vite.config.ts`.
- Router `basename` derives from `import.meta.env.BASE_URL`, so it tracks whatever `base` is set to.

## 7. Testing

- Test glob: `src/**/*.{test,spec}.{ts,tsx}`.
- Global setup: `src/test/setup.ts` imports `@testing-library/jest-dom` and mocks `window.matchMedia` + `IntersectionObserver`.
- `globals: true` — `describe`/`it`/`expect` need no import.
- Coverage: `src/lib/formatStat.test.ts` (helpers) and `src/components/Portfolio/Portfolio.test.tsx` (render smoke test).

## 8. Known constraints / debt

- Repo name and several component names (`RequestTable`, `VendorModal`, `DateContainer`, `Loader`, `NavLink`) are dead code from the original approval-workflow scaffold and are not part of the live app.
- Two design systems (MUI and Tailwind/shadcn) coexist; new work should pick one deliberately per component.
- `react-query` provider is mounted with no queries.
- `bun.lockb` and `package-lock.json` are both committed; npm is authoritative.
- Base path is not environment-driven despite README wording.
- `framer-motion` is imported whole (no `LazyMotion`); the `motion` vendor chunk is ~45 KB gz.
- `GITHUB_URL` and `VITE_WEB3FORMS_KEY` are unset placeholders.
- Project feature-row diagrams are schematic SVGs, not real screenshots.
