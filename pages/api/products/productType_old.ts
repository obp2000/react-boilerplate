import { integer, object, size, string } from 'superstruct'

export const ProductType = object({
  	id: integer(),
  	name: size(string(), 1, 255),
})
