import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'
import { projectId, dataset, apiVersion } from '../../../sanity/env'

export const dynamic = 'force-dynamic'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { name, rating, comment, productId } = await req.json()

    if (!name || !rating || !comment || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newReview = await client.create({
      _type: 'review',
      name,
      rating: Number(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId,
      },
      isApproved: true, // Set to true for immediate appearance
    })

    return NextResponse.json({ message: 'Review submitted for moderation', review: newReview })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
