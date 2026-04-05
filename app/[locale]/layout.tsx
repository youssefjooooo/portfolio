/**
 * Locale Layout — UI chrome for all [locale] routes
 *
 * Does NOT render <html>/<body> — those belong to the root layout.
 * Responsibilities:
 *  1. setRequestLocale() — enables static rendering with next-intl
 *  2. Load & inject translated messages via NextIntlClientProvider
 *  3. Render persistent UI: ambient background, MouseFollower, Navbar
 */

import { setRequestLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider }        from 'next-intl'
import { notFound }                      from 'next/navigation'
import Navbar                            from '@/components/Navbar'
import ClientOnly                        from '@/components/ClientOnly'
import MouseFollower                     from '@/components/MouseFollower'

const LOCALES = ['en', 'ar'] as const

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound()

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>

      {/* ── Mouse spotlight (desktop only, client-safe) ── */}
      <ClientOnly>
        <MouseFollower />
      </ClientOnly>

      {/* ── Navigation ──────────────────────────────── */}
      <Navbar />

      {/* ── Page content ────────────────────────────── */}
      <main className="relative z-10">{children}</main>

    </NextIntlClientProvider>
  )
}
