import type { Metadata } from 'next/types'

import { CollectionDoctor } from '@/components/CollectionDoctor'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { getTranslations } from 'next-intl/server'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params }: Args) {
  const { locale = 'en' } = await params
  const t = await getTranslations()
  const payload = await getPayload({ config: configPromise })

  const doctors = await payload.find({
    collection: 'doctors', // <-- changed from 'posts'
    locale,
    depth: 1,
    limit: 12,
    overrideAccess: false,
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
          collection="doctors" // <-- changed from 'posts'
          currentPage={doctors.page}
          limit={12}
          totalDocs={doctors.totalDocs}
        />
      </div>
      <CollectionDoctor doctors={doctors.docs} /> {/* <-- updated component */}
      <div className="container">
        {doctors.totalPages > 1 && doctors.page && (
          <Pagination page={doctors.page} totalPages={doctors.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Doctors`, // <-- updated title
  }
}
