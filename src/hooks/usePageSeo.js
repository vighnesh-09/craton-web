import { useEffect } from 'react'
import { site } from '@/config/site'
import { absoluteUrl, buildPageTitle } from '@/lib/seo'

/**
 * Lightweight title + description helper for simple pages.
 * Prefer <Seo /> when you need Open Graph / canonical / JSON-LD.
 */
export function usePageSeo({ title, description, path } = {}) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = buildPageTitle(title)

    const descEl = document.querySelector('meta[name="description"]')
    const previousDesc = descEl?.getAttribute('content') ?? ''
    if (descEl && description) {
      descEl.setAttribute('content', description)
    }

    const canonicalEl = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonicalEl?.getAttribute('href') ?? ''
    if (canonicalEl && path) {
      canonicalEl.setAttribute('href', absoluteUrl(path))
    }

    return () => {
      document.title = previousTitle
      if (descEl && description) descEl.setAttribute('content', previousDesc)
      if (canonicalEl && path) {
        canonicalEl.setAttribute('href', previousCanonical || absoluteUrl('/'))
      }
    }
  }, [title, description, path])
}

/** @deprecated Prefer usePageSeo or <Seo /> */
export function useDocumentTitle(title) {
  usePageSeo({ title: title || site.name })
}
