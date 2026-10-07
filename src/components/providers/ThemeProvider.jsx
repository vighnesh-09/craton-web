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

function resolveThemeId(stored) {
  if (stored === 'light' || stored === 'dark') return stored
  // migrate old theme ids
  if (stored === 'ember' || stored === 'vault' || stored === 'craton' || stored === 'aurora') {
    return stored === 'ember' || stored === 'vault' ? 'dark' : 'light'
  }
  return defaultThemeId
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return resolveThemeId(localStorage.getItem('craton-theme'))
    } catch {
      return defaultThemeId
    }
  })

  const theme = themes[themeId] || themes[defaultThemeId]

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.dataset.theme = theme.id
    root.dataset.mode = theme.mode
    root.style.colorScheme = theme.mode
    try {
      localStorage.setItem('craton-theme', theme.id)
    } catch {
      /* ignore */
    }
  }, [theme])

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
