'use client'

import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Doctor } from '@/payload-types'
import { Media } from '@/components/Media'

const getMediaUrl = (metaImage: any) => {
  if (!metaImage) return null
  const version =
    (typeof metaImage === 'object' &&
      (metaImage.updatedAt || metaImage._updatedAt) &&
      new Date(metaImage.updatedAt || metaImage._updatedAt).getTime()) ||
    null

  if (typeof metaImage === 'string' && metaImage.startsWith('http')) {
    return version ? `${metaImage}?v=${version}` : metaImage
  }

  if (typeof metaImage === 'string') {
    return version ? `/api/media/file/${metaImage}?v=${version}` : `/api/media/file/${metaImage}`
  }

  if (typeof metaImage === 'object' && metaImage.url) {
    return version ? `${metaImage.url}?v=${version}` : metaImage.url
  }

  return null
}

export const CardDoctor: React.FC<{
  doc?: Doctor
  relationTo?: 'doctors'
  className?: string
  showCategories?: boolean
  title?: string
}> = ({ doc, relationTo = 'doctors', className, showCategories, title: titleFromProps }) => {
  const { slug, categories, title, meta } = doc || {}
  const { description, image: metaImage } = meta || {}
  const titleToUse = titleFromProps || title

  if (!slug) return null

  const href = `/${relationTo}/${slug}`
  const imageUrl = getMediaUrl(metaImage)

  return (
    <Link href={href} className={cn('block h-full', className)}>
      <article className="h-full flex flex-col border border-border rounded-lg p-4 transition-colors hover:bg-[rgba(126,179,106,0.1);]">
        <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          {!metaImage && <div className="text-sm text-gray-500">No image</div>}

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={titleToUse || 'Doctor image'}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
            />
          )}

          {metaImage && typeof metaImage === 'object' && !metaImage.url && (
            <Media resource={metaImage} size="360px" />
          )}
        </div>

        <div className="py-4 flex flex-col flex-grow">
          {showCategories && categories && categories.length > 0 && (
            <div className="uppercase text-sm mb-4 text-gray-500">
              {categories.map((category, idx) => (
                <Fragment key={idx}>
                  {(category as any).title || 'Untitled'}
                  {idx < categories.length - 1 && ', '}
                </Fragment>
              ))}
            </div>
          )}

          {titleToUse && <h3 className="text-base font-bold text-gray-700">{titleToUse}</h3>}

          {description && <p className="mt-1 text-sm text-gray-600 flex-grow">{description}</p>}
        </div>
      </article>
    </Link>
  )
}
