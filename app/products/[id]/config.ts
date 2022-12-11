'use client'

import type { Product, ProductSubmitValues } from '@/interfaces/products'
import { calculator } from './calculator'

export const modFormValues = ({
  id,
  product_type,
  get_product_type_display,
  get_threads_display,
  get_contents_display,
  created_at,
  updated_at,
  consts,
  density_for_count,
  meters_in_roll,
  prices,
  imageOrig,
  ...values
}: Product): ProductSubmitValues => {
  if (product_type) {
    values.product_type_id = product_type
  }
  return values
}

export const decorators = [calculator]

export const validatedFields = {
  notBlank: ['name', 'price'],
}
