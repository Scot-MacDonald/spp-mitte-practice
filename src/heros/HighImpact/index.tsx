'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

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
  const [currentMedia, setCurrentMedia] = useState(mediaDay)

  useEffect(() => {
    setHeaderTheme('dark')

    const updateMedia = () => {
      const hour = new Date().getHours()
      if (hour >= 20 || hour < 5) {
        setCurrentMedia(mediaNight)
      } else {
        setCurrentMedia(mediaDay)
      }
    }

    updateMedia()
    const interval = setInterval(updateMedia, 60 * 1000)
    return () => clearInterval(interval)
  }, [setHeaderTheme, mediaDay, mediaNight])

  return (
    <div className="relative w-full min-h-[60vh] select-none">
      {/* Hero Image */}
      {currentMedia && (
        <>
          <Media
            fill
            priority
            fetchPriority="high"
            size="100vw"
            imgClassName="object-cover -z-10 transition-opacity duration-1000"
            resource={currentMedia}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </>
      )}

      {/* Hero Content overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-end pl-4 md:pl-8 pb-8 z-10 max-w-[44rem]">
        <div>
          {richText && (
            <RichText
              className="mb-6 text-white prose-hero prose-headings:text-white"
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
    </div>
  )
}
