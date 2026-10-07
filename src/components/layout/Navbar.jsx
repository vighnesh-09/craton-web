'use client'

import { motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { env } from '@/config/env'
import { primaryNav } from '@/content/navigation'
import { cn } from '@/lib/cn'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cycleTheme, isLight } = useTheme()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-hero-fg transition-colors duration-300 hover:text-copper"
        >
          {env.appName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-hero-nav/70 transition-colors duration-300 hover:text-hero-fg"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={cycleTheme}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-hero-fg transition-colors duration-300 hover:bg-hero-fg/10"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark' : 'Light'}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a
            href="/#contact"
            className="rounded-full bg-hero-cta px-5 py-2.5 text-sm font-semibold text-craton transition-all duration-300 hover:brightness-110"
          >
            Start a project
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={cycleTheme}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-on-dark text-hero-fg transition-colors duration-300 hover:bg-hero-fg/10"
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
            className="rounded-full p-2 text-hero-fg transition-colors duration-300 hover:bg-hero-fg/10"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t border-line-on-dark bg-craton/95 backdrop-blur-md transition-all duration-300 md:hidden',
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {primaryNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-hero-nav"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-hero-cta px-5 py-3 text-center text-sm font-semibold text-craton"
          >
            Start a project
          </a>
        </div>
      </div>
    </motion.header>
  )
}
