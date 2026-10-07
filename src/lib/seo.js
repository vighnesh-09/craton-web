import { env } from '@/config/env'
import { site } from '@/config/site'

/** Build an absolute URL from a path or absolute href. */
export function absoluteUrl(path = '/') {
  if (!path) return env.appUrl
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${env.appUrl}${normalized}`
}

export function buildPageTitle(title) {
  if (!title || title === site.name || title === env.appName) {
    return `${site.name} — ${site.tagline}`
  }
  return `${title} · ${env.appName}`
}

/** Organization JSON-LD for homepage / sitewide schema. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    description: site.description,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.foundingLocation.locality,
        addressRegion: site.foundingLocation.region,
        addressCountry: site.foundingLocation.country,
      },
    },
    founder: {
      '@type': 'Person',
      name: site.founder.name,
      jobTitle: site.founder.jobTitle,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: env.contactEmail,
      contactType: 'customer support',
    },
  }
}

/** WebSite JSON-LD — helps search engines understand the primary site entity. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    description: site.description,
    inLanguage: site.language,
    publisher: {
      '@type': 'Organization',
      name: site.name,
    },
  }
}
