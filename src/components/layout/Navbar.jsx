'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLenis } from '@/components/providers/LenisProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import BrandMark from '@/components/ui/BrandMark'
import SiteContainer from '@/components/layout/SiteContainer'
import {
  darkNavSections,
  headerCta,
  primaryNav,
} from '@/content/navigation'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/cn'

const NAV_SAMPLE_Y = 56

function isNavOverDark() {
  for (const id of darkNavSections) {
    const el = document.getElementById(id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= NAV_SAMPLE_Y && r.bottom > NAV_SAMPLE_Y) return true
  }
  return false
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [overDark, setOverDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const lenis = useLenis()

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      setOverDark(isNavOverDark())
      setScrolled(window.scrollY > 24)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Lenis may not always emit window scroll in every setup — poll lightly via scroll events on both
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [])

  const go = (href) => (event) => {
    event.preventDefault()
    setOpen(false)
    scrollToId(href, lenis)
  }

  const onDark = overDark
  const solid = scrolled || !onDark

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300',
        solid && onDark && 'border-b border-line-on-dark bg-craton/72 backdrop-blur-xl',
        solid && !onDark && 'border-b border-line bg-foam/88 shadow-sm backdrop-blur-xl',
        !solid && 'border-b border-transparent bg-transparent',
      )}
    >
      <SiteContainer className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8 sm:py-5">
        <BrandMark
          href="#top"
          tone={onDark ? 'on-dark' : 'on-light'}
          onClick={go('#top')}
        />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={go(link.href)}
              className={cn(
                'group relative py-2.5 text-[13px] font-medium transition-colors duration-300',
                onDark
                  ? 'text-hero-nav hover:text-hero-fg'
                  : 'text-ink/70 hover:text-ink',
              )}
            >
              {link.label}
              {link.num ? (
                <sup className="ml-1.5 font-mono text-[9px] tracking-wide text-copper">
                  {link.num}
                </sup>
              ) : null}
              <span
                aria-hidden
                className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300',
              onDark
                ? 'border-line-on-dark text-hero-fg hover:bg-hero-fg/10'
                : 'border-line text-ink hover:bg-ink/5',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <a
            href={headerCta.href}
            onClick={go(headerCta.href)}
            className={cn(
              'group inline-flex items-center gap-3 text-[12px] font-medium transition-colors duration-300',
              onDark
                ? 'text-hero-nav hover:text-hero-fg'
                : 'text-ink/70 hover:text-ink',
            )}
          >
            <span className="hidden xl:inline">{headerCta.label}</span>
            <span
              className={cn(
                'grid size-9 place-items-center rounded-full border transition-colors duration-300',
                onDark
                  ? 'border-line-on-dark group-hover:bg-hero-cta group-hover:text-craton'
                  : 'border-line group-hover:bg-ink group-hover:text-foam',
              )}
            >
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-300',
              onDark
                ? 'border-line-on-dark text-hero-fg hover:bg-hero-fg/10'
                : 'border-line text-ink hover:bg-ink/5',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'rounded-full p-2 transition-colors duration-300',
              onDark
                ? 'text-hero-fg hover:bg-hero-fg/10'
                : 'text-ink hover:bg-ink/5',
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </SiteContainer>

      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t backdrop-blur-md transition-all duration-300 lg:hidden',
          onDark
            ? 'border-line-on-dark bg-craton/95'
            : 'border-line bg-foam/95',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {primaryNav.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={go(link.href)}
              className={cn(
                'py-2 text-base font-medium',
                onDark ? 'text-hero-nav' : 'text-ink/80',
              )}
            >
              {link.label}
              {link.num ? (
                <sup className="ml-1.5 font-mono text-[9px] text-copper">
                  {link.num}
                </sup>
              ) : null}
            </a>
          ))}
          <a
            href={headerCta.href}
            onClick={go(headerCta.href)}
            className={cn(
              'mt-3 inline-flex items-center justify-between rounded-full border px-5 py-3 text-sm font-medium',
              onDark
                ? 'border-line-on-dark text-hero-fg'
                : 'border-line text-ink',
            )}
          >
            {headerCta.label}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
