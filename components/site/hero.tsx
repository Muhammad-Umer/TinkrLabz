import { ArrowDown, ArrowRight } from 'lucide-react'
import { VantaBackground } from '@/components/effects/vanta-background'

const highlights = ['DevOps', 'Managed Services', 'Data Governance', 'App Development', 'Consulting']

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <VantaBackground effect="net" />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="pointer-events-none relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24">
        <p className="liquid-glass mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Welcome to TinkerLabs
        </p>
        <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-navy md:text-7xl">
          Crafting code, <span className="text-primary">shaping</span> tomorrow.
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Fueling innovation by assembling elite tech teams and driving projects from concept to
          completion with precision and confidence.
        </p>

        <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="btn-shine group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            {"Let's Talk"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <a
            href="#services"
            className="liquid-glass inline-flex items-center rounded-full px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-transform hover:-translate-y-0.5"
          >
            Our Services
          </a>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </a>
    </section>
  )
}
