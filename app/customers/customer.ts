import { City } from '@/app/customers/cities/city'
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
  city: City,
  address: optional(string()),
})

export const CustomerApi = object({
  id: optional(integer()),
  nick: size(string(), 1, 255),
  name: optional(string()),
  cityId: integer(),
  address: optional(string()),
})

export const CustomerSelect = object({
  id: integer(),
  nick: optional(string()),
  name: optional(string()),
  city: optional(object()),
  address: optional(string()),
  createdAt: optional(string()),
  updatedAt: optional(string()),
})
