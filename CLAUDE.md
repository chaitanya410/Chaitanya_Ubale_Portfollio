# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio site (Vite + React 18 + TypeScript), deployed to GitHub Pages. Despite the repo name (`approval-bliss-64`), this is **not** an approval-workflow app — it was scaffolded from a Lovable template and repurposed.

## Commands

```sh
npm install          # install deps (CI uses `npm install`, not `npm ci`, on purpose — see deploy.yml)
npm run dev          # dev server on http://localhost:8080
npm run build        # production build to /dist (vite build only — NO tsc type-check step)
npm run build:dev    # build in development mode
npm run preview       # serve the built /dist locally
npm run lint          # eslint . (flat config, eslint.config.js)
npm run test          # vitest run (one-shot)
npm run test:watch    # vitest watch
```

Run a single test: `npx vitest run src/path/to/file.test.ts` or filter by name with `npx vitest run -t "pattern"`.

`npm run build` does not type-check — it runs SWC via `@vitejs/plugin-react-swc`. Type errors never fail the build or CI. TS config is deliberately loose (`strict: false`, `strictNullChecks: false`, `noImplicitAny: false`, unused-var checks off in both tsconfig and eslint). Use `npx tsc --noEmit -p tsconfig.app.json` if you want type feedback.

Both `bun.lockb` and `package-lock.json` are checked in; npm is the source of truth (README + CI).

## Architecture

**Render path:** `src/main.tsx` → `src/App.tsx` → `src/pages/Index.tsx` → `src/components/Portfolio/Portfolio.tsx`

- **`App.tsx`** — app shell: `QueryClientProvider`, `TooltipProvider`, shadcn `Toaster` + `Sonner`, and `BrowserRouter` with `basename={import.meta.env.BASE_URL}`. Routes: `/` → `Index`, `*` → `NotFound`. There is effectively one real page.
- **`Index.tsx`** — wraps everything in MUI `ThemeProvider` + `CssBaseline` using `src/theme/muiTheme.ts` (a dark "obsidian + gold" theme), and calls `useSmoothScroll()` (Lenis).
- **`Portfolio.tsx`** — composition root: renders the hero + the remaining inline sections and the extracted section components.

**Where things live:**
- **Content** — all copy/data is in `src/content/portfolio.ts` (`NAV`, `SKILL_GROUPS`, `STATS`, `BANKING_PARTNERS`, `EXPERIENCE`, `PROJECTS`, …). Edit data there, not JSX. `PROJECTS` entries with `featured: true` render as full-width feature rows with a `metric` and a `diagram` id; the rest render as a grid. `GITHUB_URL` in this file is a placeholder to fill in.
- **Palette** — `src/theme/palette.ts` is the single source of truth (`palette.*` + `hexToRgba`); `muiTheme.ts` reads from it. The old runtime 5-scheme switcher was removed.
- **Sections** — `src/components/Portfolio/sections/` (`Nav`, `Stats`, `Partners`, `Projects`, `ContactForm`); shared pieces are `SectionLabel`, `AnimatedHeading` (word-by-word mask reveal), `Reveal` (scroll fade, wraps `motion.div`), `MagneticButton`, `ProjectDiagram` (inline-SVG architecture diagrams).
- **Hooks** — `src/hooks/`: `useReducedMotion`, `useScrollSpy`, `useCountUp`, `useSmoothScroll`. **All motion must gate on `useReducedMotion()`** — every existing animation does.
- **Motion** — `framer-motion` for reveals/parallax/stagger (`src/lib/motion.ts` has the shared variants), `lenis` for inertial scroll. `src/lib/scroll.ts` `scrollToId()` routes through Lenis when active and is the only way sections should be scrolled to.

**Contact form** (`sections/ContactForm.tsx`) — `react-hook-form` + `zod`; POSTs to Web3Forms when `VITE_WEB3FORMS_KEY` is set (see `.env.example`), otherwise falls back to a prefilled `mailto:`.

**Two styling systems coexist — don't assume one:**
- MUI (`@mui/material`, `muiTheme.ts`) drives everything under `src/components/Portfolio/`. Styling is via the `sx` prop.
- Tailwind + shadcn-ui primitives in `src/components/ui/*` (config in `components.json`, `cn()` in `src/lib/utils.ts`) drive `NotFound.tsx` and are available for new work.

**Dead scaffold code — do not route changes through it:** `src/components/RequestTable/`, `src/components/Modal/VendorModal.tsx`, `src/components/DateContainer/`, `src/components/Loader/`, `src/components/NavLink.tsx`, `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts` — leftovers from the original approval-workflow template. Nothing in the live render path imports them.

**Path alias:** `@/` → `src/`, configured in `vite.config.ts`, `tsconfig*.json`, and `vitest.config.ts` (keep all three in sync). `vite.config.ts` also splits `react` / `mui` / `motion` vendor chunks via `build.rollupOptions.output.manualChunks`.

## Testing

Vitest + jsdom + `@testing-library/react` (+ `@testing-library/dom`), `globals: true`, setup file `src/test/setup.ts` (mocks `window.matchMedia` and `IntersectionObserver`). Test glob: `src/**/*.{test,spec}.{ts,tsx}`. Current suites: `src/lib/formatStat.test.ts` (pure helpers) and `src/components/Portfolio/Portfolio.test.tsx` (render smoke test — headings, nav anchors, contact form, feature rows).

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `main` (Node 20). After first push: repo **Settings → Pages → Source → GitHub Actions**.

**Base path gotcha:** the README says the Vite `base` auto-resolves from the repo name via `BASE_PATH`, and the workflow does pass that env var — but `vite.config.ts` currently **hardcodes** `base: '/Chaitanya_Ubale_Portfollio/'` (note the misspelling with double-l) and the env-driven line is commented out. If the deployed URL or repo name changes, edit `base` in `vite.config.ts` by hand. The router `basename` follows it automatically via `import.meta.env.BASE_URL`.

## Content assets

- Resume PDF for the "Download Resume" button: `public/Chaitanya-Ubale-Resume.pdf` — replace the file to update it.
- Images (bank logos, awards, hero, profile) live in `src/assets/` and are imported from `src/content/portfolio.ts` (or directly in `Portfolio.tsx` for the hero/profile).
- Favicons and static files in `public/`.
