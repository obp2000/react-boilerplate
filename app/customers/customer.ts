import { City } from '@/app/customers/cities/city'
import { integer, object, optional, size, string, nullable } from 'superstruct'

export const Customer = object({
  id: optional(integer()),
  nick: size(string(), 1, 255),
  name: optional(nullable(string())),
  city: City,
  address: optional(nullable(string())),
})
