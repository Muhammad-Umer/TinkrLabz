import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/#top"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="TinkrLabz home"
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={333}
        height={251}
        priority
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-110 dark:hidden"
      />
      <Image
        src="/images/logo-mark-dark.png"
        alt=""
        width={333}
        height={251}
        priority
        className="hidden h-8 w-auto transition-transform duration-300 group-hover:scale-110 dark:block"
      />
      <span className="font-heading text-lg font-bold tracking-tight text-navy">
        Tinkr<span className="text-primary">Labz</span>
      </span>
    </Link>
  )
}
