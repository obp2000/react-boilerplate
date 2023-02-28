import { integer, number, object, optional, nullable, union, refine } from 'superstruct'

const refinedNumber = refine(union([number(), string()]), 'refinedNumber',
  (input) => Number(input) >= 0)

export const OrderItem = object({
  id: optional(integer()),
  product: optional(object({id : integer()})),
  amount: optional(nullable(refinedNumber)),
  price: optional(nullable(refinedNumber)),
})
