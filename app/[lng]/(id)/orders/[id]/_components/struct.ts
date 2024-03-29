import {
  array,
  object,
  optional,
  string,
  integer,
  nullable,
  number,
} from 'superstruct'

import {
  struct as customer,
} from '@/app/[lng]/(id)/customers/[id]/_components/struct'
import {
  struct as product,
} from '@/app/[lng]/(id)/products/[id]/_components/struct'

export const orderItem = object({
    id: optional(integer()),
    product: nullable(product),
    amount: nullable(number()),
    price: nullable(number()),
    // cost: any(),
    // weight: any(),
})

export const struct = object({
  customer,
  address: optional(string()),
  gift: optional(string()),
  postCost: optional(number()),
  packet: nullable(integer()),
  deliveryType: nullable(integer()),
  orderItems: optional(array(orderItem)),
})

const orderItemApi = object({
    id: optional(integer()),
    productId: nullable(integer()),
    amount: nullable(number()),
    price: nullable(number()),
    // cost: any(),
    // weight: any(),
})

export const structApi = object({
  postCost: optional(number()),
  packet: nullable(integer()),
  deliveryType: nullable(integer()),
  address: optional(string()),
  gift: optional(string()),
  customerId: integer(),
  orderItems: optional(array(orderItemApi)),
})






// const customer = object({
//   id: integer(),
//   nick: any(),
//   name: any(),
//   city: any(),
//   address: any(),
//   createdAt: any(),
//   updatedAt: any(),
// })

// const product = object({
//   id: integer(),
//   productType: any(),
//   threads: any(),
//   contents: any(),
//   fleece: any(),
//   name: any(),
//   price: any(),
//   dollarPrice: any(),
//   dollarRate: any(),
//   weight: any(),
//   width: any(),
//   density: any(),
//   widthShop: any(),
//   densityShop: any(),
//   weightForCount: any(),
//   lengthForCount: any(),
//   pricePre: any(),
//   image: any(),
//   createdAt: any(),
//   updatedAt: any(),
// })
