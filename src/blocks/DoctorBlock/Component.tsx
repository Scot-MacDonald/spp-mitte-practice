import type { Doctor } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionDoctor } from '@/components/CollectionDoctor'
import { TypedLocale } from 'payload'

// Define DoctorBlockProps locally
export type DoctorBlockProps = {
  title?: string
  introContent?: any // replace 'any' with RichText content type if available
  populateBy?: 'collection' | 'selection'
  categories?: (string | { id: string })[]
  limit?: number
  selectedDocs?: { value: Doctor }[]
}

export const DoctorBlock: React.FC<
  DoctorBlockProps & {
    id?: string
    locale: TypedLocale
  }
> = async (props) => {
  const {
    id,
    title,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    locale,
  } = props

  const limit = limitFromProps || 3

  let doctors: Doctor[] = []

  // Fetch doctors from Payload
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) =>
      typeof category === 'object' ? category.id : category,
    )

    const fetchedDoctors = await payload.find({
      collection: 'doctors',
      depth: 1,
      locale,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    doctors = fetchedDoctors.docs
  } else if (selectedDocs?.length) {
    doctors = selectedDocs
      .map((doctor) => (typeof doctor.value === 'object' ? doctor.value : null))
      .filter(Boolean) as Doctor[]
  }

  return (
    <div className="my-16" id={id ? `block-${id}` : undefined}>
      {title && (
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
                <line x1="12" x2="12" y1="3" y2="21" />
              </g>
            </svg>
            {title}
          </h2>
        </div>
      )}

      {/* Intro content */}
      {introContent && (
        <div className="container mb-0 md:mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}

      {/* Doctor cards */}
      <CollectionDoctor doctors={doctors} />
    </div>
  )
}
