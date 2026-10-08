import { env } from '@/config/env'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${env.appUrl}/sitemap.xml`,
    host: new URL(env.appUrl).host,
  }
}
