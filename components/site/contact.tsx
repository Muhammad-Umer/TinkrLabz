import { Globe, Handshake, Layers } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { ContactForm } from './contact-form'

const details = [
  { icon: Layers, label: 'Solutions', value: 'AI, products & platforms' },
  { icon: Handshake, label: 'Engagements', value: 'Product inquiries & engineering services' },
  { icon: Globe, label: 'Working model', value: 'Clear communication from design to operation' },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute top-1/3 -left-40 size-128 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-112 rounded-full bg-glow/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Contact Us" title="What would you like to solve?" />
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            Ask about a TinkrLabz product or share what you want to build or improve. Tell us what success looks like, and we will discuss the next step.
          </p>
          <ul className="mt-12 flex flex-col gap-6">
            {details.map((d) => (
              <li key={d.label} className="group flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <d.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{d.label}</p>
                  <p className="font-heading font-semibold text-navy">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
