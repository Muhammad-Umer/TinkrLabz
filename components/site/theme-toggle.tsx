'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="group relative flex size-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-all hover:scale-105 hover:border-primary hover:text-primary"
    >
      <Sun className="size-4 transition-transform duration-500 group-hover:rotate-90 dark:hidden" aria-hidden />
      <Moon className="hidden size-4 transition-transform duration-500 group-hover:-rotate-12 dark:block" aria-hidden />
      <span className="sr-only">Toggle light and dark mode</span>
    </button>
  )
}
