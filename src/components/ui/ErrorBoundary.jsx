import { Component } from 'react'
import { site } from '@/config/site'

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
        <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
          <p className="mono-label text-accent">{site.name}</p>
          <h1 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            Something went off track
          </h1>
          <p className="mt-3 max-w-md text-cream/60">
            Refresh the page or head home. If it keeps happening, email{' '}
            {site.email}.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-8 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink"
          >
            Back to home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
