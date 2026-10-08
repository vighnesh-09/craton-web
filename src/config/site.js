/**
 * Canonical site identity used for SEO, structured data, and share cards.
 * `name`, `url`, and `contactEmail` are fallbacks when the matching NEXT_PUBLIC_*
 * value is unset. Runtime readers use src/config/env.js. This file does not
 * import env.js (env.js imports this module).
 */
export const site = Object.freeze({
  name: 'Craton Technologies',
  legalName: 'Craton Technologies LLC',
  shortName: 'Craton',
  tagline: 'Bold ideas. Engineered forward.',
  description:
    'Craton Technologies is an innovation-driven product company in Frisco, Texas that invents, protects, and ships AI-enabled products for regulated, evidence-heavy industries — beginning with RAccelerator for EU MDR and IVDR regulatory affairs.',
  url: 'https://craton.io',
  locale: 'en_US',
  language: 'en',
  themeColor: '#1E2A3A',
  twitterHandle: '',
  foundingLocation: Object.freeze({
    locality: 'Frisco',
    region: 'TX',
    country: 'US',
  }),
  founder: Object.freeze({
    name: 'Sheik Ahamed Ali',
    jobTitle: 'Founder & CEO',
  }),
  contactEmail: 'hello@craton.io',
  ogImage: '/og/default.png',
  robots:
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
})
