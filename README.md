# Craton Technologies — Web

Premium React + Tailwind landing experience for Craton Technologies: product/IP company shipping **RAccelerator** (EU MDR/IVDR) and **ReviewsIntel** (agentic commerce evidence).

## Stack

- React 19 · Vite 8 · Tailwind CSS 4
- Framer Motion · **Lenis** smooth scroll
- React Router · react-helmet-async (SEO)
- Dynamic theme tokens (`ThemeProvider` — Craton / Aurora)

## Scripts

```bash
npm install
npm run dev      # uses VITE_PORT from .env (default 3000)
npm run build
npm run check
```

## Env

Copy `.env.example` → `.env`:

- `VITE_FORM_ENDPOINT` — Formspree / webhook (replaces mailto fallback)
- `VITE_BOOKING_URL` — Calendly / Cal.com pilot booking

## Structure

```
src/
  components/
    craton/     # Product UI mocks
    layout/     # Header, Footer, shell
    providers/  # Lenis + Theme
    sections/   # Landing sections
    seo/        # Meta + JSON-LD
    ui/         # Primitives
  config/       # site content + theme tokens
  pages/
```

Client reference lives in `docs/client-brief/` (not required at runtime).
