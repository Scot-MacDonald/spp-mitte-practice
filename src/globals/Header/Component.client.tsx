'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { usePathname } from '@/i18n/routing'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useTranslations } from 'next-intl'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  const closeSheet = () => setOpen(false)
  const t = useTranslations()

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-4"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex justify-between items-center">
        {/* Left: Logo + Nav on xl+ */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden xl:flex">
            <HeaderNav header={header} />
          </div>
        </div>

        {/* Right: Appointment button (desktop) */}
        <div className="hidden xl:flex items-center">
          <Link
            href="/"
            className="bg-[#cde3c5] text-[#00264c] text-lg flex items-center font-semibold px-4 py-2 rounded"
          >
            <img
              src="/api/media/file/D_Dark_Blue-1.svg "
              alt="Doctolib Logo"
              className="h-6 w-auto pr-2"
            />
            {t('appointment')}
          </Link>
        </div>

        {/* Mobile menu (only below xl) */}
        <div className="flex xl:hidden items-center gap-3">
          <Link
            href="https://www.doctolib.de/praxis/berlin/schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor?utm_campaign=website-button&utm_source=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor-website-button&utm_medium=referral&utm_content=option-8&utm_term=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#cde3c5] flex items-center font-semibold px-2 py-1 rounded"
          >
            <img
              src="/api/media/file/D_Dark_Blue-1.svg"
              alt="Doctolib Logo"
              className="h-4 w-auto pr-2 [@media(max-width:420px)]:pr-0"
            />
            <span className="[@media(max-width:420px)]:hidden">{t('appointment')}</span>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="">
              <MenuIcon className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 flex flex-col gap-4 p-4">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Menu</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>
              <Link href="/" onClick={closeSheet} className="mb-2">
                <Logo />
              </Link>
              <HeaderNav header={header} onClickLink={closeSheet} />
              <Link
                href="https://www.doctolib.de/praxis/berlin/schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor?utm_campaign=website-button&utm_source=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor-website-button&utm_medium=referral&utm_content=option-8&utm_term=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor"
                onClick={closeSheet}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#cde3c5] text-[#00264c] text-lg flex items-center font-semibold px-4 py-2 rounded"
              >
                <img
                  src="/api/media/file/D_Dark_Blue-1.svg"
                  alt="Doctolib Logo"
                  className="h-6 w-auto pr-2"
                />
                {t('appointment')}
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
