import { BrainCircuit, Workflow, ShieldCheck } from 'lucide-react'
import { SectionHeading } from './section-heading'

const capabilities = [
  { icon: BrainCircuit, title: 'AI applications', body: 'Search, assistants, and document workflows grounded in your data.' },
  { icon: Workflow, title: 'Agents & automation', body: 'Useful actions with permissions and approval built in.' },
  { icon: ShieldCheck, title: 'Reliable operation', body: 'Quality checks, data protection, cost controls, and monitoring.' },
]

export function AiCapabilities() {
  return (
    <section id="ai" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-glow/10 via-transparent to-primary/10" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="AI at TinkrLabz" title="Make AI useful in the real world." />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Applications. Automation. Agents. Built to work.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map(item => (
            <div key={item.title} className="liquid-glass rounded-2xl p-8">
              <item.icon className="size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="/?topic=AI%20%26%20Automation#contact" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Discuss an AI project</a>
        </div>
      </div>
    </section>
  )
}
