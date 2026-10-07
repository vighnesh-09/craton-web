import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 20))

  return (
    <header className="fixed inset-x-0 top-0 z-50 pad-x pt-3">
      <div
        className={cn(
          'mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-1 py-2.5 transition-all duration-300 sm:px-2',
          solid &&
            'glass-panel rounded-full px-4 py-2.5 sm:px-5',
          !solid &&
            'border-transparent bg-transparent text-[#eef8f4] shadow-none backdrop-blur-0',
        )}
      >
        <a href="#top" className="flex flex-col gap-0.5" aria-label={site.name}>
          <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.06em]">
            craton
            <span className="text-accent">.</span>
          </span>
          <span
            className={cn(
              'mono-label text-[7.5px]',
              solid ? 'text-muted' : 'text-[#8ebdb0]',
            )}
          >
            Innovation-first. Evidence-led.
          </span>
        </a>

        <nav
          className={cn(
            'hidden items-center gap-6 text-[13px] lg:flex',
            solid ? 'text-muted' : 'text-[#cfe8df]/85',
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

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={cn(
              'mono-label hidden text-[7.5px] xl:block',
              solid ? 'text-muted' : 'text-[#8ebdb0]',
            )}
          >
            {site.location}
          </span>

          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border backdrop-blur-xl transition',
              solid
                ? 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-cream hover:shadow-[var(--glass-glow)]'
                : 'border-white/20 bg-white/10 text-[#eef8f4] hover:bg-white/15',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <Button
            href="#contact"
            className={cn(
              'hidden !min-h-10 !px-4 sm:inline-flex',
              !solid &&
                '!rounded-sm !bg-[#eef8f4] !text-[#0a1412] hover:!bg-white',
            )}
          >
            Request a pilot
          </Button>

          <button
            type="button"
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border lg:hidden',
              solid
                ? 'border-[var(--glass-border)] bg-[var(--glass-bg)]'
                : 'border-white/20 bg-white/10 text-[#eef8f4]',
            )}
            aria-expanded={open}
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
            className="glass-panel glass-panel--strong mx-auto mt-2 max-w-[1400px] rounded-[1.5rem] p-5 lg:hidden"
          >
            <div className="relative z-10 flex flex-col gap-4">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-cream/90"
                >
                  {item.label}
                </a>
              ))}
              <Button href="#contact" onClick={() => setOpen(false)}>
                Request a pilot
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
