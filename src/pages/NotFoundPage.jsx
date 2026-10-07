import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { pages } from '@/content/pages'

const meta = pages.notFound

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        robots={meta.robots}
        noIndex
      />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-28 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          This page wandered off
        </h1>
        <p className="mt-4 max-w-md text-ink/60">
          The link may be outdated, or the page moved. Let us get you back to
          something useful.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-lagoon px-6 py-3 text-sm font-semibold text-foam transition-all duration-300 hover:bg-lagoon-deep hover:shadow-lg hover:shadow-lagoon/25"
        >
          Return home
        </Link>
      </section>
    </>
  )
}
