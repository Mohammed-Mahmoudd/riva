"use server"

import { client } from '@/sanity/lib/client'
import { allCouponsQuery } from '@/sanity/lib/queries'
import type { Coupon } from '@/sanity/lib/sanity-fetch'

export async function validateCouponAction(code: string): Promise<Coupon | null> {
  const coupons: Coupon[] = await client.fetch(allCouponsQuery)
  
  if (!coupons || coupons.length === 0) return null
  
  const found = coupons.find(c => c.code && c.code.toUpperCase() === code.toUpperCase())
  return found || null
}
