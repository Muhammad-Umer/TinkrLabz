import { ContentPage } from '@/components/site/content-page'

export const metadata = { title: 'Work | TinkrLabz', alternates: { canonical: '/work' } }

export default function Work() {
  return (
    <ContentPage title="Our work">
      <p>
        Public case studies are not yet available. Tell us about your technical challenge to discuss
        our approach and relevant experience.
      </p>
      <a href="/#contact" className="inline-block text-primary underline">
        Discuss a similar project
      </a>
    </ContentPage>
  )
}
