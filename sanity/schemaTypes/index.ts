import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './product'
import { categoryType } from './category'
import { couponType } from './coupon'
import { reviewType } from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, couponType, reviewType],
}
