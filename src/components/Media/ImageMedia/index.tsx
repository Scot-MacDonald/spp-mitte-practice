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
    fetchPriority, // ⭐ NEW
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource
    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  // ⭐ Better sizes: hero images use 100vw, others use breakpoints
  const sizes = sizeFromProps
    ? sizeFromProps
    : fill
      ? '100vw'
      : Object.entries(breakpoints)
          .map(([, value]) => `(max-width: ${value}px) ${value}px`)
          .join(', ') + ', 100vw'

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      src={src}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority} // ⭐ NEW FOR LCP
      loading={priority ? 'eager' : 'lazy'}
      quality={60}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        onLoadFromProps?.()
      }}
    />
  )
}
