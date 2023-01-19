import { Customer } from "@/pages/api/customers/customer"
import {
  array, integer,
  number, object,
  optional, string
} from 'superstruct'

const OrderItems = array()

export const Order = object({
  post_cost: optional(number()),
  packet: optional(integer()),
  delivery_type: optional(integer()),
  address: string(),
  gift: optional(string()),
  customer: Customer,
  orderItems: optional(OrderItems),
})
