import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { MotionProvider } from '@/components/providers/motion-provider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Vooicia - Revolutionizing Business Communication',
  description: 'Experience the future of customer service with our AI-powered call agent. Available 24/7 with multilingual support for the Indian market.',
  keywords: ['AI call agent', 'customer service', 'India', 'business communication', 'AI assistant'],
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
      className={`${inter.variable} scroll-smooth`}
      style={{ scrollBehavior: 'smooth' }}
      suppressHydrationWarning
    >
      <body className={`font-sans min-h-screen bg-background antialiased text-foreground overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <Navigation />
            <main className="pt-20 md:max-w-[80%] max-w-[95%] w-full mx-auto">
              {children}
            </main>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
