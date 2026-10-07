import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 24
    setSolid((prev) => (prev === next ? prev : next))
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 pad-x pt-3">
      <div
        className={cn(
          'mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-2 py-2.5 transition-all duration-300 sm:px-3',
          solid && 'glass-panel rounded-full px-4 py-2.5 sm:px-5',
          !solid && 'border-transparent bg-transparent text-[#eef8f4] shadow-none',
        )}
      >
        <a href="#top" className="flex items-baseline gap-1.5" aria-label={site.name}>
          <span className="text-[1.4rem] font-semibold leading-none tracking-[-0.06em]">
            craton
            <span className="text-accent">.</span>
          </span>
        </a>

        <nav
          className={cn(
            'hidden items-center gap-7 text-[12.5px] font-medium tracking-[0.01em] xl:flex',
            solid ? 'text-muted' : 'text-[#d7ebe3]/88',
          )}
          aria-label="Primary"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors',
                solid ? 'hover:text-cream' : 'hover:text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border transition',
              solid
                ? 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-cream hover:shadow-[var(--glass-glow)]'
                : 'border-white/20 bg-white/10 text-[#eef8f4] hover:bg-white/15',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <a
            href="#contact"
            className={cn(
              'hidden min-h-10 items-center justify-center rounded-sm px-4 text-[12.5px] font-semibold transition sm:inline-flex',
              solid
                ? 'bg-[image:var(--btn-face)] text-white shadow-[0_10px_24px_-14px_var(--glow)] hover:brightness-105'
                : 'bg-[#eef8f4] text-[#0a1412] hover:bg-white',
            )}
          >
            Request a pilot
          </a>

          <button
            type="button"
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border xl:hidden',
              solid
                ? 'border-[var(--glass-border)] bg-[var(--glass-bg)]'
                : 'border-white/20 bg-white/10 text-[#eef8f4]',
            )}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="glass-panel glass-panel--strong mx-auto mt-2 max-w-[1400px] rounded-[1.25rem] p-5 xl:hidden"
          >
            <div className="relative z-10 flex flex-col gap-1">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-cream/90 transition hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-sm bg-[image:var(--btn-face)] px-5 text-[13px] font-semibold text-white"
              >
                Request a pilot
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
