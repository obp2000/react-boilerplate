import { array, object, optional, string, integer, any } from 'superstruct'
import { ToInteger, ToFloat } from '@/app/_objects/structFields'

const orderItem = object({
    id: optional(integer()),
    productId: optional(integer()),
    amount: ToFloat,
    price: ToFloat,
    cost: any(),
    weight: any(),
})

export const struct = object({
  postCost: optional(ToFloat),
  packet: optional(ToInteger),
  deliveryType: optional(ToInteger),
  address: optional(string()),
  gift: optional(string()),
  customerId: integer(),
  orderItems: optional(array(orderItem)),
})
