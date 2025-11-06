import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Media } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidateMedia: CollectionAfterChangeHook<Media> = ({ doc, req: { payload } }) => {
  const locales = routing?.locales ?? [routing.defaultLocale]

  locales.forEach((locale) => {
    const path =
      locale === routing.defaultLocale
        ? `/media/${doc.filename}`
        : `/${locale}/media/${doc.filename}`

    payload.logger.info(`Revalidating media at path: ${path}`)
    revalidatePath(path)
  })

  return doc
}
