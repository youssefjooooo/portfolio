import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from '@/components/Navbar'
import ClientOnly from '@/components/ClientOnly'
import MouseFollower from '@/components/MouseFollower'

/* ─── Metadata ────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Portfolio — Creative Technologist & Engineer',
    template: '%s | Portfolio',
  },
  description:
    'High-performance portfolio showcasing pixel-perfect frontend engineering, creative development, and full-stack architecture.',
  keywords: ['Next.js', 'TypeScript', 'React', 'Framer Motion', 'Frontend Engineer'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Portfolio — Creative Technologist & Engineer',
    description: 'Building performant interfaces where design meets engineering precision.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

/* ─── Root Layout ─────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body className="bg-black text-white font-sans antialiased">

        {/* ── Persistent ambient background ────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          {/* Static ambient radials — always visible, no JS required */}
          <div
            className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, #1e293b 0%, transparent 70%)',
              filter: 'blur(60px)',
              opacity: 0.35,
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, #0f172a 0%, transparent 70%)',
              filter: 'blur(60px)',
              opacity: 0.35,
            }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* ── Mouse-tracking spotlight (client-only, desktop only) ── */}
        <ClientOnly>
          <MouseFollower />
        </ClientOnly>

        {/* ── Persistent navigation ─────────────────── */}
        <Navbar />

        {/* ── Page content ──────────────────────────── */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  )
}
