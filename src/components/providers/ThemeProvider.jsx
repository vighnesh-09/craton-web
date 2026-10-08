import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { defaultThemeId, themes } from '@/config/theme'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'craton-theme'

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function hasSavedChoice(stored) {
  return (
    stored === 'light' ||
    stored === 'dark' ||
    stored === 'ember' ||
    stored === 'vault' ||
    stored === 'craton' ||
    stored === 'aurora'
  )
}

function systemThemeId() {
  if (typeof window === 'undefined') return defaultThemeId
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveInitialThemeId() {
  const stored = readStoredTheme()
  if (stored === 'light' || stored === 'dark') return stored
  if (stored === 'ember' || stored === 'vault') return 'dark'
  if (stored === 'craton' || stored === 'aurora') return 'light'
  return systemThemeId()
}

export function ThemeProvider({ children }) {
  const explicitChoice = useRef(false)
  const [themeId, setThemeId] = useState(resolveInitialThemeId)

  const theme = themes[themeId] || themes[defaultThemeId]

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.dataset.theme = theme.id
    root.dataset.mode = theme.mode
    root.style.colorScheme = theme.mode
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme.mode === 'dark' ? '#121A24' : '#00A8C4')
    if (!explicitChoice.current) return
    try {
      localStorage.setItem(STORAGE_KEY, theme.id)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    if (hasSavedChoice(readStoredTheme())) return undefined
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (explicitChoice.current) return
      setThemeId(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((id) => {
    if (!themes[id]) return
    explicitChoice.current = true
    setThemeId(id)
  }, [])

  const cycleTheme = useCallback(() => {
    explicitChoice.current = true
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
