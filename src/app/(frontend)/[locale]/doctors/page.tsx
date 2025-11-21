// app/[local]/doctors/page.tsx
export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

import { CollectionDoctor } from '@/components/CollectionDoctor'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import configPromise from '@payload-config'

type Args = { params: Promise<{ locale: TypedLocale }> }

export default async function DoctorsPage({ params }: Args) {
  const { locale = 'en' } = await params
  const t = await getTranslations()

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const doctors = await payload.find({
    collection: 'doctors',
    locale,
    depth: 1,
    limit: 12,
    overrideAccess: draft,
    draft,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{t('doctors')}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="doctors"
          currentPage={doctors.page}
          limit={12}
          totalDocs={doctors.totalDocs}
        />
      </div>

      <CollectionDoctor doctors={doctors.docs} />

      <div className="container">
        {doctors.totalPages > 1 && doctors.page && (
          <Pagination page={doctors.page} totalPages={doctors.totalPages} />
        )}
      </div>
    </div>
  )
}
