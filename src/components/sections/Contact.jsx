import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { env } from '@/config/env'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const TOPICS = [...site.doors.map((d) => d.title), 'Something else']

const CUSTOMERS = site.doors.filter((d) => d.audience === 'customer')
const TALENT = site.doors.filter((d) => d.audience === 'talent')

/** One contact panel — content height, no scroll pin. */
export default function Contact() {
  const [door, setDoor] = useState('Start a pilot')
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const booking = env.bookingUrl || site.bookingUrl
  const endpoint = env.formEndpoint || site.formEndpoint
  const audience = site.doors.find((d) => d.title === door)?.audience

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const company = String(form.get('company') || '').trim()
    const message = String(form.get('message') || '').trim()
    const topic = String(form.get('topic') || door)

    const nextErrors = {}
    if (name.length < 2) nextErrors.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid work email.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('idle')
      return
    }

    if (endpoint) {
      setStatus('sending')
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
    const body = encodeURIComponent(`${name}\n${email}\n${company}\n\n${message}`)
    setStatus('mail')
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      className="contact-field section-pad scroll-mt-24"
      aria-label="Contact"
    >
      <div className="shell shell-fit">
        <div className="relative overflow-visible bg-[#1E2A3A] text-[#f4f7fa]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00A8C4] to-transparent"
          />

          <div className="px-4 py-6 sm:px-7 sm:py-8 min-[1100px]:px-9 min-[1100px]:py-9">
            <p className="flex items-center gap-3 font-mono text-[12px] font-medium tracking-[0.16em] text-[#9af3ff] uppercase">
              06 · Request a pilot
            </p>
            <h2 className="type-h2 mt-3 text-[#f4f7fa]">
              Request a pilot.
            </h2>
            <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.55] text-[#d5dee8]">
              Tell us who you are and we’ll route you to the right conversation.
            </p>

            <div className="relative mt-7 grid gap-7 min-[1100px]:mt-8 min-[1100px]:grid-cols-2 min-[1100px]:items-start min-[1100px]:gap-0">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#00A8C4]/40 min-[1100px]:block"
              />

              <div className="flex min-w-0 flex-col min-[1100px]:pr-8">
                <PathGroup
                  label="For customers & partners"
                  tone="buyer"
                  doors={CUSTOMERS}
                  door={door}
                  onSelect={setDoor}
                />
                <PathGroup
                  label="Talent (separate path)"
                  tone="talent"
                  doors={TALENT}
                  door={door}
                  onSelect={setDoor}
                />
                {booking ? (
                  <a
                    href={booking}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#e7f8fb] hover:text-white"
                  >
                    <Calendar size={15} className="text-accent" />
                    Prefer a calendar? Book a pilot call
                    <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>

              <div className="min-w-0 border-t border-[#00A8C4]/35 pt-7 min-[1100px]:border-t-0 min-[1100px]:pl-8 min-[1100px]:pt-0">
                <form
                  onSubmit={onSubmit}
                  className="contact-sheet glass-panel rounded-[1.25rem] p-4 sm:p-5"
                  noValidate
                  data-contact-status={status}
                >
                  <div className="mb-4 border-b border-[var(--field-line)] pb-3">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-deep">
                      {audience === 'talent'
                        ? 'Talent · separate path'
                        : audience === 'customer'
                          ? 'Customers & partners'
                          : 'Conversation'}
                    </p>
                    <p className="mt-1 text-[15px] font-medium leading-snug">{door}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <input
                        name="name"
                        autoComplete="name"
                        required
                        aria-invalid={errors.name ? 'true' : 'false'}
                        className="field-input"
                      />
                    </Field>
                    <Field label="Work email" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={errors.email ? 'true' : 'false'}
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

                  <Field
                    label="One line on what you’re working on"
                    className="mt-3.5"
                  >
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="e.g. Class IIb device, MDR technical file due Q2"
                      className="field-input resize-y"
                    />
                  </Field>

                  <div className="mt-5">
                    <Button
                      as="button"
                      type="submit"
                      disabled={status === 'sending'}
                      className="!h-auto w-full max-w-full !whitespace-normal !bg-[image:none] !bg-[#00A8C4] !px-5 !text-[13px] !font-semibold !text-[#1E2A3A] !shadow-none hover:!bg-[#007A96] hover:!text-white disabled:!cursor-wait disabled:!opacity-70 sm:w-auto"
                    >
                      {status === 'sending' ? 'Sending…' : 'Start a conversation'}
                      <ArrowUpRight size={14} className="shrink-0" />
                    </Button>
                    {endpoint ? (
                      <p className="mt-3 text-[13px] leading-snug text-muted-ink">
                        We reply within two business days.
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-3" aria-live="polite">
                    {status === 'sent' ? (
                      <p className="text-[13px] leading-snug text-[color:var(--ok)]" role="status">
                        Thanks — we have your note. We’ll reply within two business days.
                      </p>
                    ) : null}
                    {status === 'mail' ? (
                      <p className="text-[13px] leading-snug text-cream" role="status">
                        Your email app should open with a draft to {site.email}. We
                        have not received it until you send that email.
                      </p>
                    ) : null}
                    {status === 'error' ? (
                      <p className="text-[13px] leading-snug text-[color:var(--alert)]" role="status">
                        Something went wrong. Email us directly at {site.email}.
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          min-width: 0;
          min-height: 48px;
          border-radius: 10px;
          border: 1px solid var(--field-border);
          background: var(--field-bg);
          color: var(--field-text);
          padding: 0.7rem 0.85rem;
          font-size: 0.9375rem;
          outline: none;
        }
        textarea.field-input { min-height: 6.5rem; }
        .field-input:focus-visible {
          outline: 2px solid #075e73;
          outline-offset: 2px;
          border-color: #075e73;
        }
        .field-input::placeholder { color: var(--field-placeholder); }
        .depth-key {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          text-align: left;
          cursor: pointer;
        }
        .depth-key:focus-visible {
          outline: 2px solid #00A8C4;
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
          background: var(--field-menu);
          color: var(--field-text);
          border: 1px solid var(--field-line);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9),
            0 14px 28px -12px rgba(30, 42, 58, 0.28);
          max-height: min(16rem, 50vh);
          overflow: auto;
        }
        .depth-option {
          display: block;
          width: 100%;
          text-align: left;
          border-radius: 8px;
          min-height: 48px;
          padding: 0.75rem 0.7rem;
          font-size: 0.9rem;
          color: var(--field-text);
          background: transparent;
          border: 0;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .depth-option:hover,
        .depth-option[data-active='true'] {
          background: var(--field-hover);
        }
        .depth-option[aria-selected='true'] {
          border-left-color: #00A8C4;
        }
        @media (prefers-reduced-motion: reduce) {
          .depth-menu { transform: none; }
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
        <ChevronDown size={16} aria-hidden className="shrink-0 text-accent-deep" />
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

function PathGroup({ label, tone, doors, door, onSelect }) {
  const labelId = useId()
  return (
    <div role="group" aria-labelledby={labelId}>
      <p
        id={labelId}
        className={cn(
          'font-mono text-[11px] font-medium uppercase tracking-[0.14em]',
          tone === 'buyer' ? 'text-accent' : 'mt-6 text-[#d5dee8]',
        )}
      >
        {label}
      </p>
      <ul className="mt-1">
        {doors.map((d) => (
          <li key={d.id} className="border-b border-white/15">
            <Door
              active={door === d.title}
              title={d.title}
              body={d.body}
              onClick={() => onSelect(d.title)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Door({ active, title, body, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="w-full py-3.5 text-left"
    >
      <span className="flex items-start justify-between gap-3">
        <b
          className={cn(
            'block text-[14px] font-medium leading-snug',
            active ? 'text-accent' : 'text-white',
          )}
        >
          {title}
        </b>
        {active ? (
          <span className="shrink-0 pt-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            Selected
          </span>
        ) : null}
      </span>
      <span className="mt-1 block text-[13px] leading-relaxed text-[#d5dee8]">{body}</span>
    </button>
  )
}

function Field({ label, error, className, children }) {
  return (
    <label className={cn('block min-w-0', className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-muted-ink">{label}</span>
      <div className={cn(error && '[&_.field-input]:border-[color:var(--alert)]')}>{children}</div>
      {error ? (
        <span className="mt-1.5 block text-[13px] leading-snug text-[color:var(--alert)]">{error}</span>
      ) : null}
    </label>
  )
}
