'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  mediaDay,
  mediaNight,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  // ❗ SSR-compatible: choose image BEFORE render, not in useEffect
  const hour = new Date().getHours()
  const currentMedia = hour >= 20 || hour < 5 ? mediaNight : mediaDay

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div className="relative flex items-end text-white" data-theme="dark">
      <div className="container-full pl-4 md:pl-8 mb-8 z-10 relative">
        <div className="max-w-[44rem]">
          {richText && (
            <RichText
              className="mb-6 text-white prose-hero"
              content={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* LCP IMAGE */}
      <div className="min-h-[60vh] mt-14 select-none relative w-full">
        {currentMedia && (
          <>
            <Media
              fill
              imgClassName="-z-10 object-cover transition-opacity duration-1000"
              priority
              fetchPriority="high" // ⭐ required by PSI
              size="100vw" // ⭐ best for hero images
              resource={currentMedia}
            />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent" />
          </>
        )}
      </div>
    </div>
  )
}
