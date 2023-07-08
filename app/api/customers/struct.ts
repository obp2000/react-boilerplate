import {
  integer,
  nonempty,
  object,
  optional,
  string
} from 'superstruct'

export const city = object({
  id: integer(),
  pindex: string(),
  city: string(),
})

export const struct = object({
  id: optional(integer()),
  nick: nonempty(string()),
  name: optional(string()),
  city: city,
  address: optional(string()),
})

export const structApi = object({
  nick: nonempty(string()),
  name: optional(string()),
  cityId: integer(),
  address: optional(string()),
})
