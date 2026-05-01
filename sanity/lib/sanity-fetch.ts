import { client } from './client'
import {
  allProductsQuery,
  productByIdQuery,
  featuredProductsQuery,
  newArrivalsQuery,
  allCategoriesQuery,
  allCouponsQuery,
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
  reviews?: {
    _id: string
    name: string
    rating: number
    comment: string
    _createdAt: string
  }[]
}

interface SanityCategory {
  _id: string
  name: string
  slug: string | null
  itemCount: number
  image: string | null
}

export interface Coupon {
  _id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'

// ── Transform a Sanity product into the frontend Product shape ──────
function transformProduct(p: SanityProduct): Product {
  // Global price adjustment: Add 85 EGP to all products
  const adjustedPrice = p.price + 85;
  const adjustedSalePrice = p.discountPrice ? p.discountPrice + 85 : undefined;

  let badge: Product['badge'] = undefined;
  if (p.isBestseller) badge = 'bestseller';
  else if (p.isNew) badge = 'new';
  else if (adjustedSalePrice && adjustedSalePrice < adjustedPrice) badge = 'sale';

  const cleanImages = (p.images ?? []).filter(Boolean) as string[];

  return {
    id: p._id,
    name: p.name,
    price: adjustedPrice,
    salePrice: adjustedSalePrice && adjustedSalePrice < adjustedPrice ? adjustedSalePrice : undefined,
    images: cleanImages.length > 0 ? cleanImages : [FALLBACK_IMAGE],
    category: p.category || 'Uncategorized',
    description: p.description || '',
    badge,
    inStock: (p.stock ?? 0) > 0,
    reviews: p.reviews || [],
  };
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

export async function fetchAllCoupons(): Promise<Coupon[]> {
  return await client.fetch(allCouponsQuery)
}
