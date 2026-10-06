import { ArrowUpRight, BrainCircuit, Boxes, Code2, MessageCircle } from 'lucide-react'
import { VantaBackground } from '@/components/effects/vanta-background'
import { GuideAction } from './guide-action'
import { TinkrBot } from './tinkrbot'

const paths = [
  { view: 'ai', label: 'Explore AI', icon: BrainCircuit },
  { view: 'products', label: 'Discover products', icon: Boxes },
  { view: 'platform', label: 'Build or improve', icon: Code2 },
  { view: 'contact', label: 'Start an inquiry', icon: MessageCircle },
] as const

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[85svh] items-center overflow-hidden py-32">
      <VantaBackground effect="net" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="mb-6 flex items-center gap-3"><TinkrBot className="size-14 lg:hidden" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Hi, I am TinkrBot.</p></div>
          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-navy md:text-6xl">Your guide to AI <span className="text-primary">and smarter software.</span></h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Pick a direction. I will help you take the next step.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {paths.map(path => <GuideAction key={path.view} view={path.view} className="liquid-glass group flex items-center justify-between gap-3 rounded-2xl px-5 py-5 text-left font-semibold text-navy hover:border-primary/50"><span className="flex items-center gap-3"><path.icon className="size-5 shrink-0 text-primary" aria-hidden="true" />{path.label}</span><ArrowUpRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></GuideAction>)}
          </div>
        </div>
        <div className="hidden flex-col items-center lg:flex"><TinkrBot className="w-full max-w-72" /><GuideAction className="btn-shine mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">Guide me</GuideAction><p className="mt-3 text-sm text-muted-foreground">Choose. Explore. Build.</p></div>
      </div>
    </section>
  )
}
