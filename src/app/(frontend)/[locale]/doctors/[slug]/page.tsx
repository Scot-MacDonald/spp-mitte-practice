// app/[local]/doctors/[slug]/page.tsx
export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { TypedLocale } from 'payload'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from '../page.client'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'

import type { Metadata } from 'next/types'

import type { Doctor } from '@/payload-types'

type Args = { params: Promise<{ slug?: string; locale?: TypedLocale }> }

export default async function DoctorPage({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'en' } = await paramsPromise
  const url = `/doctors/${slug}`

  const doctor = await queryDoctor({ slug, locale })
  if (!doctor) return <PayloadRedirects url={url} />

  const metaImage = doctor.meta?.image

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <div className="page-with-header mb-[20px] md:mb-[50px] mx-auto">
        <h1 className="page-header text-3xl font-bold px-4 flex items-center gap-2">
          {doctor.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 px-4 lg:px-6">
        {metaImage && (
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <Media resource={metaImage} size="480px" />
          </div>
        )}
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

const queryDoctor = async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'doctors',
    locale,
    draft,
    limit: 1,
    overrideAccess: draft,
    where: { slug: { equals: slug } }, // remove _status filter
  })

  return result.docs?.[0] || null
}
