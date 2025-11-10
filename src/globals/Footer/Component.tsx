import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'
import { OpeningHours } from '@/components/OpeningHours'
import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'
import { getTranslations } from 'next-intl/server' // ✅ import this

export async function Footer({ locale }: { locale: TypedLocale }) {
  // ✅ Load translations for this locale
  const t = await getTranslations({ locale, namespace: 'Footer' })

  // ✅ Fetch global footer data from Payload
  const footer: Footer = await getCachedGlobal('footer', 1, locale)()
  const navItems = footer?.navItems || []

  return (
    <footer className="border-t border-border">
      <div className="container-full px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {/* Column 1: Address */}
          <div className="flex flex-col gap-1 leading-snug xl:col-span-1">
            <div className="font-semibold">{t('addressTitle')}</div>
            <div>Linienstraße 127</div>
            <div>VH, 2. OG rechts</div>
            <div>10115 Berlin-Mitte</div>
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col gap-1 leading-snug xl:col-span-1">
            <div className="font-semibold">{t('contactTitle')}</div>
            <div>{t('phone')}: 030 - 282 50 52</div>
            <div>{t('fax')}: 030 - 278 90 537</div>
            <div>praxis@spp-mitte.de</div>
          </div>

          {/* Column 3: Infos */}
          <div className="flex flex-col gap-1 leading-snug xl:col-span-1">
            <div className="font-semibold">{t('infosTitle')}</div>
            <nav className="flex flex-col gap-1">
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </nav>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="flex flex-col gap-1 leading-snug w-full max-w-[500px] xl:col-span-2">
            <div className="font-semibold">{t('openingHoursTitle')}</div>
            <OpeningHours />
          </div>
        </div>
      </div>
    </footer>
  )
}
