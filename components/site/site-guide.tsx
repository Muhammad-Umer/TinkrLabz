'use client';
import { usePathname } from 'next/navigation';
import { useGuide } from './guide-context';
import { TinkrBot } from './tinkrbot';
export function SiteGuide() { const path = usePathname(), guide = useGuide(); if (path === '/')
    return null; return <button onClick={() => guide.show()} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-primary bg-background px-4 py-2 shadow-xl"><TinkrBot className="size-9"/>Continue with TinkrBot</button>; }
