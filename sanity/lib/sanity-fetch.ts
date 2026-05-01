import { client } from './client'
import {
  allProductsQuery,
  productByIdQuery,
  featuredProductsQuery,
  newArrivalsQuery,
  allCategoriesQuery,
} from './queries'
import type { Product } from '@/app/data/products'
import type { Category } from '@/app/data/categories'

// ── Raw types coming back from Sanity GROQ ──────────────────────────
interface SanityProduct {
  _id: string
  name: string
  slug: { current: string } | null
  price: number
  discountPrice?: number | null
  description: string
  stock: number
  isNew?: boolean
  isBestseller?: boolean
  images: (string | null)[]
  category: string | null
}

interface SanityCategory {
  _id: string
  name: string
  slug: string | null
  itemCount: number
  image: string | null
}

// ── Deterministic "random" helpers (stable across renders) ──────────
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function deterministicRating(id: string): number {
  return +(4.0 + (hashCode(id) % 10) / 10).toFixed(1)
}

function deterministicReviewCount(id: string): number {
  return 30 + (hashCode(id + '_rc') % 200)
}

// ── Default color palette when product has no colors ────────────────
const DEFAULT_COLORS = ['#D4AF37', '#C0C0C0', '#F4A3B5']
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'

// ── Transform a Sanity product into the frontend Product shape ──────
function transformProduct(p: SanityProduct): Product {
  let badge: Product['badge'] = undefined
  if (p.isBestseller) badge = 'bestseller'
  else if (p.isNew) badge = 'new'
  else if (p.discountPrice && p.discountPrice < p.price) badge = 'sale'

  const cleanImages = (p.images ?? []).filter(Boolean) as string[]

  return {
    id: p._id,
    name: p.name,
    price: p.price,
    salePrice: p.discountPrice && p.discountPrice < p.price ? p.discountPrice : undefined,
    images: cleanImages.length > 0 ? cleanImages : [FALLBACK_IMAGE],
    category: p.category || 'Uncategorized',
    colors: DEFAULT_COLORS,
    description: p.description || '',
    rating: deterministicRating(p._id),
    reviewCount: deterministicReviewCount(p._id),
    badge,
    inStock: (p.stock ?? 0) > 0,
  }
}

// ── Transform a Sanity category into the frontend Category shape ────
function transformCategory(c: SanityCategory): Category {
  return {
    id: c._id,
    name: c.name,
    slug: c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    image: c.image || FALLBACK_IMAGE,
    itemCount: c.itemCount ?? 0,
  }
}

// ── Public fetch functions ──────────────────────────────────────────

export async function fetchAllProducts(): Promise<Product[]> {
  const raw: SanityProduct[] = await client.fetch(allProductsQuery)
  return (raw ?? []).map(transformProduct)
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const raw: SanityProduct | null = await client.fetch(productByIdQuery, { id })
  return raw ? transformProduct(raw) : null
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const raw: SanityProduct[] = await client.fetch(featuredProductsQuery)
  // If no products are marked as bestseller, fall back to the first 4
  if (!raw || raw.length === 0) {
    const all = await fetchAllProducts()
    return all.slice(0, 4)
  }
  return raw.map(transformProduct)
}

export async function fetchNewArrivals(): Promise<Product[]> {
  const raw: SanityProduct[] = await client.fetch(newArrivalsQuery)
  // If no products are marked as new, fall back to the latest 4
  if (!raw || raw.length === 0) {
    const all = await fetchAllProducts()
    return all.slice(0, 4)
  }
  return raw.map(transformProduct)
}

export async function fetchAllCategories(): Promise<Category[]> {
  const raw: SanityCategory[] = await client.fetch(allCategoriesQuery)
  return (raw ?? []).map(transformCategory)
}
