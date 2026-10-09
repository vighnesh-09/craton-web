import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import BrandLogo from '@/components/ui/BrandLogo'
import Button from '@/components/ui/Button'
import { useLenis } from '@/components/providers/LenisProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Over cinematic hero → transparent / dark glass + light type.
 * Past hero + light → solid white pill.
 * Past hero + dark → ink glass pill.
 */
export default function Header() {
  const [overHero, setOverHero] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const lenis = useLenis()

  useEffect(() => {
    let heroLine = window.innerHeight * 0.72
    let scrolledNow = false
    let overNow = true
    const readScroll = () =>
      typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY || 0

    // Scroll position only. Viewport height is cached so the handler does not reflow.
    const sync = () => {
      const y = readScroll()
      const nextScrolled = y > 8
      const nextOver = y < heroLine
      if (nextScrolled !== scrolledNow) {
        scrolledNow = nextScrolled
        setScrolled(nextScrolled)
      }
      if (nextOver !== overNow) {
        overNow = nextOver
        setOverHero(nextOver)
      }
    }

    const onResize = () => {
      heroLine = window.innerHeight * 0.72
      sync()
    }

    sync()

    if (lenis) {
      lenis.on('scroll', sync)
      window.addEventListener('resize', onResize)
      return () => {
        lenis.off('scroll', sync)
        window.removeEventListener('resize', onResize)
      }
    }

    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', onResize)
    }
  }, [lenis])

  const lightSolid = !overHero && isLight
  const darkSolid = !overHero && !isLight

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full pt-3',
        overHero && 'bg-[#0E1A24]',
      )}
    >
      <div className="pad-x w-full">
        <div
          className={cn(
            'shell flex items-center justify-between gap-4 transition-all duration-400 ease-out',
            overHero &&
              'rounded-full border border-transparent bg-transparent px-3 py-2.5 text-[#eef8f4] shadow-none sm:px-4',
            overHero &&
              scrolled &&
              'border-white/10 bg-[#0f1621]/60 backdrop-blur-md',
            lightSolid &&
              'glass-panel rounded-full px-4 py-2.5 text-[#1e2a3a] sm:px-5',
            darkSolid &&
              'glass-panel rounded-full px-4 py-2.5 text-[#e8eef5] sm:px-5',
          )}
        >
          <a href="#top" aria-label={site.name}>
            <BrandLogo inverted={overHero || darkSolid} />
          </a>

          <nav
            className={cn(
              'hidden items-center gap-5 text-[13px] xl:gap-6 lg:flex',
              overHero || darkSolid ? 'text-[#d5e0ea]' : 'text-[#2f3f54]',
            )}
            aria-label="Primary"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex min-h-12 items-center transition-colors',
                  overHero || darkSolid
                    ? 'hover:text-white'
                    : 'hover:text-[#0f1621]',
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
                overHero || darkSolid ? 'text-[#d5e0ea]' : 'text-[#1e4d66]',
              )}
            >
              {site.location}
            </span>

            <button
              type="button"
              onClick={cycleTheme}
              className={cn(
                'jelly inline-flex size-12 items-center justify-center rounded-full border',
                overHero &&
                  'border-white/15 bg-white/[0.06] text-[#e8eef5] hover:bg-white/12',
                lightSolid &&
                  'border-[#1e2a3a]/12 bg-[#f4f5f7] text-[#1e2a3a] hover:bg-[#e8ecf1]',
                darkSolid &&
                  'border-white/12 bg-white/[0.06] text-[#e8eef5] hover:bg-white/10',
              )}
              aria-label={
                isLight ? 'Switch to dark theme' : 'Switch to light theme'
              }
              title={isLight ? 'Dark' : 'Light'}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Button
              href="#contact"
              className={cn(
                'hidden !min-h-12 !rounded-sm !bg-[image:none] !px-4 !shadow-none sm:inline-flex',
                (overHero || darkSolid) &&
                  '!bg-[#00e5ff] !text-[#0f1621] hover:!bg-[#5cfbff]',
                lightSolid &&
                  '!bg-[#00a8c4] !text-[#102033] hover:!bg-[#007a96] hover:!text-white',
              )}
            >
              Request a pilot
            </Button>

            <button
              type="button"
              className={cn(
                'jelly inline-flex size-12 items-center justify-center rounded-full border lg:hidden',
                overHero &&
                  'border-white/15 bg-white/[0.06] text-[#e8eef5]',
                lightSolid &&
                  'border-[#1e2a3a]/12 bg-[#f4f5f7] text-[#1e2a3a]',
                darkSolid &&
                  'border-white/12 bg-white/[0.06] text-[#e8eef5]',
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
              className={cn(
                'shell mt-2 rounded-[1.5rem] p-5 lg:hidden',
                overHero && 'border border-white/10 bg-[#0f1621]/95 text-[#e8eef5] backdrop-blur-xl',
                lightSolid && 'glass-panel glass-panel--strong text-[#1e2a3a]',
                darkSolid && 'glass-panel glass-panel--strong text-[#e8eef5]',
              )}
            >
              <div className="flex flex-col gap-4">
                {site.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-12 items-center text-base"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    '!bg-[image:none] !shadow-none',
                    overHero || !isLight
                      ? '!bg-[#00e5ff] !text-[#0f1621] hover:!bg-[#5cfbff]'
                      : '!bg-[#00a8c4] !text-[#102033] hover:!bg-[#007a96] hover:!text-white',
                  )}
                >
                  Request a pilot
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
