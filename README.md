# Lumen — Professional React + Tailwind UI/UX Starter

Fast, smooth, human-feeling interfaces on a secure, production-ready foundation.
Styling is **inline Tailwind** (`className` utilities) throughout.

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
src/
  app/           # Router
  components/
    layout/      # Shell (nav, footer)
    sections/    # Page sections
    ui/          # Shared UI (loader, error boundary)
  config/        # Env accessors (VITE_* only)
  hooks/         # Reusable hooks
  lib/           # Helpers (cn)
  pages/         # Route pages (lazy-loaded)
```

Path alias: `@/` → `src/`

## Security defaults

- Security headers on Vite dev / preview and deploy configs (`vercel.json`, `public/_headers`)
- Env separation: only `VITE_*` reaches the browser; secrets stay off the client
- Production console stripping
- Error boundary with safe fallback UI
- Skip link + focus-visible styles for accessible navigation
- CSP on deploy hosts (Netlify `_headers` / Vercel)

Never put API keys or private tokens in `VITE_*` variables.

## Environment

Copy `.env.example` → `.env` and adjust:

```env
VITE_APP_NAME=Lumen
VITE_APP_URL=http://localhost:3000
VITE_CONTACT_EMAIL=hello@lumen.studio
```

## Design notes

- Calm lagoon palette, Syne + DM Sans
- One clear job per section, motion that supports reading
- Inline Tailwind for rapid UI iteration
