import jwt from 'jsonwebtoken'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionSlug, TypedLocale } from 'payload'
import { NextRequest } from 'next/server'

const PAYLOAD_TOKEN_COOKIE = 'payload-token'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const token = req.cookies.get(PAYLOAD_TOKEN_COOKIE)?.value
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  // ❌ Check the secret if you’re using one
  if (previewSecret && previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug) {
    return new Response('Missing required query parameters', { status: 400 })
  }

  if (!token) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  let user
  try {
    user = jwt.verify(token, payload.secret)
  } catch (err) {
    payload.logger.error('Error verifying token for live preview:', err)
    return new Response('Invalid token', { status: 403 })
  }

  if (!user) {
    const draft = await draftMode()
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Verify the document exists
  try {
    const locale = path.split('/')[1] as TypedLocale
    const docs = await payload.find({
      collection,
      draft: true,
      locale,
      where: { slug: { equals: slug } },
    })

    if (!docs.docs.length) {
      return new Response('Document not found', { status: 404 })
    }
  } catch (err) {
    payload.logger.error('Error checking document for live preview:', err)
    return new Response('Error checking document', { status: 500 })
  }

  // Redirect to the actual page
  return redirect(path)
}
