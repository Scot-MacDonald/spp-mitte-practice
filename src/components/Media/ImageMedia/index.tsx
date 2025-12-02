'use client'

import type { StaticImageData } from 'next/image'
import { cn } from 'src/utilities/cn'
import NextImage from 'next/image'
import React from 'react'
import type { Props as MediaProps } from '../types'
import cssVariables from '@/cssVariables'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    fetchPriority, // ← allow this now
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    width = resource.width!
    height = resource.height!
    alt = resource.alt
    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${resource.url}`
  }

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={onLoadFromProps}
      priority={priority}
      fetchPriority={fetchPriority}
      quality={60}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
    />
  )
}
