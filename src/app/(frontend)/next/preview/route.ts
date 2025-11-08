import jwt from 'jsonwebtoken'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionSlug, TypedLocale } from 'payload'
import { NextRequest } from 'next/server'

const payloadToken = 'payload-token'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const token = req.cookies.get(payloadToken)?.value
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug) {
    return new Response('Missing required query parameters', { status: 404 })
  }

  if (!token) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for internal previews', { status: 500 })
  }

  let user
  try {
    user = jwt.verify(token, payload.secret)
  } catch (error) {
    payload.logger.error('Error verifying token for live preview:', error)
  }

  // ✅ await draftMode()
  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // Verify the given slug exists
  try {
    const docs = await payload.find({
      collection,
      draft: true,
      locale: path.split('/')[1] as TypedLocale,
      where: { slug: { equals: slug } },
    })

    if (!docs.docs.length) {
      return new Response('Document not found', { status: 404 })
    }
  } catch (error) {
    payload.logger.error('Error checking document for live preview:', error)
  }

  draft.enable()
  redirect(path)
  return new Response(null, { status: 200 })
}
