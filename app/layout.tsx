import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Nunito_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Silence deprecation warnings coming from Three.js modules
    if (args[0]?.toString().includes('THREE.Clock') || args[0]?.toString().includes('Multiple instances')) {
      return;
    }
    originalWarn(...args);
  };
}


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['500', '600', '700', '800'],
})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tinkrlabz.com'),
  title: 'TinkrLabz | AI Products & Software Engineering',
  description:
    'TinkrLabz builds AI applications, intelligent automation, and software products with cloud, data, and engineering services from idea to operation.',
  openGraph: {
    title: 'TinkrLabz | AI Products & Software Engineering',
    description:
      'AI products, intelligent automation, and software engineering for real business problems.',
    type: 'website',
    siteName: 'TinkrLabz',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TinkrLabz | AI Products & Software Engineering',
    description: 'AI and software built for real impact.',
    images: ['/opengraph-image'],
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: '/images/logo-mark.png',
    apple: '/images/logo-mark.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f5fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0b1f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${nunito.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
