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

  // Determine safe initial media
  const getInitialMedia = () => {
    const now = new Date()
    const hour = now.getHours()

    if ((hour >= 20 || hour < 5) && mediaNight) return mediaNight
    if (mediaDay) return mediaDay
    // fallback if neither is available
    return mediaNight || mediaDay || ''
  }

  const [currentMedia, setCurrentMedia] = useState(getInitialMedia)

  useEffect(() => {
    setHeaderTheme('dark')

    const updateMedia = () => {
      const now = new Date()
      const hour = now.getHours()

      if ((hour >= 20 || hour < 5) && mediaNight) {
        setCurrentMedia(mediaNight)
      } else if (mediaDay) {
        setCurrentMedia(mediaDay)
      }
    }

    // Update every 1 minute to handle day/night switch
    const interval = setInterval(updateMedia, 60 * 1000)
    return () => clearInterval(interval)
  }, [setHeaderTheme, mediaDay, mediaNight])

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

      <div className="min-h-[60vh] mt-14 select-none relative">
        {currentMedia ? (
          <>
            <Media
              fill
              imgClassName="-z-10 object-cover transition-opacity duration-1000"
              priority
              resource={currentMedia}
            />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent" />
          </>
        ) : (
          // Optional fallback: simple colored div if no media is available
          <div className="absolute inset-0 bg-gray-800" />
        )}
      </div>
    </div>
  )
}
