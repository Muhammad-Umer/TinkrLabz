import { SectionHeading } from './section-heading'

const steps = [
  {
    title: 'Discover',
    body: 'Understand the business problem, technical landscape, constraints, and definition of success.',
  },
  {
    title: 'Design',
    body: 'Shape the architecture, user experience, and delivery plan around the outcome.',
  },
  {
    title: 'Build',
    body: 'Deliver iteratively with clear milestones, technical ownership, and transparent communication.',
  },
  {
    title: 'Support',
    body: 'Operate, improve, and evolve what we build after launch.',
  },
]

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="How We Work" title="From concept to completion, with precision." />

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Start with the problem and a clear definition of success. We shape the solution, deliver working software in useful increments, and keep it reliable as needs evolve.
        </p>
        <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="group relative pt-8">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-border" aria-hidden />
              <span
                className="absolute top-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full"
                aria-hidden
              />
              <span className="font-heading text-5xl font-extrabold text-primary/25 transition-colors duration-300 group-hover:text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-bold text-navy">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
