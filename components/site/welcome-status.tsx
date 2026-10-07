'use client'

import { useEffect, useState } from 'react'

export function WelcomeStatus() {
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) { setConnected(true); return }
    const timer = window.setTimeout(() => setConnected(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="liquid-glass mb-8 inline-flex max-w-full items-center gap-3 rounded-2xl px-4 py-3 sm:rounded-full">
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full bg-primary ${connected ? '' : 'motion-safe:animate-pulse'}`} />
      <div role="status" aria-live="polite" className="min-w-0">
        <p className="font-heading text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{connected ? 'Connection established' : 'Establishing connection'}</p>
        <p className="mt-1 text-xs text-foreground"><span className="mr-2 font-semibold text-primary">TinkrBot</span>{connected ? 'Welcome to TinkrLabz.' : 'A moment of possibility.'}</p>
      </div>
    </div>
  )
}
