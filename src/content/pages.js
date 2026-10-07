import { site } from '@/config/site'

/**
 * Per-route SEO metadata.
 * Add a new entry whenever a public route is introduced.
 */
export const pages = Object.freeze({
  home: Object.freeze({
    path: '/',
    title: site.name,
    description: site.description,
    ogTitle: `${site.name} — ${site.tagline}`,
    ogDescription:
      'We invent, protect, and ship AI-enabled products for trust-critical work — from a stable core, across many domains.',
    robots: site.robots,
  }),
  notFound: Object.freeze({
    path: '/404',
    title: 'Page not found',
    description: `The page you requested could not be found on ${site.name}.`,
    robots: 'noindex,follow',
  }),
})
