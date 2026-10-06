import { ArrowRight, BrainCircuit, Workflow, ShieldCheck } from 'lucide-react'
import { SectionHeading } from './section-heading'

const capabilities = [
  { icon: BrainCircuit, title: 'AI that understands your context', body: 'Connect language models to your knowledge and applications. Build useful search, document workflows, and assistants with retrieval and clear source references.' },
  { icon: Workflow, title: 'Automation that does useful work', body: 'Turn repetitive workflows into reliable actions. Design agents and integrations with explicit permissions, approval steps, and a path back to manual control.' },
  { icon: ShieldCheck, title: 'Designed for production', body: 'Evaluate output quality, protect sensitive data, and monitor cost and behavior. Keep AI useful as models, data, and business needs change.' },
]

export function AiCapabilities() {
  return (
    <section id="ai" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-glow/10 via-transparent to-primary/10" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="AI at TinkrLabz" title="Make AI useful in the real world." />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Go from an AI idea to a working product or workflow. We connect models, data, and software with the controls needed to operate them confidently.
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
          <a href="#contact" className="btn-shine inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            Explore your AI idea <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <span className="text-sm text-muted-foreground">Applications · Retrieval · Agents · Automation · Evaluation</span>
        </div>
      </div>
    </section>
  )
}
