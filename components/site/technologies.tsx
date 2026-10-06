import { technologyGroups } from '@/lib/technologies'
import { SectionHeading } from './section-heading'

export function Technologies() {
  return (
    <section id="technologies" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Technology landscape" title="Technologies we work with" />
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          Choose a category to explore the stack.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map(group => (
            <details key={group.title} className="rounded-2xl border border-border p-5">
              <summary className="cursor-pointer font-semibold text-navy"><span>{group.title}</span><span className="ml-2 text-xs text-muted-foreground">{group.items.length}</span></summary>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <li key={item} className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
