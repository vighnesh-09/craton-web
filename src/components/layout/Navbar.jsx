import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { env } from '@/config/env'
import { primaryNav } from '@/content/navigation'
import { cn } from '@/lib/cn'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-[#f8f6ee] transition-colors duration-300 hover:text-copper"
        >
          {env.appName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#d2d3ca]/70 transition-colors duration-300 hover:text-[#f8f6ee]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="rounded-full bg-[#f0eee7] px-5 py-2.5 text-sm font-semibold text-craton transition-all duration-300 hover:bg-white"
          >
            Start a project
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-[#f8f6ee] transition-colors duration-300 hover:bg-white/10 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t border-white/10 bg-craton/95 backdrop-blur-md transition-all duration-300 md:hidden',
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {primaryNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-[#d2d3ca]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#f0eee7] px-5 py-3 text-center text-sm font-semibold text-craton"
          >
            Start a project
          </a>
        </div>
      </div>
    </motion.header>
  )
}
