import assert from 'node:assert/strict'
import { test } from 'node:test'
import { contactProgress, validateContact } from '../lib/contact.ts'
const emptyContact = { name: '', email: '', company: '', category: '', message: '', website: '' }
import { technologyGroups } from '../lib/technologies.ts'

test('technology landscape has no duplicate technologies across categories', () => {
  const entries = technologyGroups
    .flatMap((group) => [...group.items])
    .map((item) => item.toLowerCase())
  assert.equal(entries.length, new Set(entries).size)
  assert.deepEqual(technologyGroups[0].items, [
    'Amazon Web Services',
    'Microsoft Azure',
    'Google Cloud',
  ])
})
test('inquiry progress counts valid essentials and excludes optional company', () => {
  assert.equal(contactProgress(emptyContact), 0)
  assert.equal(
    contactProgress({ ...emptyContact, name: 'Jane', email: 'invalid', company: 'Company' }),
    1,
  )
  assert.equal(
    contactProgress({
      ...emptyContact,
      name: 'Jane',
      email: 'jane@example.com',
      category: 'AI & Automation',
      message: 'Automate document search',
    }),
    4,
  )
})
