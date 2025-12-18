'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'
import { cn } from 'src/utilities/cn'

import type { Props as MediaProps } from '../types'

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    fetchPriority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  // Pull from Payload media if available
  if (!src && resource && typeof resource === 'object') {
    const { alt: resourceAlt, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth ?? undefined
    height = fullHeight ?? undefined
    alt = resourceAlt || alt

    if (url) {
      src = url
    }
  }

  const sizes = sizeFromProps || '(max-width: 768px) 100vw, 1200px'
  const imageQuality = priority ? 70 : 55
  const finalAlt = alt || 'Image'

  return (
    <NextImage
      alt={finalAlt}
      className={cn(imgClassName)}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      src={src}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      quality={imageQuality}
      onClick={onClick}
      onLoad={onLoadFromProps}
    />
  )
}
