import { BrainCircuit, Compass, Database, Infinity as InfinityIcon, ServerCog, Smartphone } from 'lucide-react'
import { VantaBackground } from '@/components/effects/vanta-background'
import { GlassCard } from '@/components/effects/glass-card'
import { SectionHeading } from './section-heading'

const serviceIds = ['ai-automation', 'cloud-devops', 'managed-engineering', 'data-governance', 'application-development', 'technology-consulting']

const services = [
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    body: 'Build AI applications, knowledge retrieval, and useful agents. Automate workflows with evaluation, permissions, and operational controls designed in from the start.',
  },
  {
    icon: InfinityIcon,
    title: 'Cloud & DevOps',
    body: 'Design, automate, and operate reliable cloud platforms with CI/CD, Terraform, Kubernetes, observability, and security practices.',
  },
  {
    icon: ServerCog,
    title: 'Managed Engineering',
    body: 'Keep your software reliable and moving forward with ongoing development, production support, and improvements guided by your roadmap.',
  },
  {
    icon: Database,
    title: 'Data & Governance',
    body: 'Build trustworthy data platforms with clear ownership, governance, security, quality controls, and scalable analytics foundations.',
  },
  {
    icon: Smartphone,
    title: 'Application Development',
    body: 'Design and build production ready web, mobile, backend, and distributed systems from initial architecture through launch.',
  },
  {
    icon: Compass,
    title: 'Technology Consulting',
    body: 'Get senior technical guidance on architecture, cloud strategy, modernization, platform engineering, and engineering organization decisions.',
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
            Practical engineering services to move your software from idea to production and keep it improving.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <GlassCard
              as="li"
              key={service.title}
              id={serviceIds[i]}
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
              <h3 className="mt-10 text-xl font-bold text-navy"><a href={`#${serviceIds[i]}`} className="hover:text-primary">{service.title}</a></h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.body}</p>
            </GlassCard>
          ))}

        </ul>
      </div>
    </section>
  )
}
