/**
 * Typed access to Next.js public env.
 * Never put API secrets here — only NEXT_PUBLIC_* values are safe in the browser.
 */
import { site } from '@/config/site'

function required(key, fallback = '') {
  const value = process.env[key]
  if (value === undefined || value === '') return fallback
  return String(value)
}

const nodeEnv = process.env.NODE_ENV || 'development'

export const env = Object.freeze({
  mode: nodeEnv,
  isDev: nodeEnv === 'development',
  isProd: nodeEnv === 'production',
  appName: required('NEXT_PUBLIC_APP_NAME', site.name),
  appUrl: required('NEXT_PUBLIC_APP_URL', site.url).replace(/\/$/, ''),
  contactEmail: required('NEXT_PUBLIC_CONTACT_EMAIL', site.contactEmail),
})
