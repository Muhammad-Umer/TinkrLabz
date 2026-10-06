export const categories = ['AI & Automation', 'Build a product', 'Improve an application or platform', 'Ask about a TinkrLabz product', 'Cloud / DevOps', 'Managed engineering', 'Data / governance', 'Technology consulting', 'Something else'] as const
export type ContactData = { name: string; email: string; company: string; category: string; message: string; website: string }
export function validateContact(data: ContactData) {
  const errors: Record<string, string> = {}
  if (!data.name.trim() || data.name.length > 120) errors.name = 'Enter your name (up to 120 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) errors.email = 'Enter a valid work email.'
  if (data.company.length > 200) errors.company = 'Use up to 200 characters.'
  if (!(categories as readonly string[]).includes(data.category)) errors.category = 'Choose what you are looking for.'
  if (!data.message.trim() || data.message.length > 5000) errors.message = 'Enter project details (up to 5,000 characters).'
  return errors
}

export function contactProgress(data: ContactData) {
  const errors = validateContact(data)
  return (['name', 'email', 'category', 'message'] as const).filter(field => !errors[field]).length
}
