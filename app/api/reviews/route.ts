import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01',
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
