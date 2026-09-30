'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={cn(
          'liquid-glass mx-auto max-w-6xl transition-[border-radius] duration-300',
          open ? 'rounded-2xl' : 'rounded-full',
        )}
      >
        <div className="flex h-16 items-center justify-between pr-3 pl-6">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn-shine hidden rounded-full bg-primary px-5 py-3 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground md:inline-block"
            >
              {"Let's Talk"}
            </a>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border md:hidden">
            <ul className="flex flex-col px-6 py-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
