/**
 * Typed access to Vite public env.
 * Never put API secrets here — only VITE_* values are safe in the browser.
 */
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
  appName: required('VITE_APP_NAME', 'Craton Technologies'),
  appUrl: required('VITE_APP_URL', 'http://localhost:3000'),
  contactEmail: required('VITE_CONTACT_EMAIL', 'hello@craton.io'),
  formEndpoint: required('VITE_FORM_ENDPOINT', ''),
  bookingUrl: required('VITE_BOOKING_URL', ''),
  heroVideoUrl: required('VITE_HERO_VIDEO_URL', ''),
  heroPosterUrl: required('VITE_HERO_POSTER_URL', ''),
})
