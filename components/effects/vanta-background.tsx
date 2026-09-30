'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { brandColors } from '@/lib/brand-colors'
import { cn } from '@/lib/utils'

type VantaEffect = 'net' | 'dots'

export function VantaBackground({ effect, className }: { effect: VantaEffect; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el || !resolvedTheme) return

    let instance: { destroy: () => void } | undefined
    let cancelled = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const palette = resolvedTheme === 'dark' ? brandColors.dark : brandColors.light

    const load = async () => {
      // Vanta is pinned to the three.js r134 API, so it gets its own aliased copy
      const threeModule = await import('three-vanta')
      const THREE = threeModule.PerspectiveCamera ? threeModule : threeModule.default
      ;(window as unknown as { THREE: unknown }).THREE = THREE
      const mod =
        effect === 'net'
          ? await import('vanta/dist/vanta.net.min')
          : await import('vanta/dist/vanta.dots.min')
      if (cancelled) return

      const shared = {
        el,
        THREE,
        mouseControls: !reducedMotion,
        touchControls: !reducedMotion,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: palette.background,
      }

      instance =
        effect === 'net'
          ? mod.default({
              ...shared,
              color: palette.primary,
              points: 11,
              maxDistance: 21,
              spacing: 17,
              showDots: true,
            })
          : mod.default({
              ...shared,
              color: palette.primary,
              color2: palette.secondary,
              size: 2.6,
              spacing: 32,
              showLines: false,
            })
    }

    load()

    return () => {
      cancelled = true
      instance?.destroy()
    }
  }, [effect, resolvedTheme])

  return <div ref={ref} aria-hidden className={cn('absolute inset-0 bg-background', className)} />
}
