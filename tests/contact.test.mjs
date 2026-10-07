import assert from 'node:assert/strict'
import { test } from 'node:test'
import { categories, validateContact } from '../lib/contact.ts'
const valid = {
  name: 'Jane Doe',
  email: 'jane@company.com',
  company: '',
  category: categories[0],
  message: 'Build a platform',
  website: '',
}
test('all supported services can be submitted without a company', () => {
  for (const category of categories) assert.deepEqual(validateContact({ ...valid, category }), {})
})
test('invalid fields receive inline errors', () => {
  assert.deepEqual(
    Object.keys(
      validateContact({ ...valid, name: ' ', email: 'bad', category: 'unknown', message: ' ' }),
    ),
    ['name', 'email', 'category', 'message'],
  )
})
test('length limits reject oversized input', () => {
  assert.deepEqual(
    Object.keys(
      validateContact({
        ...valid,
        name: 'x'.repeat(121),
        email: 'x'.repeat(255) + '@a.com',
        company: 'x'.repeat(201),
        message: 'x'.repeat(5001),
      }),
    ),
    ['name', 'email', 'company', 'message'],
  )
})
