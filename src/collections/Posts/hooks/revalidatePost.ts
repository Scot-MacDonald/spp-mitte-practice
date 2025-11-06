import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Post } from '../../../payload-types'
import { routing } from '@/i18n/routing'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const locales = routing?.locales ?? [routing.defaultLocale]

  if (doc._status === 'published') {
    locales.forEach((locale) => {
      const path =
        locale === routing.defaultLocale ? `/posts/${doc.slug}` : `/${locale}/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)
      revalidatePath(path)
    })
  }

  // Revalidate old post if it was previously published
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    locales.forEach((locale) => {
      const oldPath =
        locale === routing.defaultLocale
          ? `/posts/${previousDoc.slug}`
          : `/${locale}/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)
      revalidatePath(oldPath)
    })
  }

  return doc
}
