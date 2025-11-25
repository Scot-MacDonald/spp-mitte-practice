'use client'

import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { Page } from '@/payload-types'

// Define Media object type
type MediaObject = {
  alt?: string
  filename?: string | null
}

// Props: override image type to include MediaObject | string | null
type Props = Extract<Page['layout'][0], { blockType: 'textBildBlock' }> & {
  id?: string
  image?: MediaObject | string | null
  className?: string
}

// Type guard
const isMediaObject = (img: unknown): img is MediaObject =>
  typeof img === 'object' && img !== null && 'filename' in (img as MediaObject)

export const TextBildBlock: React.FC<Props> = ({ title, richText, image, className }) => {
  const pathname = usePathname()
  const t = useTranslations()

  // Build src URL for Payload media
  const imageSrc =
    image && typeof image !== 'string' && image.filename
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/${image.filename}`
      : typeof image === 'string'
        ? image
        : undefined

  const imageAlt = isMediaObject(image) ? (image as MediaObject).alt || '' : ''

  return (
    <div className={className}>
      {/* Title */}
      <div className="page-with-header mb-[70px] sm:mb-[14px]">
        {pathname === '/' ? (
          <h2 className="page-header px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
            {title}
          </h2>
        ) : (
          <h1 className="page-header px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
            {title}
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        {/* Text */}
        <div className="md:col-span-12 lg:col-span-6 p-4 sm:p-8 order-2 lg:order-1">
          {richText && <RichText content={richText} />}
          <Link
            href="https://www.doctolib.de/praxis/berlin/schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor?utm_campaign=website-button&utm_source=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor-website-button&utm_medium=referral&utm_content=option-8&utm_term=schwerpunktpraxis-fuer-infektionsmedizin-am-oranienburger-tor"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#cde3c5] text-[#00264c] text-lg inline-flex items-center font-semibold px-4 py-2 rounded mt-6"
          >
            <img
              src="/api/media/file/D_Dark_Blue-1.svg"
              alt="Doctolib Logo"
              className="h-6 w-auto pr-2"
            />
            {t('appointment')}
          </Link>
        </div>

        {/* Image */}
        <div className="md:col-span-12 lg:col-span-6 order-1 lg:order-2">
          {imageSrc && (
            <div
              className="sticky top-[6.5rem] p-4 sm:p-8 flex justify-center"
              style={{ maxHeight: 'calc(100vh - 6.5rem)' }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
