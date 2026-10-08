import {
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Syne,
} from 'next/font/google'

/**
 * Self-hosted Google fonts. Each `variable` is wired into the
 * --font-display / --font-body / --font-serif / --font-mono tokens.
 */
const fontDisplay = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

const fontBody = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const fontVariableClassName = [
  fontDisplay.variable,
  fontBody.variable,
  fontSerif.variable,
  fontMono.variable,
].join(' ')
