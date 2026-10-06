import { GuideAction } from './guide-action'
export function About() {
  return <section id="about" className="scroll-mt-24 border-y border-border py-12"><div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold text-navy">TinkrLabz, in brief.</h2><p className="mt-3 max-w-2xl text-muted-foreground">AI products and engineering services. From your first idea to reliable operation.</p></div><GuideAction view="services" className="shrink-0 font-semibold text-primary hover:underline">Show me what you do</GuideAction></div></section>
}
