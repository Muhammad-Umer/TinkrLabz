import { ContactForm } from './contact-form'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-bold text-navy">Ready for the next step?</h2>
          <p className="mt-4 text-muted-foreground">
            Tell us what you would like to build or improve.
          </p>
        </div>
        <div className="liquid-glass rounded-2xl p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
