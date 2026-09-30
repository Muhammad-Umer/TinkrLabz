'use client'

import type { ElementType, HTMLAttributes, PointerEvent } from 'react'
import { cn } from '@/lib/utils'

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

export function GlassCard({ as = 'div', className, onPointerMove, ...props }: GlassCardProps) {
  const Component = as as 'div'
  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
    onPointerMove?.(e)
  }

  return (
    <Component
      onPointerMove={handlePointerMove}
      className={cn('liquid-glass rounded-2xl', className)}
      {...props}
    />
  )
}
