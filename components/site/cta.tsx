import { ShaderGradient } from '@/components/effects/shader-gradient'

export function Cta() {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border">
        <ShaderGradient />
        <div className="liquid-glass relative m-3 flex flex-col items-start gap-10 rounded-2xl px-8 py-14 md:m-4 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Your next idea could work smarter with AI.
          </h2>
          <a href="/#contact" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Discuss your idea</a>
        </div>
      </div>
    </section>
  )
}
