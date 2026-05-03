import { defineType, defineField } from 'sanity'

export const couponType = defineType({
  name: 'coupon',
  title: 'Coupons',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage (%)', value: 'percentage' },
          { title: 'Fixed Amount (EGP)', value: 'fixed' },
        ],
      },
      initialValue: 'percentage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'usageLimit',
      title: 'Usage Limit',
      type: 'number',
      description: 'Maximum number of times this coupon can be used. Leave empty for unlimited.',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'usedCount',
      title: 'Used Count',
      type: 'number',
      description: 'Number of times this coupon has been used.',
      initialValue: 0,
      readOnly: true,
    }),
  ],
})
