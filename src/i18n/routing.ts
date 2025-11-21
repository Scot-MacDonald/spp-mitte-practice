import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import localization from './localization'

export const routing = defineRouting({
  locales: localization.locales.map((locale) => locale.code),
  defaultLocale: localization.defaultLocale,
  localePrefix: 'always', // ✅ safest for Payload
})

// Export locale-aware Next.js navigation helpers
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)

export type Locale = (typeof routing.locales)[number]
