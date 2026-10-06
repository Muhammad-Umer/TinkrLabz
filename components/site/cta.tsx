import { ArrowRight } from 'lucide-react'
import { ShaderGradient } from '@/components/effects/shader-gradient'

export function Cta() {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border">
        <ShaderGradient />
        <div className="liquid-glass relative m-3 flex flex-col items-start gap-10 rounded-2xl px-8 py-14 md:m-4 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Your next project is within sight with TinkrLabz.
          </h2>
          <a
            href="#contact"
            className="btn-shine group inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            {"Let's Talk"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
