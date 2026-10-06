'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ArrowLeft, ArrowRight, BrainCircuit, Boxes, Code2, Cpu, Layers, MessageCircle, Moon, Sun, X } from 'lucide-react'
import { inquiryTopics } from '@/lib/tinkrbot'
import { useGuide, type GuideView } from './guide-context'
import { TinkrBot } from './tinkrbot'
import { ContactForm } from './contact-form'

const choices = [
  { view: 'ai', label: 'Explore AI', icon: BrainCircuit },
  { view: 'products', label: 'See products', icon: Boxes },
  { view: 'platform', label: 'Build or improve', icon: Code2 },
  { view: 'services', label: 'Find a service', icon: Layers },
  { view: 'technologies', label: 'Check the stack', icon: Cpu },
  { view: 'contact', label: 'Start an inquiry', icon: MessageCircle },
] as const
const buttonClass = 'flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-left text-sm font-semibold hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary'
const views: Record<GuideView, string> = { home: 'Where shall we go?', ai: 'Put AI to work.', products: 'Explore our products.', platform: 'What are you building?', services: 'Choose a direction.', technologies: 'Find your technology fit.', contact: 'Let us get you started.' }

export function SiteGuide() {
  const guide = useGuide()
  const heading = useRef<HTMLHeadingElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { setTheme } = useTheme()
  useEffect(() => {
    if (guide.open && !dialog.current?.open) dialog.current?.showModal()
    if (!guide.open && dialog.current?.open) dialog.current?.close()
  }, [guide.open])
  useEffect(() => {
    if (!guide.open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [guide.open])

  useEffect(() => { if (guide.open) heading.current?.focus({ preventScroll: true }) }, [guide.open, guide.view])

  function go(path: string) { guide.close(); router.push(path) }
  function inquiry(category: string) { guide.show('contact', category) }

  return <>
    <button type="button" onClick={() => guide.show()} aria-haspopup="dialog" aria-expanded={guide.open} aria-controls="tinkrbot-guide" className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-primary/30 bg-background px-4 py-2 font-semibold text-foreground shadow-xl hover:border-primary sm:right-6 sm:bottom-6">
      <TinkrBot className="size-10" /><span>TinkrBot</span><span className="sr-only">Open guide</span>
    </button>
    <dialog ref={dialog} id="tinkrbot-guide" aria-labelledby="guide-title" onCancel={guide.close} onClose={guide.close} onClick={event => { if (event.target === event.currentTarget) guide.close() }} className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-3xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-5 py-3">
        <div className="flex items-center gap-2"><TinkrBot className="size-12" /><div><h2 id="guide-title" className="font-bold">TinkrBot</h2><p className="text-xs text-muted-foreground">Your TinkrLabz guide</p></div></div>
        <button type="button" onClick={guide.close} aria-label="Close TinkrBot" className="rounded-full p-2 hover:bg-secondary"><X className="size-5" aria-hidden="true" /></button>
      </div>
      <div className="p-5">
        {guide.view !== 'home' && <button type="button" onClick={() => guide.show()} className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" aria-hidden="true" /> All options</button>}
        <h3 ref={heading} tabIndex={-1} className="mb-5 outline-none text-2xl font-bold text-navy">{views[guide.view]}</h3>
        {guide.view === 'home' && <div className="grid gap-3 sm:grid-cols-2">{choices.map(item => <button key={item.view} type="button" className={buttonClass} onClick={() => guide.show(item.view)}><span className="flex items-center gap-2"><item.icon className="size-5 text-primary" aria-hidden="true" />{item.label}</span><ArrowRight className="size-4" aria-hidden="true" /></button>)}</div>}
        {guide.view === 'ai' && <div className="space-y-3"><p className="mb-5 text-muted-foreground">AI apps. Useful agents. Workflow automation.</p><button type="button" className={buttonClass} onClick={() => go('/#ai')}>See AI capabilities<ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className={buttonClass} onClick={() => inquiry('AI & Automation')}>Start an AI inquiry<ArrowRight className="size-4" aria-hidden="true" /></button></div>}
        {guide.view === 'products' && <div className="space-y-3"><button type="button" className={buttonClass} onClick={() => go('/products')}>Open products<ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className={buttonClass} onClick={() => inquiry('Ask about a TinkrLabz product')}>Ask about a product<ArrowRight className="size-4" aria-hidden="true" /></button></div>}
        {guide.view === 'platform' && <div className="space-y-3"><button type="button" className={buttonClass} onClick={() => inquiry('Build a product')}>Build a product<ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className={buttonClass} onClick={() => inquiry('Improve an application or platform')}>Improve an application<ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className={buttonClass} onClick={() => inquiry('Cloud / DevOps')}>Improve cloud operations<ArrowRight className="size-4" aria-hidden="true" /></button></div>}
        {guide.view === 'services' && <div className="grid gap-3 sm:grid-cols-2">{inquiryTopics.map(({label,category}) => <button key={category} type="button" className={buttonClass} onClick={() => inquiry(category)}>{label}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></button>)}</div>}
        {guide.view === 'technologies' && <div className="space-y-3"><p className="mb-5 text-muted-foreground">Cloud, AI, applications, data, and operations.</p><button type="button" className={buttonClass} onClick={() => go('/#technologies')}>Explore the stack<ArrowRight className="size-4" aria-hidden="true" /></button><button type="button" className={buttonClass} onClick={() => inquiry('Technology consulting')}>Discuss technical fit<ArrowRight className="size-4" aria-hidden="true" /></button></div>}
        {guide.view === 'contact' && <ContactForm />}
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3"><button type="button" onClick={() => go('/')} className="text-xs text-muted-foreground hover:text-primary">Home</button><div className="flex gap-1"><button type="button" aria-label="Use light theme" onClick={() => setTheme('light')} className="rounded-lg p-2 hover:bg-secondary"><Sun className="size-4" aria-hidden="true" /></button><button type="button" aria-label="Use dark theme" onClick={() => setTheme('dark')} className="rounded-lg p-2 hover:bg-secondary"><Moon className="size-4" aria-hidden="true" /></button></div></div>
    </dialog>
  </>
}
