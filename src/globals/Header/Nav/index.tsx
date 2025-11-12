'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

import { useTranslations } from 'next-intl'

interface HeaderNavProps {
  header: HeaderType
  onClickLink?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ header, onClickLink }) => {
  const navItems = header?.navItems || []
  const t = useTranslations()

  return (
    <nav className="flex flex-col xl:flex-row gap-3 text-[16px] xl:items-center ">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-[16px] text-black onClick={onClickLink}"
          />
        )
      })}
      <LocaleSwitcher />
    </nav>
  )
}
