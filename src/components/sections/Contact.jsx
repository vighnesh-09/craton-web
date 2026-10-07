import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { env } from '@/config/env'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

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
            <form
              onSubmit={onSubmit}
              className="rounded-[1.5rem] border border-line bg-[var(--glass-bg)] p-5 shadow-[var(--glass-shadow)] backdrop-blur-xl sm:p-6"
              noValidate
            >
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
                  <select
                    name="topic"
                    value={door}
                    onChange={(e) => setDoor(e.target.value)}
                    className="field-input"
                  >
                    {site.doors.map((d) => (
                      <option key={d.id} value={d.title}>
                        {d.title}
                      </option>
                    ))}
                    <option value="Something else">Something else</option>
                  </select>
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
                <Button as="button" type="submit" disabled={status === 'sending'}>
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
          min-height: 44px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: color-mix(in oklab, var(--paper) 70%, transparent);
          color: var(--cream);
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .field-input:focus {
          border-color: color-mix(in oklab, var(--accent) 55%, transparent);
          background: var(--paper);
        }
        .field-input::placeholder { color: var(--muted); }
        select.field-input option { background: var(--paper); color: var(--cream); }
        html[data-mode='dark'] .field-input {
          background: rgba(255,255,255,0.03);
        }
        html[data-mode='dark'] .field-input:focus {
          background: rgba(255,255,255,0.05);
        }
        html[data-mode='dark'] select.field-input option {
          background: var(--ink-2);
        }
      `}</style>
    </section>
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
          ? 'border-accent/50 bg-accent/10'
          : 'border-line bg-transparent hover:border-line hover:bg-white/[0.03]',
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
