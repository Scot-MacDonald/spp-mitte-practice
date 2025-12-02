'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'

import { cn } from 'src/utilities/cn'
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
    fetchPriority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  // Pull from Payload resource
  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  // -----------------------------
  // ✔ FIXED SIZES LOGIC
  // -----------------------------
  let sizes: string

  if (sizeFromProps) {
    // 1. Explicit override passed by parent
    sizes = sizeFromProps
  } else if (fill) {
    // 2. Full-bleed images (hero, banners)
    // These always span full viewport width → best performance & Lighthouse compliant
    sizes = '100vw'
  } else {
    // 3. Non-fill images → responsive container widths
    // This replaces your old incorrect breakpoint logic
    sizes =
      Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) 100vw`)
        .join(', ') + ', 100vw'
  }

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
      fetchPriority={fetchPriority}
      quality={60} // ✔ improved compression, fixes PSI warnings
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        onLoadFromProps?.()
      }}
    />
  )
}
