import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="mb-5 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        <span className="h-px w-10 bg-primary" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-navy md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
