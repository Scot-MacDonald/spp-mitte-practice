import type { Metadata } from 'next/types'

import { CollectionDoctor } from '@/components/CollectionDoctor'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const t = await getTranslations()

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const doctors = await payload.find({
    collection: 'doctors',
    depth: 1,
    limit: 12,
    locale,
    page: sanitizedPageNumber,
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Doctors Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const doctors = await payload.find({
    collection: 'doctors',
    depth: 0,
    limit: 10,
    draft: false,
    overrideAccess: false,
  })

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= doctors.totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
