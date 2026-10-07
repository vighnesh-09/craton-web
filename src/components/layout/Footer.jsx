import { env } from '@/config/env'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-foam px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-ink/50 sm:flex-row sm:items-center">
        <p className="font-display font-semibold text-ink/70">{env.appName}</p>
        <p>© 2026 · Fast, secure UI/UX starter · React · Tailwind · Motion</p>
      </div>
    </footer>
  )
}
