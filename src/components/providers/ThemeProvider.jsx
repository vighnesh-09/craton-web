'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { defaultThemeId, themes } from '@/config/theme'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'craton-theme'

function resolveThemeId(stored) {
  if (stored === 'light' || stored === 'dark') return stored
  return defaultThemeId
}

function applyThemeVars(theme) {
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  root.dataset.theme = theme.id
  root.dataset.mode = theme.mode
  root.style.colorScheme = theme.mode

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme.vars['--lagoon'])

  root.dispatchEvent(
    new CustomEvent('craton:themechange', { detail: { themeId: theme.id } }),
  )
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(defaultThemeId)
  const [hydrated, setHydrated] = useState(false)
  const theme = themes[themeId] || themes[defaultThemeId]

  useEffect(() => {
    try {
      setThemeId(resolveThemeId(localStorage.getItem(STORAGE_KEY)))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    applyThemeVars(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme.id)
    } catch {
      /* ignore */
    }
  }, [theme, hydrated])

  const setTheme = useCallback((id) => {
    if (themes[id]) setThemeId(id)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeId((id) => (id === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({
      themeId,
      theme,
      setTheme,
      cycleTheme,
      themes,
      isLight: theme.mode === 'light',
      isDark: theme.mode === 'dark',
    }),
    [themeId, theme, setTheme, cycleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
