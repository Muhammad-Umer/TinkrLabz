import { Resend } from 'resend'
import { validateContact, type ContactData } from '@/lib/contact'

export async function POST(request: Request) {
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Invalid request origin.' }, { status: 403 })
  if (Number(request.headers.get('content-length')) > 16384) return Response.json({ error: 'Message is too large.' }, { status: 413 })
  let data: ContactData
  try {
    const body = await request.text()
    if (body.length > 16384) return Response.json({ error: 'Message is too large.' }, { status: 413 })
    const input = JSON.parse(body)
    data = Object.fromEntries(['name', 'email', 'company', 'category', 'message', 'website'].map(key => [key, typeof input?.[key] === 'string' ? input[key] : ''])) as ContactData
  } catch { return Response.json({ error: 'Invalid form data.' }, { status: 400 }) }
  if (data.website) return Response.json({ error: 'Unable to submit this message.' }, { status: 400 })
  const errors = validateContact(data)
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 })
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return Response.json({ error: 'Messaging is temporarily unavailable. Please try again shortly.' }, { status: 503 })
  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.CONTACT_FROM_EMAIL, to: 'hello@tinkrlabz.com', replyTo: data.email,
      subject: `Project inquiry: ${data.category}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\nService: ${data.category}\n\n${data.message}`,
    })
    if (error) throw new Error('Email delivery failed')
    return Response.json({ success: true })
  } catch { return Response.json({ error: 'Unable to send your message. Please try again shortly.' }, { status: 502 }) }
}
