'use client'

import React from 'react'
import { EmblaSlider } from '@/components/EmblaSlider'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type Props = {
  title: string
  richText?: any
  images?: {
    image: string
    alt?: string
  }[]
}

export const SliderBlock: React.FC<Props> = ({ title, richText, images = [] }) => {
  const safeImages = Array.isArray(images) ? images : []

  const t = useTranslations()
  return (
    <div className="">
      <div className="page-with-header mb-[20px] md:mb-[50px]">
        <h2 className="page-header px-4 sm:px-4 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <svg
            className="hidden xl:block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#7eb36a" strokeWidth="2">
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="12" x2="12" y1="3" y2="21" className="AccordionVerticalLine" />
            </g>
          </svg>
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        {/* Text */}
        <div className="md:col-span-12 lg:col-span-6 p-4 sm:pl-8 order-2 lg:order-1">
          <div className="lg:border-r lg:border-border h-full">
            <div className="mb-2 pr-4">{richText && <RichText content={richText} />}</div>
            <div>
              <Link
                href="/"
                className="bg-[#cde3c5] text-[#00264c] text-lg inline-flex items-center font-semibold px-4 py-2 rounded"
              >
                <img
                  src="/api/media/file/D_Dark_Blue-1.svg"
                  alt="Doctolib Logo"
                  className="h-6 w-auto pr-2"
                />
                {t('appointment')}
              </Link>
            </div>
          </div>
        </div>

        {/* Image / Slider */}
        <div className="md:col-span-12 lg:col-span-6 order-1 lg:order-2">
          <div
            className="sticky top-[5rem] px-4 py-0 sm:p-4"
            style={{ maxHeight: 'calc(100vh - 5rem)' }}
          >
            <div className="h-full flex flex-col items-center justify-center">
              {safeImages.length > 0 && <EmblaSlider images={safeImages} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
