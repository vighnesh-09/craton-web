import { env } from '@/config/env'
import { pages } from '@/content/pages'

const entries = [
  { page: pages.home, changeFrequency: 'weekly', priority: 1 },
  { page: pages.raccelerator, changeFrequency: 'monthly', priority: 0.8 },
  { page: pages.reviewsintel, changeFrequency: 'monthly', priority: 0.8 },
  { page: pages.privacy, changeFrequency: 'yearly', priority: 0.3 },
  { page: pages.terms, changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap() {
  return entries.map(({ page, changeFrequency, priority }) => ({
    url: new URL(page.path, env.appUrl).href,
    changeFrequency,
    priority,
  }))
}
