'use client'

import type { Customer, CustomerSubmitValues } from '@/interfaces/customers'

export const modFormValues = ({
  id,
  city,
  created_at,
  updated_at,
  ...values
}: Customer): CustomerSubmitValues => {
  if (city) {
    values.city_id = city.id
  }
  return values
}

export const validatedFields = {
  notBlank: ['nick'],
}
