import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Page } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const locales = routing?.locales ?? [routing.defaultLocale]

  // Revalidate the current page for all locales
  if (doc._status === 'published') {
    locales.forEach((locale) => {
      const path =
        doc.slug === 'home'
          ? locale === routing.defaultLocale
            ? '/'
            : `/${locale}`
          : locale === routing.defaultLocale
            ? `/${doc.slug}`
            : `/${locale}/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)
      revalidatePath(path)
    })
  }

  // Revalidate old page if it was previously published
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    locales.forEach((locale) => {
      const oldPath =
        previousDoc.slug === 'home'
          ? locale === routing.defaultLocale
            ? '/'
            : `/${locale}`
          : locale === routing.defaultLocale
            ? `/${previousDoc.slug}`
            : `/${locale}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)
      revalidatePath(oldPath)
    })
  }

  return doc
}
