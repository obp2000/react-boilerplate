import { integer, object, optional, size, string, any } from 'superstruct'

export const city = object({
  id: integer(),
  pindex: size(string(), 1, 6),
  city: size(string(), 1, 80),
})

export const id = optional(integer())

export const nick = size(string(), 1, 255)

export const name = optional(string())

export const cityId = integer()

export const address = optional(string())

export const createdAt = any()

export const struct = object({ id, nick, name, city, address, createdAt })
