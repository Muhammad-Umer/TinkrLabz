'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { categories, validateContact, contactProgress, type ContactData } from '@/lib/contact'

const fieldClass =
  'w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/15'
const fields = ['name', 'email', 'company', 'category', 'message'] as const
const labels = {
  name: 'Name *',
  email: 'Work email *',
  company: 'Company (optional)',
  category: 'Topic *',
  message: 'What would you like to do? *',
}

export function ContactForm() {
  const empty: ContactData = {
    name: '',
    email: '',
    company: '',
    category: '',
    message: '',
    website: '',
  }
  const [data, setData] = useState<ContactData>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get('topic')
    if (topic && (categories as readonly string[]).includes(topic)) {
      setData((current) => ({ ...current, category: topic }))
    }
  }, [])

  function update(field: keyof ContactData, value: string) {
    setData((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  async function send() {
    if (busy.current || sent) {
      return
    }
    const validation = validateContact(data)
    setErrors(validation)
    setError('')
    if (Object.keys(validation).length) {
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
        setError(result.error || 'Please check your details and try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Unable to send. Your details are saved. Please try again shortly.')
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  function reset() {
    if (busy.current) {
      return
    }
    setData(empty)
    setErrors({})
    setError('')
    setSent(false)
  }

  const success = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sent && success.current?.getClientRects().length) {
      success.current.focus()
    }
  }, [sent])

  const prefix = useId()
  const completed = contactProgress(data)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateContact(data)
    if (Object.keys(validation).length) {
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)
        ?.focus()
    }
    await send()
  }

  if (sent) {
    return (
      <div ref={success} tabIndex={-1} role="status" className="py-4 outline-none">
        <p className="mt-3 inline-flex items-center gap-2 font-semibold text-primary">
          <Check className="size-4" aria-hidden="true" /> Inquiry sent
        </p>
        <h3 className="mt-3 text-xl font-bold">You are all set.</h3>
        <p className="mt-2 text-muted-foreground">We will be in touch.</p>
        <button type="button" onClick={reset} className="mt-5 text-primary underline">
          Start another inquiry
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>* Required</span>
        <span>{completed} of 4 ready</span>
      </div>
      <div
        role="progressbar"
        aria-label="Inquiry progress"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={completed}
        className="h-1 overflow-hidden rounded-full bg-primary/10"
      >
        <div
          className="h-full bg-primary motion-safe:transition-[width]"
          style={{ width: `${completed * 25}%` }}
        />
      </div>
      <fieldset disabled={pending} className="min-w-0 grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Contact details</legend>
        {fields.map((key) => {
          const id = `${prefix}-${key}`
          const describedBy = errors[key] ? `${id}-error` : undefined
          return (
            <div
              key={key}
              className={`flex min-w-0 flex-col gap-1.5 ${key === 'category' || key === 'message' || key === 'company' ? 'sm:col-span-2' : ''}`}
            >
              <label htmlFor={id} className="text-sm font-semibold">
                {labels[key]}
              </label>
              {key === 'category' ? (
                <select
                  id={id}
                  name={key}
                  value={data[key]}
                  onChange={(e) => update(key, e.target.value)}
                  required
                  className={fieldClass}
                  aria-invalid={!!errors[key]}
                  aria-describedby={describedBy}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {categories.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              ) : key === 'message' ? (
                <textarea
                  id={id}
                  name={key}
                  value={data[key]}
                  onChange={(e) => update(key, e.target.value)}
                  required
                  rows={3}
                  maxLength={5000}
                  placeholder="The problem and your ideal outcome"
                  className={fieldClass}
                  aria-invalid={!!errors[key]}
                  aria-describedby={describedBy}
                />
              ) : (
                <input
                  id={id}
                  name={key}
                  value={data[key]}
                  onChange={(e) => update(key, e.target.value)}
                  type={key === 'email' ? 'email' : 'text'}
                  autoComplete={{ name: 'name', email: 'email', company: 'organization' }[key]}
                  required={key !== 'company'}
                  maxLength={{ name: 120, email: 254, company: 200 }[key]}
                  className={fieldClass}
                  aria-invalid={!!errors[key]}
                  aria-describedby={describedBy}
                />
              )}
              {errors[key] && (
                <p id={`${id}-error`} className="text-sm text-red-500">
                  {errors[key]}
                </p>
              )}
            </div>
          )
        })}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${prefix}-website`}>Website</label>
          <input
            id={`${prefix}-website`}
            name="website"
            value={data.website}
            onChange={(e) => update('website', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </fieldset>
      <p className="text-xs text-muted-foreground">
        Used only to respond.{' '}
        <a href="/privacy" className="underline">
          Privacy
        </a>
      </p>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <button
        disabled={pending}
        className="btn-shine inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send inquiry'}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}
