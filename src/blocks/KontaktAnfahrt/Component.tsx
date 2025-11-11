'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import RichText from '@/components/RichText' // Adjust path as needed

const Map = dynamic(() => import('@/blocks/KontaktAnfahrt/Map'), { ssr: false })

type TransportType = 'u-bahn' | 's-bahn' | 'tram' | 'bus' | 'other'

type Props = {
  heading: string
  content?: any // rich text
  transports: {
    title: string
    type: TransportType
    lines: { line: string }[]
  }[]
  lat: number
  lng: number
  secondIconUrl?: string
  thirdIconUrl?: string
  fourthIconUrl?: string
  fifthIconUrl?: string
  sixthIconUrl?: string
  seventhIconUrl?: string
}

export default function KontaktAnfahrtBlock({
  heading,
  content,
  transports,
  lat,
  lng,
  secondIconUrl,
  thirdIconUrl,
  fourthIconUrl,
  fifthIconUrl,
  sixthIconUrl,
  seventhIconUrl,
}: Props) {
  const getIconForType = (type: TransportType) => {
    switch (type) {
      case 's-bahn':
        return secondIconUrl || '/media/S-Bahn-Logo.webp'
      case 'u-bahn':
        return thirdIconUrl || '/media/U-Bahn.svg'
      case 'tram':
        return fifthIconUrl || '/media/Tram-Logo.svg'
      case 'bus':
        return sixthIconUrl || '/media/Bus-Logo.svg'
      default:
        return fourthIconUrl || '/media/spp_logo.png'
    }
  }

  return (
    <>
      <div className="page-with-header mb-[20px] md:mb-[50px]">
        <h2 className="page-header px-4 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <svg
            className="hidden lg:block"
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
          {heading}
        </h2>
      </div>

      <div className="w-full grid grid-cols-12">
        {/* Left side: rich text content */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-4 p-4 lg:p-8 lg:border-r border-border">
          {content && <RichText content={content} />}
        </div>

        {/* Right side: transports grid */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-8 p-4 lg:p-8 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
          {transports.map((transport, i) => (
            <div key={i} className="border rounded-lg p-4 flex flex-col">
              <div className="flex items-center mb-1 gap-2">
                <img
                  src={getIconForType(transport.type)}
                  alt={transport.type}
                  className="w-6 h-6"
                />
                <h2 className="text-xl font-bold">{transport.title}</h2>
              </div>
              {transport.lines.map((l, j) => (
                <span key={j}>{l.line}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-4 lg:px-8">
        <Map
          lat={lat}
          lng={lng}
          secondIconUrl={secondIconUrl}
          thirdIconUrl={thirdIconUrl}
          fourthIconUrl={fourthIconUrl}
          fifthIconUrl={fifthIconUrl}
          sixthIconUrl={sixthIconUrl}
          seventhIconUrl={seventhIconUrl}
        />
      </div>
    </>
  )
}
