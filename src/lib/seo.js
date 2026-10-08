import { env } from '@/config/env'
import { site } from '@/config/site'
import { pages } from '@/content/pages'

export const shareImage = Object.freeze({
  url: site.ogImage,
  width: 1200,
  height: 630,
  alt: `${env.appName} — ${site.tagline}`,
})

/** JSON-LD safe to drop into a script tag. */
export function jsonLdString(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const indexableRobots = {
  index: true,
  follow: true,
  'max-image-preview': 'large',
  'max-snippet': -1,
  'max-video-preview': -1,
}

/**
 * Complete metadata for a public route in src/content/pages.js.
 * Home uses an absolute title so the layout template does not double the brand.
 * `robots` is always set: an omitted or undefined value was dropping the layout directives.
 */
export function pageMetadata(page, { index = true } = {}) {
  const shareTitle =
    page.ogTitle ||
    (page.title && page.title !== env.appName
      ? `${page.title} · ${env.appName}`
      : `${env.appName} — ${site.tagline}`)
  const shareDescription = page.ogDescription || page.description

  return {
    title: page.path === '/' ? { absolute: shareTitle } : page.title,
    description: page.description,
    alternates: index ? { canonical: page.path } : undefined,
    robots: index ? indexableRobots : { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: site.locale,
      url: index ? page.path : undefined,
      siteName: env.appName,
      title: shareTitle,
      description: shareDescription,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [shareImage.url],
    },
  }
}

/** Build an absolute URL from a path or absolute href. */
export function absoluteUrl(path = '/') {
  if (!path) return env.appUrl
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${env.appUrl}${normalized}`
}

export function buildPageTitle(title) {
  if (!title || title === env.appName) {
    return `${env.appName} — ${site.tagline}`
  }
  return `${title} · ${env.appName}`
}

/** Organization JSON-LD for homepage / sitewide schema. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: env.appName,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/logo.png'),
    image: absoluteUrl(site.ogImage),
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
    name: env.appName,
    url: absoluteUrl('/'),
    description: site.description,
    inLanguage: site.language,
    publisher: {
      '@type': 'Organization',
      name: env.appName,
      url: absoluteUrl('/'),
    },
  }
}

/**
 * SoftwareApplication JSON-LD for a product page.
 * Status comes from the product badge (in development / patent pending).
 * No offers, prices, or ratings — those claims are not on the site.
 */
export function softwareApplicationJsonLd(item) {
  const page = Object.values(pages).find((entry) => entry.path === item.href)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: item.name,
    description: page?.description || item.description,
    url: absoluteUrl(page?.path || item.href),
    image: absoluteUrl(item.image.src),
    applicationCategory: 'BusinessApplication',
    creativeWorkStatus: item.badge,
    featureList: item.points,
    provider: {
      '@type': 'Organization',
      name: env.appName,
      url: absoluteUrl('/'),
    },
  }
}
