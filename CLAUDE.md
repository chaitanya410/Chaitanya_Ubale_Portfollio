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
- **`Index.tsx`** — wraps everything in MUI `ThemeProvider` + `CssBaseline` using `src/theme/muiTheme.ts` (a dark "obsidian + gold" theme).
- **`Portfolio.tsx`** (~1100 lines) — the entire visible site: nav, hero, about, skills, banking partners, experience, projects, awards, publications, contact. **All page content lives as plain `const` data arrays at the top of this file** (`NAV`, `SKILL_GROUPS`, `STATS`, `BANKING_PARTNERS`, `EXPERIENCE`, etc.). To update site content, edit those arrays — not JSX.

**Two styling systems coexist — don't assume one:**
- MUI (`@mui/material`, `muiTheme.ts`) drives `Portfolio.tsx`. Styling is via the `sx` prop and inline styles.
- Tailwind + shadcn-ui primitives in `src/components/ui/*` (config in `components.json`, `cn()` helper in `src/lib/utils.ts`) drive `NotFound.tsx` and are available for new work.

**In-page theme switcher:** `Portfolio.tsx` holds a local `selectedTheme` state over `COLOR_SCHEMES` (gold/emerald/cyan/violet/rose). Colors are applied through inline styles and the `hexToRgba` helper, computed per-render — this is separate from and layered on top of `muiTheme.ts`.

**Dead scaffold code — do not route changes through it:** `src/components/RequestTable/`, `src/components/Modal/VendorModal.tsx`, `src/components/DateContainer/`, `src/components/Loader/`, `src/components/NavLink.tsx`, and `src/hooks/` are leftovers from the original approval-workflow template. Nothing in the live render path imports them.

**Path alias:** `@/` → `src/`, configured in `vite.config.ts`, `tsconfig*.json`, and `vitest.config.ts` (keep all three in sync).

## Testing

Vitest + jsdom + `@testing-library/react`, `globals: true`, setup file `src/test/setup.ts` (mocks `window.matchMedia`). Test glob: `src/**/*.{test,spec}.{ts,tsx}`. Only `src/test/example.test.ts` exists so far.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `main` (Node 20). After first push: repo **Settings → Pages → Source → GitHub Actions**.

**Base path gotcha:** the README says the Vite `base` auto-resolves from the repo name via `BASE_PATH`, and the workflow does pass that env var — but `vite.config.ts` currently **hardcodes** `base: '/Chaitanya_Ubale_Portfollio/'` (note the misspelling with double-l) and the env-driven line is commented out. If the deployed URL or repo name changes, edit `base` in `vite.config.ts` by hand. The router `basename` follows it automatically via `import.meta.env.BASE_URL`.

## Content assets

- Resume PDF for the "Download Resume" button: `public/Chaitanya-Ubale-Resume.pdf` — replace the file to update it.
- Images (bank logos, awards, hero, profile) live in `src/assets/` and are imported into `Portfolio.tsx`.
- Favicons and static files in `public/`.
