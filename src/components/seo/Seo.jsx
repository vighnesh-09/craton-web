import { useEffect } from 'react'
import { site } from '@/config/site'
import { absoluteUrl, buildPageTitle } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Client-side document head manager for route-level SEO.
 * Static defaults live in index.html for first paint / non-JS crawlers.
 */
export default function Seo({
  title,
  description = site.description,
  path = '/',
  image = site.ogImage,
  robots = site.robots,
  ogTitle,
  ogDescription,
  jsonLd,
  noIndex = false,
}) {
  const canonical = absoluteUrl(path)
  const pageTitle = buildPageTitle(title)
  const shareTitle = ogTitle || pageTitle
  const shareDescription = ogDescription || description
  const shareImage = absoluteUrl(image)
  const robotsContent = noIndex ? 'noindex,follow' : robots

  useEffect(() => {
    const previousTitle = document.title
    document.title = pageTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robotsContent)
    upsertMeta('name', 'theme-color', site.themeColor)
    upsertMeta('name', 'author', site.name)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:locale', site.locale)
    upsertMeta('property', 'og:title', shareTitle)
    upsertMeta('property', 'og:description', shareDescription)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', shareImage)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', shareTitle)
    upsertMeta('name', 'twitter:description', shareDescription)
    upsertMeta('name', 'twitter:image', shareImage)
    if (site.twitterHandle) {
      upsertMeta('name', 'twitter:site', site.twitterHandle)
    }
    upsertLink('canonical', canonical)

    return () => {
      document.title = previousTitle
    }
  }, [
    pageTitle,
    description,
    robotsContent,
    shareTitle,
    shareDescription,
    canonical,
    shareImage,
  ])

  if (!jsonLd) return null
  return <JsonLd data={jsonLd} />
}
