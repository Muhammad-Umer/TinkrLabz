'use client'

import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { validateContact, type ContactData } from '@/lib/contact'
import { emptyContact } from '@/lib/tinkrbot'

export type GuideView = 'home' | 'ai' | 'products' | 'platform' | 'services' | 'technologies' | 'contact'
type GuideContextValue = {
  open: boolean
  view: GuideView
  show: (view?: GuideView, category?: string) => void
  close: () => void
  data: ContactData
  update: (field: keyof ContactData, value: string) => void
  errors: Record<string, string>
  error: string
  sent: boolean
  pending: boolean
  send: () => Promise<void>
  reset: () => void
}
const GuideContext = createContext<GuideContextValue | null>(null)

export function GuideProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<GuideView>('home')
  const [data, setData] = useState<ContactData>({ ...emptyContact })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)

  function update(field: keyof ContactData, value: string) {
    setData(current => ({ ...current, [field]: value }))
    setErrors(current => { const next = { ...current }; delete next[field]; return next })
  }

  function show(next: GuideView = 'home', category?: string) {
    setView(next)
    if (category && !busy.current) update('category', category)
    setOpen(true)
  }

  async function send() {
    if (busy.current || sent) return
    const validation = validateContact(data)
    setErrors(validation)
    setError('')
    if (Object.keys(validation).length) return
    busy.current = true
    setPending(true)
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const result = await response.json()
      if (!response.ok || !result.success) {
        setErrors(result.errors || {})
        setError(result.error || 'Please check your details and try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Unable to send. Try again or email hello@tinkrlabz.com.')
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  function reset() {
    if (busy.current) return
    setData({ ...emptyContact })
    setErrors({})
    setError('')
    setSent(false)
  }

  return <GuideContext.Provider value={{ open, view, show, close: () => setOpen(false), data, update, errors, error, sent, pending, send, reset }}>{children}</GuideContext.Provider>
}

export function useGuide() {
  const value = useContext(GuideContext)
  if (!value) throw new Error('TinkrBot requires GuideProvider')
  return value
}
