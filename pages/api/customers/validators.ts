import { Customer } from '@/app/customers/customer'
import type { NextApiRequest } from 'next'
import { assert } from 'superstruct'

export function validate({
  body: {
    nick,
    name = '',
    address = '',
    city,
  } }: NextApiRequest) {
  const data = {
    nick,
    name,
    address,
    city,
  }
  assert(data, Customer)
  return data
}
