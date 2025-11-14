'use client'

import React, { useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Media } from '@/components/Media'

type EmblaSliderProps = {
  images: {
    image: string
    alt?: string
  }[]
  intervalMs?: number
}

export const EmblaSlider: React.FC<EmblaSliderProps> = ({ images, intervalMs = 4000 }) => {
  const [current, setCurrent] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: false,
    skipSnaps: true,
  })

  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (!emblaApi) return

    const handlePointerDown = (event: PointerEvent) => {
      startX.current = event.clientX
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (startX.current === null) return

      const endX = event.clientX
      const delta = endX - startX.current

      if (delta > 10) {
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
      } else if (delta < -10) {
        setCurrent((prev) => (prev + 1) % images.length)
      }

      startX.current = null
    }

    const node = emblaApi.containerNode()
    node.addEventListener('pointerdown', handlePointerDown)
    node.addEventListener('pointerup', handlePointerUp)

    return () => {
      node.removeEventListener('pointerdown', handlePointerDown)
      node.removeEventListener('pointerup', handlePointerUp)
    }
  }, [emblaApi, images.length])

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [images.length, intervalMs])

  return (
    <div ref={emblaRef} className="relative w-full aspect-[4/3] overflow-hidden  shadow-md">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Media
            resource={img.image}
            alt={img.alt}
            className="w-full h-full object-cover"
            size="100vw"
          />
        </div>
      ))}
    </div>
  )
}
