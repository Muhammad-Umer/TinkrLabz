import { ArrowUpRight, Compass, Database, Infinity as InfinityIcon, ServerCog, Smartphone } from 'lucide-react'
import { VantaBackground } from '@/components/effects/vanta-background'
import { GlassCard } from '@/components/effects/glass-card'
import { SectionHeading } from './section-heading'

const services = [
  {
    icon: InfinityIcon,
    title: 'DevOps Wizardry',
    body: 'Our DevOps expertise encompasses every stage of the software delivery lifecycle, ensuring your application and infrastructure perform optimally through a comprehensive approach.',
  },
  {
    icon: ServerCog,
    title: 'Managed Magic',
    body: 'Comprehensive managed services in an outsourced model, supported by clear service level agreements, escalation procedures and governance frameworks.',
  },
  {
    icon: Database,
    title: 'Dataguard Elite',
    body: 'A robust data governance strategy maximizes the value of your information — enabling better decisions, fostering innovation and enhancing collaboration.',
  },
  {
    icon: Smartphone,
    title: 'App Alchemy',
    body: 'Custom app development solutions that automate your business processes and boost engagement with your target audience.',
  },
  {
    icon: Compass,
    title: 'Mystic Future',
    body: "Consulting that guides you toward smart, forward-looking decisions to drive your company's growth and turn your vision into tangible results.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <VantaBackground effect="dots" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Our Services" title="Everything you need to build and scale." />
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Five focused practices, one team — so your project moves from idea to production without
            the hand-offs.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <GlassCard
              as="li"
              key={service.title}
              className="group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" aria-hidden />
                </span>
                <span className="font-heading text-sm font-semibold text-muted-foreground/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-10 text-xl font-bold text-navy">{service.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.body}</p>
            </GlassCard>
          ))}
          <li className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
            <div
              className="absolute -top-16 -right-16 size-48 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-150"
              aria-hidden
            />
            <h3 className="relative text-xl font-bold">Have something else in mind?</h3>
            <a
              href="#contact"
              className="relative mt-10 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Tell us about it
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
