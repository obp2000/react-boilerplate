// import { City } from '@/app/customers/cities/city'
// import { DefaultedDate, OptionalDate } from '@/app/form/fields'
import {
  integer,
  object,
  optional,
  size,
  string,
  any
} from 'superstruct'

export const Customer = object({
  id: optional(integer()),
  nick: size(string(), 1, 255),
  name: optional(string()),
  // city: City,
  // city1: any(),
  cityId: integer(),
  address: optional(string()),
})
