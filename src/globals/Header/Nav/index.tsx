'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { CMSLink } from '@/components/Link'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface HeaderNavProps {
  header: HeaderType
  onClickLink?: () => void
}
const t = useTranslations()
export const HeaderNav: React.FC<HeaderNavProps> = ({ header, onClickLink }) => {
  const navItems = header?.navItems || []
  const t = useTranslations()

  return (
    <nav className="flex flex-col xl:flex-row gap-3 text-[16px] xl:items-center ">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} onClick={onClickLink}>
            <CMSLink {...link} appearance="link" className="text-[16px] text-black" />
          </div>
        )
      })}
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
      <LocaleSwitcher />
    </nav>
  )
}
