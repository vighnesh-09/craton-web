# Craton Technologies — Marketing Site

Production-ready React + Tailwind foundation for the Craton Technologies website.
Structured for SEO, maintainability, and a clean path into the landing redesign.

## Stack

| Layer   | Choice                                  |
| ------- | --------------------------------------- |
| UI      | React 19                                |
| Build   | Vite 8                                  |
| Styles  | Tailwind CSS 4                          |
| Motion  | Framer Motion (respects reduced motion) |
| Routing | React Router 7 (lazy pages)             |
| Icons   | Lucide React                            |
| Quality | Oxlint + Prettier                       |

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Local development                               |
| `npm run build`   | Production build (drops `console` / `debugger`) |
| `npm run preview` | Preview production build                        |
| `npm run lint`    | Lint `src`                                      |
| `npm run format`  | Format with Prettier                            |
| `npm run audit`   | Dependency vulnerability scan                   |
| `npm run check`   | Lint + format check + build                     |

## Project structure

```
public/                 # Static assets served as-is
  og/                   # Open Graph share images
  robots.txt
  sitemap.xml
src/
  app/                  # App bootstrap + router
  assets/
    images/             # Imported images
    icons/              # Imported icons
  components/
    layout/             # Shell (nav, footer, layout)
    seo/                # <Seo />, JSON-LD helpers
    ui/                 # Shared UI primitives
  config/               # env + site identity / SEO defaults
  content/              # Nav links, per-page SEO copy
  features/
    home/sections/      # Home-page section modules
  hooks/                # Reusable hooks
  lib/                  # Helpers (cn, seo URL builders)
  pages/                # Route pages (lazy-loaded)
  styles/               # Global CSS / Tailwind theme
```

Path alias: `@/` → `src/`

## SEO foundations

- Static meta, Open Graph, Twitter cards, and JSON-LD in `index.html` (first paint / crawlers)
- Route-level `<Seo />` updates title, description, canonical, and share tags
- `public/robots.txt` + `public/sitemap.xml`
- Site identity centralized in `src/config/site.js` and `src/content/pages.js`

When adding a public route: register it in `content/pages.js`, the router, and `sitemap.xml`.

## Security defaults

- Security headers on Vite dev / preview and deploy configs (`vercel.json`, `public/_headers`)
- Env separation: only `VITE_*` reaches the browser
- Production console stripping
- Error boundary with safe fallback UI
- Skip link + focus-visible styles for accessible navigation

Never put API keys or private tokens in `VITE_*` variables.

## Environment

Copy `.env.example` → `.env` and adjust:

```env
VITE_APP_NAME=Craton Technologies
VITE_APP_URL=https://craton.io
VITE_CONTACT_EMAIL=hello@craton.io
```

## Reference

Client brief and design reference live under `docs/client-brief/` (not production code).
