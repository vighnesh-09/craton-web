# Craton Technologies — Marketing Site

Production-ready Next.js + Tailwind foundation for the Craton Technologies website.

## Stack

| Layer     | Choice                                  |
| --------- | --------------------------------------- |
| Framework | Next.js 16 (App Router)                 |
| UI        | React 19                                |
| Styles    | Tailwind CSS 4                          |
| Hero FX   | Three.js (WebGL)                        |
| Motion    | Framer Motion + Lenis                   |
| Icons     | Lucide React                            |
| Quality   | Oxlint + Prettier                       |

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Purpose                       |
| --------------- | ----------------------------- |
| `npm run dev`   | Local development             |
| `npm run build` | Production build              |
| `npm run start` | Serve production build        |
| `npm run lint`  | Lint `src`                    |
| `npm run format`| Format with Prettier          |
| `npm run audit` | Dependency vulnerability scan |
| `npm run check` | Lint + format check + build   |

## Project structure

```
public/                 # Static assets (og, brand, hero media)
src/
  app/                  # Next.js App Router (layout, page, not-found)
  components/
    effects/            # WebGL / visual effects
    layout/             # Navbar, Footer
    providers/          # Theme + Lenis
    ui/                 # Shared UI primitives
  config/               # env, site identity, theme tokens
  content/              # Nav links, per-page SEO copy
  features/
    home/sections/      # Home-page sections
  hooks/
  lib/                  # Helpers (cn, seo)
  styles/               # Global CSS / Tailwind theme
```

Path alias: `@/` → `src/`

## SEO

- Metadata API in `src/app/layout.js` and each route, via `src/lib/seo.js`
- JSON-LD in the root layout, plus SoftwareApplication on product pages
- `src/app/robots.js` and `src/app/sitemap.js` (do not add `public/robots.txt` or `public/sitemap.xml`; those would shadow the App Router files)
- Site identity in `src/config/site.js` and `src/content/pages.js`

## Security & env

- Security headers via `next.config.mjs` and `vercel.json`
- Only `NEXT_PUBLIC_*` values are exposed to the browser
- Never put API keys or private tokens in `NEXT_PUBLIC_*` variables

```env
NEXT_PUBLIC_APP_NAME=Craton Technologies
NEXT_PUBLIC_APP_URL=https://craton-web-v3.netlify.app
NEXT_PUBLIC_CONTACT_EMAIL=hello@craton.io
```

## Reference

Client brief and design reference live under `docs/client-brief/` (not production code).

