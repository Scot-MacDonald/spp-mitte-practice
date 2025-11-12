import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Doctor } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateDoctor: CollectionAfterChangeHook<Doctor> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const locales = routing?.locales ?? [routing.defaultLocale]

  // Revalidate the new doctor page if it's published
  if (doc._status === 'published') {
    locales.forEach((locale) => {
      const path =
        locale === routing.defaultLocale ? `/doctors/${doc.slug}` : `/${locale}/doctors/${doc.slug}`

      payload.logger.info(`Revalidating doctor at path: ${path}`)
      revalidatePath(path)
    })
  }

  // Revalidate the old doctor page if it was previously published
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    locales.forEach((locale) => {
      const oldPath =
        locale === routing.defaultLocale
          ? `/doctors/${previousDoc.slug}`
          : `/${locale}/doctors/${previousDoc.slug}`

      payload.logger.info(`Revalidating old doctor at path: ${oldPath}`)
      revalidatePath(oldPath)
    })
  }

  return doc
}
