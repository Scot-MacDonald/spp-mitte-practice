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
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    fetchPriority, // ⬅️ ADD THIS
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: resourceAlt, height: fullHeight, url, width: fullWidth } = resource
    width = fullWidth!
    height = fullHeight!
    alt = resourceAlt
    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  // Best for hero images & LCP
  const sizes = sizeFromProps || '100vw'

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      width={!fill ? width : undefined}
      src={src}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      quality={70}
      onClick={onClick}
      onLoad={onLoadFromProps}
    />
  )
}
