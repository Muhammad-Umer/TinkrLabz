'use client'
import { useRef, useState, type FormEvent } from 'react'
import { GlassCard } from '@/components/effects/glass-card'
import { categories, validateContact, type ContactData } from '@/lib/contact'
const fieldClass = 'w-full rounded-xl border border-input bg-background/50 px-4 py-3.5 text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/15'
export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const data = Object.fromEntries(new FormData(event.currentTarget)) as ContactData
    const validation = validateContact(data)
    setErrors(validation); setError('')
    if (Object.keys(validation).length) return
    busy.current = true; setPending(true)
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const result = await response.json()
      if (!response.ok) { setErrors(result.errors || {}); setError(result.error || 'Please review the highlighted fields.'); return }
      setSent(true)
    } catch { setError('Unable to send. Please try again or email hello@tinkrlabz.com.') }
    finally { busy.current = false; setPending(false) }
  }
  if (sent) return <GlassCard role="status" className="p-10"><h3 className="text-2xl font-bold">Thanks — we received your message and will get back to you shortly.</h3><button type="button" className="mt-6 text-primary underline" onClick={() => setSent(false)}>Send another message</button></GlassCard>
  return <GlassCard className="p-8 md:p-10"><form noValidate onSubmit={submit} className="flex flex-col gap-5">
    <p className="text-sm text-muted-foreground">Fields marked * are required.</p>
    {(['name', 'email', 'company', 'category', 'message'] as const).map(key => <div key={key} className="flex flex-col gap-2">
      <label htmlFor={`contact-${key}`} className="text-sm font-semibold">{{ name: 'Name *', email: 'Work email *', company: 'Company (optional)', category: 'What are you looking for? *', message: 'Tell us about your project *' }[key]}</label>
      {key === 'category' ? <select id={`contact-${key}`} name={key} required className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} defaultValue=""><option value="" disabled>Select a service</option>{categories.map(value => <option key={value}>{value}</option>)}</select> : key === 'message' ? <textarea id={`contact-${key}`} name={key} required rows={6} maxLength={5000} className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} /> : <input id={`contact-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={{name:'name',email:'email',company:'organization'}[key]} required={key !== 'company'} maxLength={{name:120,email:254,company:200}[key]} className={fieldClass} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />}
      {errors[key] && <p id={`${key}-error`} className="text-sm text-red-500">{errors[key]}</p>}
    </div>)}
    <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className="text-sm text-muted-foreground">Your details are used to respond to your inquiry. <a href="/privacy" className="underline">Privacy Policy</a></p>
    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
    <button disabled={pending} className="rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground disabled:opacity-60">{pending ? 'Sending…' : 'Discuss My Project'}</button>
  </form></GlassCard>
}
