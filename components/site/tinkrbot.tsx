import { cn } from '@/lib/utils'

export function TinkrBot({ className, celebrating = false }: { className?: string; celebrating?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={cn('text-primary', className)} aria-hidden="true">
      <circle cx="80" cy="84" r="69" fill="currentColor" opacity="0.08" />
      <path d="M80 24V38" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="20" r="7" fill="currentColor" />
      <rect x="29" y="40" width="102" height="80" rx="27" fill="currentColor" opacity="0.18" />
      <rect x="36" y="47" width="88" height="62" rx="21" fill="var(--background)" stroke="currentColor" strokeWidth="3" />
      <rect x="21" y="64" width="10" height="29" rx="5" fill="currentColor" />
      <rect x="129" y="64" width="10" height="29" rx="5" fill="currentColor" />
      {celebrating ? <><path d="M52 72L59 65L66 72M94 72L101 65L108 72" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><path d="M69 87Q80 102 91 87" fill="currentColor" /></> : <><rect x="53" y="65" width="13" height="18" rx="6.5" fill="currentColor" /><rect x="94" y="65" width="13" height="18" rx="6.5" fill="currentColor" /><path d="M69 91Q80 99 91 91" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></>}
      <path d="M51 124H109L103 140H57L51 124Z" fill="currentColor" opacity="0.3" />
      <circle cx="80" cy="131" r="4" fill="currentColor" />
      {celebrating && <><path d="M17 26V38M11 32H23M141 19V31M135 25H147" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="138" cy="128" r="4" fill="currentColor" /></>}
    </svg>
  )
}
