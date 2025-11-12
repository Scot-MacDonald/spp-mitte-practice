import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Doctor } from '@/payload-types'

import { CardRelated } from '@/components/CardRelated'

export type RelatedDoctorsProps = {
  className?: string
  docs?: Doctor[]
  introContent?: any
}

export const RelatedDoctors: React.FC<RelatedDoctorsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <CardRelated data-cursor-hover key={index} doc={doc} relationTo="doctors" />
        })}
      </div>
    </div>
  )
}
