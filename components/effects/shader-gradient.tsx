'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { brandColors } from '@/lib/brand-colors'
import { cn } from '@/lib/utils'

const ShaderGradientCanvas = dynamic(() => import('./shader-gradient-canvas'), { ssr: false })

export function ShaderGradient({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Track hydration completion cleanly
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Default fallback values used during server-side compilation
  const colors = mounted && resolvedTheme === 'light' 
    ? brandColors.light.gradient 
    : brandColors.dark.gradient

  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})` }}
    >
      {/* Ensure the canvas element is structurally isolated until client hydration finishes */}
      {mounted && resolvedTheme && (
        <ShaderGradientCanvas key={resolvedTheme} colors={colors} />
      )}
    </div>
  )
}
