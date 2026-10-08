import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { env } from '@/config/env'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const TOPICS = [
  ...site.doors.map((d) => d.title),
  'Something else',
]

/** Calm contact band — no sticky pin; tighter rhythm than a hero-scale block. */
export default function Contact() {
  const [door, setDoor] = useState('Start a pilot')
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const booking = env.bookingUrl || site.bookingUrl
  const endpoint = env.formEndpoint || site.formEndpoint
  const reduced = useReducedMotion()

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const company = String(form.get('company') || '').trim()
    const message = String(form.get('message') || '').trim()
    const topic = String(form.get('topic') || door)

    const nextErrors = {}
    if (name.length < 2) nextErrors.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = true
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('sending')

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, company, topic, message }),
        })
        if (!res.ok) throw new Error('Form failed')
        setStatus('sent')
        e.currentTarget.reset()
        return
      } catch {
        setStatus('error')
        return
      }
    }

    const subject = encodeURIComponent(`${topic} — ${company || name}`)
    const body = encodeURIComponent(
      `${name}\n${email}\n${company}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section
      id="contact"
      className="pad-x relative py-[clamp(2.5rem,4vw,4rem)] text-cream"
      aria-label="Contact"
    >
      <div className="shell">
        <p className="mono-label mb-3 flex items-center gap-3 text-muted">
          A question worth exploring?
          <span className="text-accent">+</span>
        </p>
        <Reveal
          as="h2"
          className="max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.045em]"
        >
          The future doesn’t build itself.{' '}
          <span className="serif text-accent">Let’s move it forward.</span>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:items-start">
          <Reveal delay={reduced ? 0 : 0.04}>
            <p className="mb-5 max-w-md text-[14.5px] leading-relaxed text-muted">
              Tell us who you are and we’ll route you to the right conversation.
            </p>

            <div className="mb-4">
              <p className="mono-label mb-2.5 text-accent">
                For customers & partners
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {site.doors
                  .filter((d) => d.audience === 'customer')
                  .map((d) => (
                    <Door
                      key={d.id}
                      active={door === d.title}
                      title={d.title}
                      body={d.body}
                      onClick={() => setDoor(d.title)}
                    />
                  ))}
              </div>
            </div>

            <div>
              <p className="mono-label mb-2.5 text-muted">
                Talent (separate path)
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {site.doors
                  .filter((d) => d.audience === 'talent')
                  .map((d) => (
                    <Door
                      key={d.id}
                      active={door === d.title}
                      title={d.title}
                      body={d.body}
                      onClick={() => setDoor(d.title)}
                    />
                  ))}
              </div>
            </div>

            {booking ? (
              <a
                href={booking}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-accent hover:text-cream"
              >
                <Calendar size={15} />
                Prefer a calendar? Book a pilot call
                <ArrowUpRight size={14} />
              </a>
            ) : null}
          </Reveal>

          <Reveal delay={reduced ? 0 : 0.08}>
            <form onSubmit={onSubmit} className="pt-1" noValidate>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    className="field-input"
                  />
                </Field>
                <Field label="Work email" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="field-input"
                  />
                </Field>
                <Field label="Company">
                  <input
                    name="company"
                    autoComplete="organization"
                    className="field-input"
                  />
                </Field>
                <Field label="Conversation">
                  <TopicSelect value={door} onChange={setDoor} />
                </Field>
              </div>

              <Field label="One line on what you’re working on" className="mt-3.5">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g. Class IIb device, MDR technical file due Q2"
                  className="field-input resize-y"
                />
              </Field>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  as="button"
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-press"
                >
                  {status === 'sending' ? 'Sending…' : 'Start a conversation'}
                  <ArrowUpRight size={14} />
                </Button>
                <small className="text-[12px] text-muted">
                  {endpoint
                    ? 'We reply within two business days.'
                    : `Configure VITE_FORM_ENDPOINT for direct submit · currently falls back to ${site.email}`}
                </small>
              </div>

              {status === 'sent' ? (
                <p className="mt-3 text-[13px] text-success" role="status">
                  Thanks — your message is ready. We’ll reply within two business
                  days.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="mt-3 text-[13px] text-danger" role="status">
                  Something went wrong. Email us directly at {site.email}.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          min-height: 46px;
          border-radius: 10px;
          border: 1px solid rgba(30, 42, 58, 0.22);
          background: var(--paper);
          color: var(--cream);
          padding: 0.7rem 0.85rem;
          font-size: 0.9375rem;
          outline: none;
        }
        textarea.field-input { min-height: 6.5rem; }
        .field-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent);
        }
        .field-input::placeholder { color: var(--muted); }
        .depth-key {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          text-align: left;
          cursor: pointer;
        }
        .depth-key:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .depth-menu {
          position: absolute;
          z-index: 30;
          left: 0;
          right: 0;
          top: calc(100% + 6px);
          margin: 0;
          padding: 0.3rem;
          list-style: none;
          border-radius: 12px;
          background: var(--paper);
          border: 1px solid rgba(30, 42, 58, 0.12);
          transform: translateY(-2px);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9),
            0 6px 0 rgba(30, 42, 58, 0.04),
            0 14px 28px -12px rgba(30, 42, 58, 0.28);
          max-height: min(16rem, 50vh);
          overflow: auto;
        }
        .depth-option {
          display: block;
          width: 100%;
          text-align: left;
          border-radius: 8px;
          padding: 0.6rem 0.7rem;
          font-size: 0.9rem;
          color: var(--cream);
          background: transparent;
          border: 0;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .depth-option:hover,
        .depth-option[data-active='true'] {
          background: var(--ink);
        }
        .depth-option[aria-selected='true'] {
          border-left-color: var(--accent);
        }
        .contact-press:active:not(:disabled) {
          transform: translateY(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .depth-menu { transform: none; }
          .contact-press:active:not(:disabled) { transform: none; }
        }
      `}</style>
    </section>
  )
}

function TopicSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(() => Math.max(0, TOPICS.indexOf(value)))
  const rootRef = useRef(null)
  const listId = useId()

  useEffect(() => {
    const index = TOPICS.indexOf(value)
    if (index >= 0) setHi(index)
  }, [value])

  useEffect(() => {
    if (!open) return undefined
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  function choose(next) {
    onChange(next)
    setOpen(false)
  }

  function onKeyDown(event) {
    const max = TOPICS.length - 1
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setHi((index) => Math.min(max, index + (open ? 1 : 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setHi((index) => Math.max(0, index - (open ? 1 : 0)))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setOpen(true)
      setHi(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setOpen(true)
      setHi(max)
    } else if (event.key === 'Escape') {
      setOpen(false)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!open) setOpen(true)
      else choose(TOPICS[hi])
    }
  }

  return (
    <div className="relative" ref={rootRef}>
      <input type="hidden" name="topic" value={value} />
      <button
        type="button"
        className="field-input depth-key"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-opt-${hi}` : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={16} aria-hidden className="shrink-0 text-accent" />
      </button>
      {open ? (
        <ul id={listId} role="listbox" tabIndex={-1} className="depth-menu">
          {TOPICS.map((topic, index) => (
            <li key={topic} role="presentation">
              <button
                type="button"
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={value === topic}
                data-active={hi === index}
                className="depth-option"
                onMouseEnter={() => setHi(index)}
                onClick={() => choose(topic)}
              >
                {topic}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Door({ active, title, body, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-xl border p-3.5 text-left transition duration-300',
        active
          ? 'border-accent/55 bg-accent/12'
          : 'border-line bg-paper/40 hover:border-accent/30 hover:bg-paper/70',
      )}
    >
      <b className="block text-[14px] font-medium text-cream">{title}</b>
      <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">
        {body}
      </span>
    </button>
  )
}

function Field({ label, error, className, children }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-[12px] text-muted-ink">{label}</span>
      <div className={cn(error && '[&_.field-input]:border-danger')}>
        {children}
      </div>
    </label>
  )
}
