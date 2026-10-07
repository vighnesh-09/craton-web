import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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
              'border-white/10 bg-[#040c0a]/55 backdrop-blur-md',
            lightSolid &&
              'rounded-full border border-[#152821]/12 bg-white px-4 py-2.5 text-[#152821] shadow-[0_12px_40px_-16px_rgba(21,40,33,0.18)] sm:px-5',
            darkSolid &&
              'rounded-full border border-white/12 bg-[#0f1c18]/95 px-4 py-2.5 text-[#eef8f4] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-5',
          )}
        >
          <a href="#top" className="flex flex-col gap-0.5" aria-label={site.name}>
            <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.06em]">
              craton
              <span
                className={cn(
                  overHero || darkSolid ? 'text-[#3ecfba]' : 'text-[#0f8f7b]',
                )}
              >
                .
              </span>
            </span>
            <span
              className={cn(
                'mono-label text-[7.5px]',
                overHero || darkSolid ? 'text-[#8ebdb0]' : 'text-[#3d6b5f]',
              )}
            >
              Innovation-first. Evidence-led.
            </span>
          </a>

          <nav
            className={cn(
              'hidden items-center gap-5 text-[13px] xl:gap-6 lg:flex',
              overHero || darkSolid ? 'text-[#cfe8df]/90' : 'text-[#2f564c]',
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
                    : 'hover:text-[#0a1412]',
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
                overHero || darkSolid ? 'text-[#8ebdb0]' : 'text-[#3d6b5f]',
              )}
            >
              {site.location}
            </span>

            <button
              type="button"
              onClick={cycleTheme}
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-full border transition',
                overHero &&
                  'border-white/15 bg-white/[0.06] text-[#eef8f4] hover:bg-white/12',
                lightSolid &&
                  'border-[#152821]/12 bg-[#f4f7f5] text-[#152821] hover:bg-[#e8f0ec]',
                darkSolid &&
                  'border-white/12 bg-white/[0.06] text-[#eef8f4] hover:bg-white/10',
              )}
              aria-label={
                isLight ? 'Switch to dark mode' : 'Switch to light mode'
              }
              title={isLight ? 'Dark' : 'Light'}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Button
              href="#contact"
              className={cn(
                'hidden !min-h-10 !rounded-sm !bg-[image:none] !px-4 !shadow-none hover:!translate-y-0 sm:inline-flex',
                (overHero || darkSolid) &&
                  '!bg-[#0f8f7b] !text-[#04100d] hover:!bg-[#3ecfba]',
                lightSolid &&
                  '!bg-[#0f8f7b] !text-white hover:!bg-[#0b6f60]',
              )}
            >
              Request a pilot
            </Button>

            <button
              type="button"
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-full border lg:hidden',
                overHero &&
                  'border-white/15 bg-white/[0.06] text-[#eef8f4]',
                lightSolid &&
                  'border-[#152821]/12 bg-[#f4f7f5] text-[#152821]',
                darkSolid &&
                  'border-white/12 bg-white/[0.06] text-[#eef8f4]',
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
                'shell mt-2 rounded-[1.5rem] border p-5 backdrop-blur-xl lg:hidden',
                overHero && 'border-white/10 bg-[#0a1412]/95 text-[#eef8f4]',
                lightSolid &&
                  'border-[#152821]/10 bg-white text-[#152821]',
                darkSolid && 'border-white/10 bg-[#0f1c18]/95 text-[#eef8f4]',
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
                <Button href="#contact" onClick={() => setOpen(false)}>
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
