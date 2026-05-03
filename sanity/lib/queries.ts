import { groq } from 'next-sanity'

// ── Product projections ─────────────────────────────────────────────
const productProjection = `{
  _id,
  name,
  slug,
  price,
  discountPrice,
  description,
  stock,
  isNew,
  isBestseller,
  "images": images[].asset->url,
  "category": categories[0]->name,
  "reviews": *[_type == "review" && product._ref == ^._id && isApproved == true] | order(_createdAt desc) {
    _id,
    name,
    rating,
    comment,
    _createdAt
  }
}`

// Fetch all products (newest first)
export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) ${productProjection}
`

// Fetch a single product by Sanity _id
export const productByIdQuery = groq`
  *[_type == "product" && _id == $id][0] ${productProjection}
`

// Fetch a single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] ${productProjection}
`

// Fetch products marked as bestsellers
export const featuredProductsQuery = groq`
  *[_type == "product" && isBestseller == true] | order(_createdAt desc) [0...8] ${productProjection}
`

// Fetch products marked as new arrivals
export const newArrivalsQuery = groq`
  *[_type == "product" && isNew == true] | order(_createdAt desc) [0...8] ${productProjection}
`

// Fetch all categories with computed item count & representative image
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "itemCount": count(*[_type == "product" && references(^._id)]),
    "image": *[_type == "product" && references(^._id)] | order(_createdAt desc) [0].images[0].asset->url
  }
`

// Fetch products by category name
export const productsByCategoryQuery = groq`
  *[_type == "product" && $categoryName in categories[]->name] | order(_createdAt desc) ${productProjection}
`

// Fetch all active coupons
export const allCouponsQuery = groq`
  *[_type == "coupon" && isActive == true] {
    _id,
    code,
    discountType,
    discountValue,
    usageLimit,
    usedCount
  }
`
