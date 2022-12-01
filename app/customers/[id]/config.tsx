'use client'

import type { Customer } from '@/interfaces/customers'

export const indexUrl = '/customers/'

export const modFormValues = ({
  id,
  city,
  created_at,
  updated_at,
  ...values
}: Customer): Partial<Customer> => {
  if (city) {
    values.city_id = city.id
  }
  return values
}

export const validatedFields = {
  notBlank: ['nick'],
}
