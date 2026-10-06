import Image from 'next/image'
import { ShaderGradient } from '@/components/effects/shader-gradient'
import { GlassCard } from '@/components/effects/glass-card'
import { SectionHeading } from './section-heading'

const stats = [
  { value: '5', label: 'Core practices' },
  { value: 'Owned', label: 'Delivery outcomes' },
  { value: 'End-to-end', label: 'Concept to launch' },
  { value: 'Senior', label: 'Problem-focused teams' },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="About Us" title="We turn your ideas into working software." />
          <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
            TinkrLabz helps technology-driven businesses turn complex software problems into working products. We assemble the team, own the delivery, and stay with you long after launch.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                className="p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-navy md:text-3xl">{stat.value}</dd>
              </GlassCard>
            ))}
          </dl>
        </div>

        <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border">
          <ShaderGradient />
          <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
            <GlassCard className="flex size-20 items-center justify-center self-start rounded-2xl">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={333}
                height={251}
                className="h-9 w-auto dark:hidden"
              />
              <Image
                src="/images/logo-mark-dark.png"
                alt=""
                width={333}
                height={251}
                className="hidden h-9 w-auto dark:block"
              />
            </GlassCard>

            <GlassCard as="figure" className="p-8">
              <blockquote className="text-pretty font-heading text-xl font-semibold leading-snug text-navy md:text-2xl">
                {'"We assemble the team, own the delivery, and stay with you long after launch."'}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-px w-8 bg-primary" aria-hidden />
                The TinkrLabz promise
              </figcaption>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
