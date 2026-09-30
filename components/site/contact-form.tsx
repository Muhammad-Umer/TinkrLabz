'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { GlassCard } from '@/components/effects/glass-card'

const fieldClass =
  'w-full rounded-xl border border-input bg-background/50 px-4 py-3.5 text-foreground outline-none transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15'

const labelClass = 'text-sm font-semibold text-navy'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <GlassCard role="status" className="flex flex-col items-start justify-center gap-4 p-10">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <h3 className="text-2xl font-bold text-navy">Thanks for reaching out!</h3>
        <p className="text-muted-foreground">
          {"We've received your message and will be in touch shortly."}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
        >
          Send another message
        </button>
      </GlassCard>
    )
  }

  return (
    <GlassCard
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="flex flex-col gap-5 p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Jane Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>
      <button
        type="submit"
        className="btn-shine group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
      >
        Send Message
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </button>
    </GlassCard>
  )
}
