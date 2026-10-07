'use client'

import { useEffect, useState } from 'react'

export function WelcomeStatus() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) {
      setConnected(true)
      return
    }
    const timer = window.setTimeout(() => setConnected(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 inline-flex max-w-full items-center gap-2 rounded-lg border border-foreground/15 bg-background/75 px-3 py-2.5 text-[10px] shadow-sm backdrop-blur-sm sm:px-4 sm:text-xs"
    >
      <span aria-hidden="true" className="font-semibold text-primary">
        tinkrbot ~ $
      </span>
      <span className="whitespace-nowrap text-foreground/80">
        {connected ? 'Welcome to TinkrLabz.' : 'Connecting…'}
      </span>
      <span
        aria-hidden="true"
        className="h-3 w-1.5 shrink-0 bg-primary/80 motion-safe:animate-pulse"
      />
    </div>
  )
}
