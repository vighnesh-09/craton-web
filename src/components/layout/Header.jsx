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
  const [overHero, setOverHero] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const lenis = useLenis()

  useEffect(() => {
    const readScroll = () =>
      typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY || 0

    const sync = () => {
      const hero = document.getElementById('top')
      const y = readScroll()
      setScrolled(y > 8)

      if (!hero) {
        setOverHero(false)
        return
      }

      const rect = hero.getBoundingClientRect()
      // Still covering the top band of the viewport
      const covering = rect.bottom > window.innerHeight * 0.42
      setOverHero(covering && y < hero.offsetHeight * 0.85)
    }

    sync()

    // Hero mounts after lazy HomePage — keep syncing until present
    let boots = 0
    const boot = window.setInterval(() => {
      sync()
      boots += 1
      if (document.getElementById('top') || boots > 50) {
        window.clearInterval(boot)
      }
    }, 80)

    if (lenis) {
      const onScroll = () => sync()
      lenis.on('scroll', onScroll)
      return () => {
        window.clearInterval(boot)
        lenis.off('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.clearInterval(boot)
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [lenis])

  const lightSolid = !overHero && isLight
  const darkSolid = !overHero && !isLight

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full pt-3">
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
              overHero || darkSolid ? 'text-[#c9d8e8]/90' : 'text-[#2f3f54]',
            )}
            aria-label="Primary"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors',
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
                overHero || darkSolid ? 'text-[#8aa0b8]' : 'text-[#3a6d8c]',
              )}
            >
              {site.location}
            </span>

            <button
              type="button"
              onClick={cycleTheme}
              className={cn(
                'jelly inline-flex size-10 items-center justify-center rounded-full border',
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
                'hidden !min-h-10 !rounded-sm !bg-[image:none] !px-4 !shadow-none sm:inline-flex',
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
                'jelly inline-flex size-10 items-center justify-center rounded-full border lg:hidden',
                overHero &&
                  'border-white/15 bg-white/[0.06] text-[#e8eef5]',
                lightSolid &&
                  'border-[#1e2a3a]/12 bg-[#f4f5f7] text-[#1e2a3a]',
                darkSolid &&
                  'border-white/12 bg-white/[0.06] text-[#e8eef5]',
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
                    className="text-base"
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
