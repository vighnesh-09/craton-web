import { Component } from 'react'
import { env } from '@/config/env'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  handleReload = () => {
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-foam px-6 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-lagoon">
            {env.appName}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
            Something went off track
          </h1>
          <p className="mt-3 max-w-md text-ink/60">
            Refresh the page or head home. If it keeps happening, reach out and
            we will sort it quickly.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-foam transition-colors duration-300 hover:bg-lagoon"
          >
            Back to home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
