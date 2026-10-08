import { env } from '@/config/env'
import { site } from '@/config/site'

/**
 * Per-route SEO metadata.
 * Add a new entry whenever a public route is introduced.
 */
export const pages = Object.freeze({
  home: Object.freeze({
    path: '/',
    title: env.appName,
    description: site.description,
    ogTitle: `${env.appName} — ${site.tagline}`,
    ogDescription:
      'We invent, protect, and ship AI-enabled products for trust-critical work — from a stable core, across many domains.',
    robots: site.robots,
  }),
  notFound: Object.freeze({
    path: '/404',
    title: 'Page not found',
    description: `The page you requested could not be found on ${env.appName}.`,
    robots: 'noindex,follow',
  }),
  raccelerator: Object.freeze({
    path: '/products/raccelerator',
    title: 'RAccelerator',
    description:
      'RAccelerator turns EU MDR and IVDR technical files into arguments experts can review, with the evidence still attached. A regulatory lead makes the call.',
    ogTitle: `RAccelerator — ${env.appName}`,
  }),
  reviewsintel: Object.freeze({
    path: '/products/reviewsintel',
    title: 'ReviewsIntel',
    description:
      'ReviewsIntel connects an agent’s purchase recommendation to the reviews behind it, so a person can authorize checkout. Patent pending.',
    ogTitle: `ReviewsIntel — ${env.appName}`,
  }),
  privacy: Object.freeze({
    path: '/privacy',
    title: 'Privacy',
    description: `How ${env.appName} handles information on this website. The contact form opens your email app and does not store a message on the site.`,
    ogTitle: `Privacy — ${env.appName}`,
  }),
  terms: Object.freeze({
    path: '/terms',
    title: 'Terms',
    description: `Terms for the ${env.appName} website. The products prepare a case. They do not make the regulatory or purchase decision.`,
    ogTitle: `Terms — ${env.appName}`,
  }),
})
