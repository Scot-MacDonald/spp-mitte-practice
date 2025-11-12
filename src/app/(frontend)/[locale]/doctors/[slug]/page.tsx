import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { Doctor } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { routing } from '@/i18n/routing'

// ✅ Allow dynamic fallback so build won't fail for missing slugs
export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const doctors = await payload.find({
    collection: 'doctors',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  // ✅ Filter out any doctors without valid slugs to avoid build errors
  const validDoctors = doctors.docs.filter(
    (doc) => typeof doc.slug === 'string' && doc.slug.trim().length > 0,
  )

  if (validDoctors.length < doctors.docs.length) {
    console.warn(
      `⚠️ Skipping ${doctors.docs.length - validDoctors.length} doctor(s) missing slug(s)`,
    )
  }

  return validDoctors.flatMap(({ slug }) =>
    routing.locales.map((locale) => ({
      slug,
      locale,
    })),
  )
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function Doctor({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = `/doctors/${slug}`
  const doctor = await queryDoctor({ slug, locale })

  if (!doctor) return <PayloadRedirects url={url} />

  const metaImage = doctor.meta?.image

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* ✅ Doctor name header */}
      <div className="page-with-header mb-[20px] md:mb-[50px] mx-auto">
        <h1 className="page-header text-3xl font-bold px-4 flex items-center gap-2">
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
          {doctor.title}
        </h1>
        {/* <p className="text-gray-600 mt-4 max-w-2xl px-4 mx-auto lg:mx-0">
          {doctor.meta?.description}
        </p> */}
      </div>

      {/* Main content flexed */}
      <div className="flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-6">
        {/* Left: Image */}
        {metaImage && (
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <Media resource={metaImage} size="480px" />
          </div>
        )}

        {/* Right: RichText */}
        <div className="w-full lg:w-2/3">
          <RichText content={doctor.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'en' } = await paramsPromise
  const doctor = await queryDoctor({ slug, locale })
  return generateMeta({ doc: doctor })
}

const queryDoctor = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'doctors',
    draft,
    limit: 1,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs?.[0] || null
})
