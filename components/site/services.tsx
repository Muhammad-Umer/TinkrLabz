import { BrainCircuit, Compass, Database, Infinity as InfinityIcon, ServerCog, Smartphone } from 'lucide-react'
import { VantaBackground } from '@/components/effects/vanta-background'
import { GlassCard } from '@/components/effects/glass-card'
import { GuideAction } from './guide-action'
import { SectionHeading } from './section-heading'

const serviceIds = ['ai-automation', 'cloud-devops', 'managed-engineering', 'data-governance', 'application-development', 'technology-consulting']

const inquiryCategories = ['AI & Automation', 'Cloud / DevOps', 'Managed engineering', 'Data / governance', 'Build a product', 'Technology consulting']

const services = [
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    body: 'AI applications, retrieval, agents, and workflow automation.',
  },
  {
    icon: InfinityIcon,
    title: 'Cloud & DevOps',
    body: 'Reliable infrastructure, automated releases, and cloud operations.',
  },
  {
    icon: ServerCog,
    title: 'Managed Engineering',
    body: 'Ongoing development, production support, and roadmap improvements.',
  },
  {
    icon: Database,
    title: 'Data & Governance',
    body: 'Trustworthy data, governance, and analytics foundations.',
  },
  {
    icon: Smartphone,
    title: 'Application Development',
    body: 'Web, mobile, and backend software from design to launch.',
  },
  {
    icon: Compass,
    title: 'Technology Consulting',
    body: 'Architecture, modernization, and clear technical decisions.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <VantaBackground effect="dots" />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-background/40 to-background"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Our Services" title="Everything you need to build and scale." />
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Choose a service. TinkrBot will help you start.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <GlassCard
              as="li"
              key={service.title}
              id={serviceIds[i]}
              className="group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" aria-hidden />
                </span>
                <span className="font-heading text-sm font-semibold text-muted-foreground/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-navy"><a href={`#${serviceIds[i]}`} className="hover:text-primary">{service.title}</a></h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.body}</p>
              <GuideAction view="contact" category={inquiryCategories[i]} className="mt-5 text-left text-sm font-semibold text-primary hover:underline">Start here</GuideAction>
            </GlassCard>
          ))}

        </ul>
      </div>
    </section>
  )
}
