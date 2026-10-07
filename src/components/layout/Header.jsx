import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Hero is always cinematic-dark. Nav stays transparent + light type over it,
 * then becomes a theme-aware glass pill only after the hero leaves view.
 */
export default function Header() {
  const [pastHero, setPastHero] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8))

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        // Solid chrome only once most of the hero has scrolled away
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.45)
      },
      { threshold: [0, 0.45, 0.7, 1], rootMargin: '-64px 0px 0px 0px' },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const overHero = !pastHero
  const solid = pastHero

  return (
    <header className="fixed inset-x-0 top-0 z-50 pad-x pt-3">
      <div
        className={cn(
          'mx-auto flex max-w-[1400px] items-center justify-between gap-4 transition-all duration-500 ease-out',
          overHero &&
            'rounded-full border border-transparent bg-transparent px-2 py-2.5 text-[#eef8f4] shadow-none backdrop-blur-0 sm:px-3',
          overHero &&
            scrolled &&
            'border-white/[0.06] bg-[#040c0a]/35 backdrop-blur-md',
          solid &&
            'glass-panel rounded-full px-4 py-2.5 text-cream sm:px-5',
        )}
      >
        <a href="#top" className="flex flex-col gap-0.5" aria-label={site.name}>
          <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.06em]">
            craton
            <span className={cn(overHero ? 'text-[#3ecfba]' : 'text-accent')}>
              .
            </span>
          </span>
          <span
            className={cn(
              'mono-label text-[7.5px]',
              overHero ? 'text-[#8ebdb0]' : 'text-muted',
            )}
          >
            Innovation-first. Evidence-led.
          </span>
        </a>

        <nav
          className={cn(
            'hidden items-center gap-6 text-[13px] lg:flex',
            overHero ? 'text-[#cfe8df]/88' : 'text-muted',
          )}
          aria-label="Primary"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors',
                overHero ? 'hover:text-white' : 'hover:text-cream',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={cn(
              'mono-label hidden text-[7.5px] lg:block',
              overHero ? 'text-[#8ebdb0]' : 'text-muted',
            )}
          >
            {site.location}
          </span>

          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border transition',
              overHero
                ? 'border-white/15 bg-white/[0.06] text-[#eef8f4] hover:bg-white/12'
                : 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-cream backdrop-blur-xl hover:shadow-[var(--glass-glow)]',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <Button
            href="#contact"
            className={cn(
              'hidden !min-h-10 !rounded-sm !px-4 !shadow-none hover:!translate-y-0 sm:inline-flex',
              overHero
                ? '!bg-[image:none] !bg-[#0f8f7b] !text-[#04100d] hover:!bg-[#3ecfba]'
                : undefined,
            )}
          >
            Request a pilot
          </Button>

          <button
            type="button"
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border lg:hidden',
              overHero
                ? 'border-white/15 bg-white/[0.06] text-[#eef8f4]'
                : 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-cream',
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
            className={cn(
              'mx-auto mt-2 max-w-[1400px] rounded-[1.5rem] p-5 lg:hidden',
              overHero
                ? 'border border-white/10 bg-[#0a1412]/92 text-[#eef8f4] backdrop-blur-xl'
                : 'glass-panel glass-panel--strong',
            )}
          >
            <div className="relative z-10 flex flex-col gap-4">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-base',
                    overHero ? 'text-[#eef8f4]/90' : 'text-cream/90',
                  )}
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
