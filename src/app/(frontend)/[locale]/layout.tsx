import type { Metadata } from 'next'
import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import localization from '@/i18n/localization'
import { notFound } from 'next/navigation'
import { TypedLocale } from 'payload'

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params

  // Validate that the locale exists in routing + localization
  const currentLocale = localization.locales.find((loc) => loc.code === locale)

  if (!routing.locales.includes(locale as any) || !currentLocale) {
    notFound()
  }

  // Set locale for next-intl
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  // RTL support if you add extra locales
  const rtlLocales = ['ar', 'he', 'fa', 'ur']
  const direction = rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {/* <link href="/favicon.svg" rel="icon" type="image/svg+xml" /> */}
      </head>

      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header locale={locale} />

            {/* ✅ Live preview must be AFTER the header & BEFORE page content */}
            <LivePreviewListener />
            <main id="main-content">{children}</main>
            <Footer locale={locale} />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
