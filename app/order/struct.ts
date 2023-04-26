import { array, object, optional, string, nullable, integer, any } from 'superstruct'
import { Option, NumberOrPattern } from '@/app/_objects/structFields'

const customer = object({
  id: integer(),
  nick: any(),
  name: any(),
  city: any(),
  address: any(),
  createdAt: any(),
  updatedAt: any(),
})

const product = object({
  id: integer(),
  productType: any(),
  threads: any(),
  contents: any(),
  fleece: any(),
  name: any(),
  price: any(),
  dollarPrice: any(),
  dollarRate: any(),
  weight: any(),
  width: any(),
  density: any(),
  widthShop: any(),
  densityShop: any(),
  weightForCount: any(),
  lengthForCount: any(),
  pricePre: any(),
  image: any(),
  createdAt: any(),
  updatedAt: any(),
})

export const orderItem = object({
    id: optional(integer()),
    product: optional(product),
    amount: optional(nullable(NumberOrPattern)),
    price: optional(nullable(NumberOrPattern)),
    cost: any(),
    weight: any(),
})

export const struct = object({
  postCost: optional(nullable(NumberOrPattern)),
  packet: optional(nullable(Option)),
  deliveryType: optional(nullable(Option)),
  address: optional(string()),
  gift: optional(string()),
  customer,
  orderItems: optional(array(orderItem)),
  createdAt: any(),
})
