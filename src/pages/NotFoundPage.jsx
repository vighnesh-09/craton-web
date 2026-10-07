import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'

export default function NotFoundPage() {
  return (
    <section className="pad-x flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <Seo title="Page not found · Craton Technologies" />
      <p className="mono-label text-accent">404</p>
      <h1 className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)] font-normal tracking-tight">
        This page wandered off
      </h1>
      <p className="mt-4 max-w-md text-cream/60">
        The link may be outdated, or the page moved. Head back to the Craton
        home experience.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-paper px-6 text-[13px] font-medium text-ink transition hover:-translate-y-0.5"
      >
        Return home
      </Link>
    </section>
  )
}
