"use server"

import { client } from '@/sanity/lib/client'
import { allCouponsQuery } from '@/sanity/lib/queries'
import type { Coupon } from '@/sanity/lib/sanity-fetch'

export async function validateCouponAction(code: string): Promise<Coupon | null> {
  const coupons: Coupon[] = await client.fetch(allCouponsQuery, {}, { cache: 'no-store' })
  
  if (!coupons || coupons.length === 0) return null
  
  const found = coupons.find(c => c.code && c.code.toUpperCase() === code.toUpperCase())
  
  if (!found) return null

  // Check usage limit
  if (found.usageLimit && (found.usedCount || 0) >= found.usageLimit) {
    return null // Treat as invalid or expired if limit is reached
  }

  return found
}
