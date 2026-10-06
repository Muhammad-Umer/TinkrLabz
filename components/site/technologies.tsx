import { technologyGroups } from '@/lib/technologies'
import { SectionHeading } from './section-heading'

export function Technologies() {
  return (
    <section id="technologies" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Technology landscape" title="Technologies we work with" />
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          From AI and applications to cloud, data, and reliable operations. These are representative technologies across our solution landscape. We choose the right fit for each project.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map(group => (
            <div key={group.title} className="rounded-2xl border border-border p-6">
              <h3 className="font-bold text-navy">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <li key={item} className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
