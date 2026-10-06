'use client'

import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/effects/glass-card'
import { categories, validateContact, contactProgress, type ContactData } from '@/lib/contact'
import { emptyContact, missions } from '@/lib/tinkrbot'
import { TinkrBot } from './tinkrbot'

const fieldClass = 'w-full rounded-xl border border-input bg-background/50 px-4 py-3.5 text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/15'
const fields = ['name', 'email', 'company', 'category', 'message'] as const
const labels = { name: 'Name *', email: 'Work email *', company: 'Company (optional)', category: 'What are you looking for? *', message: 'Tell us more *' }

export function ContactForm() {
  const [data, setData] = useState<ContactData>({ ...emptyContact })
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [guided, setGuided] = useState(true)
  const [missionId, setMissionId] = useState('')
  const mission = missions.find(item => item.id === missionId)
  const completed = contactProgress(data)

  function update(field: keyof ContactData, value: string) {
    setData(current => ({ ...current, [field]: value }))
    setErrors(current => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const validation = validateContact(data)
    setErrors(validation)
    setError('')
    if (Object.keys(validation).length) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus()
      return
    }
    busy.current = true
    setPending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        setErrors(result.errors || {})
        setError(result.error || 'Please review the highlighted fields and try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Unable to send. Please try again or email hello@tinkrlabz.com.')
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  if (sent) {
    return (
      <GlassCard role="status" className="p-8 md:p-10">
        <TinkrBot celebrating className="mb-4 size-28" />
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <Check className="size-4" aria-hidden="true" /> Inquiry launched
        </p>
        <h3 className="text-2xl font-bold text-navy">Thanks. We received your message.</h3>
        <p className="mt-4 text-muted-foreground">TinkrBot has helped you get started. We will get back to you shortly.</p>
        <button type="button" className="mt-6 text-primary underline" onClick={() => {
          setSent(false)
          setData({ ...emptyContact })
          setMissionId('')
          setErrors({})
          setError('')
        }}>Start another inquiry</button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6 sm:p-8 md:p-10">
      <form noValidate onSubmit={submit} className="flex flex-col gap-6">
        <fieldset disabled={pending} className="min-w-0 space-y-6">
          <legend className="sr-only">Contact TinkrLabz</legend>
          {guided ? (
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
              <div className="flex items-center gap-3">
                <TinkrBot className="size-20 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Meet TinkrBot</p>
                  <h3 className="mt-1 text-lg font-bold text-navy">Pick your next mission.</h3>
                  <p className="mt-1 text-sm text-muted-foreground">A playful guide to help you start your inquiry.</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3" role="group" aria-label="Choose a TinkrBot mission">
                {missions.map(item => (
                  <button key={item.id} type="button" aria-pressed={missionId === item.id}
                    onClick={() => { setMissionId(item.id); update('category', item.category) }}
                    className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${missionId === item.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/60 text-foreground hover:border-primary/50'}`}>
                    {item.title}
                  </button>
                ))}
              </div>
              <p role="status" className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {mission ? mission.hint : 'Choose a mission for a starting point, or go straight to the form below.'}
              </p>
              {mission && !data.message.trim() && (
                <button type="button" onClick={() => update('message', mission.prompt)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  <Sparkles className="size-4" aria-hidden="true" /> Use this starting point
                </button>
              )}
              <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span id="inquiry-progress">{completed} of 4 essentials ready</span>
                <button type="button" className="underline" onClick={() => setGuided(false)}>Skip TinkrBot</button>
              </div>
              <div role="progressbar" aria-labelledby="inquiry-progress" aria-valuemin={0} aria-valuemax={4} aria-valuenow={completed} className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary/10">
                <div className="h-full rounded-full bg-primary motion-safe:transition-[width]" style={{ width: `${completed * 25}%` }} />
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setGuided(true)} className="text-left text-sm font-semibold text-primary underline">Get a starting point with TinkrBot</button>
          )}
          <p className="text-sm text-muted-foreground">Fields marked * are required. Your mission and topic can be changed at any time.</p>
          {fields.map(key => (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={`contact-${key}`} className="text-sm font-semibold">{labels[key]}</label>
              {key === 'category' ? (
                <select id={`contact-${key}`} name={key} value={data[key]} onChange={e => update(key, e.target.value)} required className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined}>
                  <option value="" disabled>Select a topic</option>
                  {categories.map(value => <option key={value}>{value}</option>)}
                </select>
              ) : key === 'message' ? (
                <textarea id={`contact-${key}`} name={key} value={data[key]} onChange={e => update(key, e.target.value)} required rows={6} maxLength={5000} placeholder={mission?.prompt || 'What would you like to build, improve, or explore?'} className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />
              ) : (
                <input id={`contact-${key}`} name={key} value={data[key]} onChange={e => update(key, e.target.value)} type={key === 'email' ? 'email' : 'text'} autoComplete={{ name: 'name', email: 'email', company: 'organization' }[key]} required={key !== 'company'} maxLength={{ name: 120, email: 254, company: 200 }[key]} className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />
              )}
              {errors[key] && <p id={`${key}-error`} className="text-sm text-red-500">{errors[key]}</p>}
            </div>
          ))}
          <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" value={data.website} onChange={e => update('website', e.target.value)} tabIndex={-1} autoComplete="off" /></div>
        </fieldset>
        <p className="text-sm text-muted-foreground">Your details are used to respond to your inquiry. <a href="/privacy" className="underline">Privacy Policy</a></p>
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        <button disabled={pending} className="btn-shine inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground disabled:opacity-60">
          {pending ? 'Sending…' : 'Send My Inquiry'} <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </form>
    </GlassCard>
  )
}
