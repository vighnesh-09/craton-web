import { useState } from 'react'
import { ArrowUpRight, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import { env } from '@/config/env'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export default function Contact() {
  const [door, setDoor] = useState('Start a pilot')
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const booking = env.bookingUrl || site.bookingUrl
  const endpoint = env.formEndpoint || site.formEndpoint

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

    // Fallback until Formspree/webhook is configured
    const subject = encodeURIComponent(`${topic} — ${company || name}`)
    const body = encodeURIComponent(
      `${name}\n${email}\n${company}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <Section id="contact" tone="dark">
      <p className="mono-label mb-5 flex items-center gap-3 text-muted">
        A question worth exploring?
        <span className="text-accent">+</span>
      </p>
      <Reveal
        as="h2"
        className="max-w-[16ch] text-[clamp(2.3rem,4.5vw,4.6rem)] font-normal leading-[1.05] tracking-[-0.045em]"
      >
        The future doesn’t build itself.{' '}
        <span className="serif text-accent">Let’s move it forward.</span>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.05fr]">

          <Reveal delay={0.05}>
            <p className="mb-6 max-w-md text-[15px] leading-relaxed text-cream/65">
              Tell us who you are and we’ll route you to the right conversation.
            </p>

            <div className="mb-4">
              <p className="mono-label mb-3 text-accent">For customers & partners</p>
              <div className="grid gap-3 sm:grid-cols-2">
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
              <p className="mono-label mb-3 text-muted">Talent (separate path)</p>
              <div className="grid gap-3 sm:grid-cols-2">
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
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-accent hover:text-cream"
              >
                <Calendar size={15} />
                Prefer a calendar? Book a pilot call
                <ArrowUpRight size={14} />
              </a>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-7"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
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

              <Field label="One line on what you’re working on" className="mt-4">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="e.g. Class IIb device, MDR technical file due Q2"
                  className="field-input resize-y"
                />
              </Field>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                <p className="mt-4 text-[13px] text-success" role="status">
                  Thanks — your message is ready. We’ll reply within two business
                  days.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="mt-4 text-[13px] text-danger" role="status">
                  Something went wrong. Email us directly at {site.email}.
                </p>
              ) : null}
            </form>
          </Reveal>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          min-height: 48px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.03);
          color: var(--cream);
          padding: 0.75rem 0.9rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .field-input:focus {
          border-color: color-mix(in oklab, var(--accent) 55%, transparent);
          background: rgba(255,255,255,0.05);
        }
        .field-input::placeholder { color: var(--muted); }
        select.field-input option { background: var(--ink-2); color: var(--cream); }

      `}</style>
    </Section>
  )
}

function Door({ active, title, body, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-2xl border p-4 text-left transition duration-300',
        active
          ? 'border-accent/50 bg-accent/10'
          : 'border-line bg-transparent hover:border-line hover:bg-white/[0.03]',
      )}
    >
      <b className="block text-[14.5px] font-medium text-cream">{title}</b>
      <span className="mt-1.5 block text-[12.5px] leading-relaxed text-muted">
        {body}
      </span>
    </button>
  )
}

function Field({ label, error, className, children }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block text-[12.5px] text-cream/70">{label}</span>
      <div className={cn(error && '[&_.field-input]:border-danger')}>
        {children}
      </div>
    </label>
  )
}
