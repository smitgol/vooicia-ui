import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { MotionProvider } from '@/components/providers/motion-provider'
import { Analytics } from "@vercel/analytics/next"
const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Voycia - Managed AI Voice Agents for Inbound Calls, Across Industries',
  description: 'Voycia is a service-based voice agent company. We design, deploy, and operate AI voice agents that answer your incoming calls 24/7 — for healthcare, real estate, e-commerce, hospitality, legal, automotive, home services, and more.',
  keywords: ['AI voice agent service', 'inbound call automation', 'managed voice agents', 'healthcare voice agent', 'real estate voice agent', 'voice agent agency', 'incoming call AI'],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${manrope.variable} scroll-smooth`}
      style={{ scrollBehavior: 'smooth' }}
      suppressHydrationWarning
    >
      <body className={`font-sans min-h-screen bg-background antialiased text-foreground overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <Navigation />
            <main className="pt-15 w-full mx-auto">
              {children}
            </main>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
