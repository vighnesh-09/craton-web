'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from '@/components/providers/LenisProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import BrandMark from '@/components/ui/BrandMark'
import SiteContainer from '@/components/layout/SiteContainer'
import {
  darkNavSections,
  headerCta,
  primaryNav,
} from '@/content/navigation'
import { useSiteLink } from '@/hooks/useSiteLink'
import { cn } from '@/lib/cn'

const NAV_SAMPLE_Y = 44

function isNavOverDark() {
  for (const id of darkNavSections) {
    const el = document.getElementById(id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= NAV_SAMPLE_Y && r.bottom > NAV_SAMPLE_Y) return true
  }
  return false
}

const DRAWER_EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'
const DRAWER_MS = 'duration-[320ms]'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [overDark, setOverDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { cycleTheme, isLight } = useTheme()
  const follow = useSiteLink()
  const lenis = useLenis()
  const lenisRef = useRef(null)
  const menuButtonRef = useRef(null)
  const themeButtonRef = useRef(null)
  const drawerRef = useRef(null)
  const scrollLock = useRef(null)
  lenisRef.current = lenis

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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!open) {
      if (scrollLock.current != null) {
        root.style.overflow = scrollLock.current
        scrollLock.current = null
      }
      return undefined
    }

    if (scrollLock.current == null) {
      scrollLock.current = root.style.overflow
      root.style.overflow = 'hidden'
    }
    lenis?.stop()

    return () => {
      lenis?.start()
      if (scrollLock.current == null) return
      root.style.overflow = scrollLock.current
      scrollLock.current = null
    }
  }, [open, lenis])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const drawer = drawerRef.current
    const selector = 'a[href], button:not([disabled])'
    drawer?.querySelector(selector)?.focus({ preventScroll: true })

    const focusables = () =>
      [
        themeButtonRef.current,
        menuButtonRef.current,
        ...(drawer?.querySelectorAll(selector) ?? []),
      ].filter(Boolean)

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const nodes = focusables()
      if (!nodes.length) return
      const current = nodes.indexOf(document.activeElement)
      const next =
        current === -1
          ? nodes[event.shiftKey ? nodes.length - 1 : 0]
          : nodes[
              (current + (event.shiftKey ? -1 : 1) + nodes.length) %
                nodes.length
            ]
      event.preventDefault()
      next.focus({ preventScroll: true })
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      const button = menuButtonRef.current
      if (button?.getClientRects().length) {
        button.focus({ preventScroll: true })
      }
    }
  }, [open])

  const releaseScroll = () => {
    if (scrollLock.current != null) {
      document.documentElement.style.overflow = scrollLock.current
      scrollLock.current = null
    }
    // Resume before hash scrolling. Lenis ignores scrollTo while stopped,
    // and overflow:hidden alone does not block its wheel handler.
    lenisRef.current?.start()
  }

  const go = (href) => (event) => {
    releaseScroll()
    setOpen(false)
    follow(href)(event)
  }

  const onDark = overDark
  const solid = scrolled || !onDark || open

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300',
        solid &&
          onDark &&
          (open
            ? 'border-b border-line-on-dark bg-craton backdrop-blur-xl'
            : 'border-b border-line-on-dark bg-craton/72 backdrop-blur-xl'),
        solid &&
          !onDark &&
          (open
            ? 'border-b border-line bg-foam shadow-sm backdrop-blur-xl'
            : 'border-b border-line bg-foam/88 shadow-sm backdrop-blur-xl'),
        !solid && 'border-b border-transparent bg-transparent',
      )}
    >
      <SiteContainer className="relative z-50 flex items-center justify-between gap-5 px-6 py-2.5 sm:px-8 sm:py-3">
        <BrandMark
          href="#top"
          size="sm"
          tone={onDark ? 'on-dark' : 'on-light'}
          onClick={go('#top')}
        />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={go(link.href)}
              className={cn(
                'group relative py-1.5 text-[12.5px] font-medium transition-colors duration-300',
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

        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-8 items-center justify-center rounded-full border transition-colors duration-300',
              onDark
                ? 'border-line-on-dark text-hero-fg hover:bg-hero-fg/10'
                : 'border-line text-ink hover:bg-ink/5',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <a
            href={headerCta.href}
            onClick={go(headerCta.href)}
            className={cn(
              'group inline-flex items-center gap-2.5 text-[12px] font-medium transition-colors duration-300',
              onDark
                ? 'text-hero-nav hover:text-hero-fg'
                : 'text-ink/70 hover:text-ink',
            )}
          >
            <span className="hidden xl:inline">{headerCta.label}</span>
            <span
              className={cn(
                'grid size-8 place-items-center rounded-full border transition-colors duration-300',
                onDark
                  ? 'border-line-on-dark group-hover:bg-hero-cta group-hover:text-craton'
                  : 'border-line group-hover:bg-ink group-hover:text-foam',
              )}
            >
              <ArrowUpRight size={13} />
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            ref={themeButtonRef}
            type="button"
            onClick={cycleTheme}
            className={cn(
              'inline-flex size-8 items-center justify-center rounded-full border transition-colors duration-300',
              onDark
                ? 'border-line-on-dark text-hero-fg hover:bg-hero-fg/10'
                : 'border-line text-ink hover:bg-ink/5',
            )}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button
            ref={menuButtonRef}
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

      {mounted
        ? createPortal(
            <div
              className={cn(
                'fixed inset-0 z-40 overflow-hidden lg:hidden',
                open ? 'pointer-events-auto' : 'pointer-events-none',
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-ink/45 transition-opacity motion-reduce:transition-none',
                  DRAWER_MS,
                  DRAWER_EASE,
                  open ? 'opacity-100' : 'opacity-0',
                )}
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                id="mobile-nav"
                ref={drawerRef}
                role="dialog"
                aria-modal={open}
                aria-hidden={!open}
                aria-label="Menu"
                inert={!open}
                className={cn(
                  'absolute inset-y-0 right-0 flex h-dvh w-80 max-w-[86vw] flex-col border-l shadow-[-16px_0_40px_color-mix(in_srgb,var(--ink)_18%,transparent)] transition-transform motion-reduce:transition-none',
                  DRAWER_MS,
                  DRAWER_EASE,
                  onDark
                    ? 'border-line-on-dark bg-craton text-hero-fg'
                    : 'border-line bg-foam text-ink',
                  open ? 'translate-x-0' : 'translate-x-full',
                )}
              >
                <div className="flex h-full min-h-0 flex-col px-6 pt-[4.75rem] pb-[max(1.75rem,env(safe-area-inset-bottom))]">
                  <p
                    className={cn(
                      'font-mono text-[10px] font-medium uppercase tracking-[0.22em]',
                      onDark ? 'text-hero-muted' : 'text-ink/40',
                    )}
                  >
                    Menu
                  </p>
                  <nav
                    className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto"
                    aria-label="Primary"
                  >
                    {primaryNav.map((link) => (
                      <a
                        key={link.href + link.label}
                        href={link.href}
                        onClick={go(link.href)}
                        className={cn(
                          'border-b py-3.5 text-base font-medium transition-colors duration-300',
                          onDark
                            ? 'border-line-on-dark text-hero-fg hover:text-copper'
                            : 'border-line text-ink hover:text-lagoon-deep',
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
                  </nav>
                  <a
                    href={headerCta.href}
                    onClick={go(headerCta.href)}
                    className={cn(
                      'mt-6 inline-flex shrink-0 items-center justify-between rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-300',
                      onDark
                        ? 'border-line-on-dark text-hero-fg hover:bg-hero-fg/10'
                        : 'border-line text-ink hover:bg-ink/5',
                    )}
                  >
                    {headerCta.label}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </motion.header>
  )
}
