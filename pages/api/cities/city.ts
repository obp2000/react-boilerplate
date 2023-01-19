import { integer, object, size, string } from 'superstruct'

export const City = object({
  	id: integer(),
  	pindex: size(string(), 1, 6),
  	city: size(string(), 1, 80),
})
