import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

import type { Doctor } from '../../../payload-types'

export const revalidateDoctor: CollectionAfterChangeHook<Doctor> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/doctors/${doc.slug}`

    payload.logger.info(`Revalidating doctor at path: ${path}`)

    revalidatePath(path)
  }

  // If the doctor was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/doctors/${previousDoc.slug}`

    payload.logger.info(`Revalidating old doctor at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
