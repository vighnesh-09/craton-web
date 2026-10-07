/**
 * Typed access to Vite public env.
 * Never put API secrets here — only VITE_* values are safe in the browser.
 */
import { site } from '@/config/site'

const raw = import.meta.env

function required(key, fallback = '') {
  const value = raw[key]
  if (value === undefined || value === '') return fallback
  return String(value)
}

export const env = Object.freeze({
  mode: raw.MODE,
  isDev: raw.DEV,
  isProd: raw.PROD,
  appName: required('VITE_APP_NAME', site.name),
  appUrl: required('VITE_APP_URL', site.url).replace(/\/$/, ''),
  contactEmail: required('VITE_CONTACT_EMAIL', site.contactEmail),
})
