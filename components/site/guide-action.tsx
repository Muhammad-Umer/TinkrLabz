'use client'

import type { ReactNode } from 'react'
import { useGuide, type GuideView } from './guide-context'

export function GuideAction({ children, view = 'home', category, className }: { children: ReactNode; view?: GuideView; category?: string; className?: string }) {
  const guide = useGuide()
  return <button type="button" className={className} onClick={() => guide.show(view, category)}>{children}</button>
}
