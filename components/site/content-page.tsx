import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'

export function ContentPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen max-w-4xl px-6 pt-36 pb-24">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
