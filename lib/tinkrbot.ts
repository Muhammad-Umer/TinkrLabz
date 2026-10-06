import type { ContactData } from './contact'

export const missions = [
  { id: 'ai', title: 'Bring AI to life', category: 'AI & Automation', prompt: 'I want to use AI to help with ', hint: 'Tell me the task, the data available, and what a useful result would look like.' },
  { id: 'product', title: 'Build something useful', category: 'Build a product', prompt: 'I want to build a product that helps ', hint: 'Tell me who it is for and the problem it should solve.' },
  { id: 'platform', title: 'Level up a platform', category: 'Improve an application or platform', prompt: 'I want to improve my application or platform by ', hint: 'Tell me what is getting in the way and what you want to improve.' },
] as const

export const emptyContact: ContactData = { name: '', email: '', company: '', category: '', message: '', website: '' }

