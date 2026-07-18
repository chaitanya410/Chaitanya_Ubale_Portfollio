# Chaitanya Ubale — Portfolio

Personal portfolio site for Chaitanya Ubale, Software Developer (Full-Stack MERN & AI/RAG).

Live selected work, professional experience, technical skills and contact details — built as a fast, single-page React application.

## Tech stack

- Vite
- TypeScript
- React
- Material UI
- Tailwind CSS + shadcn-ui primitives

## Getting started

```sh
# Install dependencies
npm install

# Start the local dev server (http://localhost:8080)
npm run dev

# Type-check + build a production bundle to /dist
npm run build

# Preview the production build locally
npm run preview

# Run the test suite
npm run test
```

## Deployment (GitHub Pages)

This repo deploys automatically via GitHub Actions on every push to `main` — see
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time setup after pushing to GitHub:

1. Go to the repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab) — the site will build and publish automatically.

The Vite `base` path is resolved automatically at build time from the repository name, so this works
whether the repo is a project page (`https://<user>.github.io/<repo>/`) or a user/org page
(`https://<user>.github.io/`) — no manual configuration needed.

## Updating content

All page content (experience, projects, skills, awards, education, contact info) lives in
[`src/components/Portfolio/Portfolio.tsx`](src/components/Portfolio/Portfolio.tsx) as plain data arrays near the top of the file.
The resume PDF served from the "Download Resume" button lives at
[`public/Chaitanya-Ubale-Resume.pdf`](public/Chaitanya-Ubale-Resume.pdf) — replace that file to update the download.
