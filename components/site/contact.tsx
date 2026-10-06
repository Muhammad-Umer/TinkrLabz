import { ContactForm } from './contact-form'
import { GuideAction } from './guide-action'
import { TinkrBot } from './tinkrbot'

export function Contact() {
  return <section id="contact" className="scroll-mt-24 py-20"><div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]"><div><TinkrBot className="size-28" /><h2 className="mt-4 text-3xl font-bold text-navy">Ready for the next step?</h2><p className="mt-4 text-muted-foreground">Send an inquiry or let me help you choose.</p><GuideAction className="mt-6 rounded-full border border-primary/40 px-5 py-3 font-semibold text-primary hover:bg-primary/10">Help me choose</GuideAction><a href="mailto:hello@tinkrlabz.com" className="mt-6 block text-sm text-muted-foreground underline">hello@tinkrlabz.com</a></div><div className="liquid-glass rounded-2xl p-6 sm:p-8"><ContactForm /></div></div></section>
}
