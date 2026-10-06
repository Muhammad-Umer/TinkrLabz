import { ImageResponse } from 'next/og'
export const alt = 'TinkrLabz — Senior engineering teams built around your problem'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90, width: '100%', height: '100%', background: '#0d0b1f', color: '#fff' }}><div style={{ color: '#a78bfa', fontSize: 42 }}>TinkrLabz</div><div style={{ fontSize: 64, marginTop: 40 }}>Senior engineering teams built around your problem.</div><div style={{ fontSize: 25, marginTop: 40 }}>Software Development · Cloud & DevOps · Technology Consulting</div></div>, size)
}
