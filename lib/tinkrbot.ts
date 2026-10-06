import type { ContactData } from './contact'

export const inquiryTopics = [
  { label: 'AI & Automation', category: 'AI & Automation' },
  { label: 'Applications', category: 'Build a product' },
  { label: 'Cloud & DevOps', category: 'Cloud / DevOps' },
  { label: 'Data & Governance', category: 'Data / governance' },
  { label: 'Managed Engineering', category: 'Managed engineering' },
  { label: 'Consulting', category: 'Technology consulting' },
] as const

export const emptyContact: ContactData = { name: '', email: '', company: '', category: '', message: '', website: '' }
