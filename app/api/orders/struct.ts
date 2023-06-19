import {
  array,
  object,
  optional,
  string,
  integer,
  any,
  nullable
} from 'superstruct'
import { ToInteger, ToFloat } from '@/app/_objects/structFields'

const orderItem = object({
    id: optional(integer()),
    productId: optional(nullable(integer())),
    amount: ToFloat,
    price: ToFloat,
    cost: any(),
    weight: any(),
})

export const struct = object({
  postCost: optional(nullable(ToFloat)),
  packet: nullable(ToInteger),
  deliveryType: nullable(ToInteger),
  address: optional(string()),
  gift: optional(string()),
  customerId: integer(),
  orderItems: optional(array(orderItem)),
})
