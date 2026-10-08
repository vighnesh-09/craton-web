import { Helmet } from 'react-helmet-async'
import { env } from '@/config/env'
import { site } from '@/config/site'

export default function Seo({
  title = site.seo.title,
  description = site.seo.description,
  path = '/',
}) {
  const url = `${env.appUrl.replace(/\/$/, '')}${path}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      email: site.email,
      logo: `${env.appUrl.replace(/\/$/, '')}/brand/craton-logo.png`,
      description: site.seo.description,
      foundingLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Frisco',
          addressRegion: 'TX',
          addressCountry: 'US',
        },
      },
      founder: {
        '@type': 'Person',
        name: site.founder.name,
        jobTitle: site.founder.role,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: site.email,
        contactType: 'sales',
        areaServed: 'Worldwide',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RAccelerator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: site.products.ra.summary,
      offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder' },
      provider: { '@type': 'Organization', name: site.name },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ReviewsIntel',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: site.products.ri.summary,
      provider: { '@type': 'Organization', name: site.name },
    },
  ]

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={site.seo.keywords} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
