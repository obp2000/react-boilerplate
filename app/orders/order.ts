import { Customer } from "@/app/customers/customer"
import {
  array,
  integer,
  number,
  object,
  optional,
  string,
  nullable,
  literal
} from 'superstruct'
import { OrderItem } from './orderItems/orderItem'

const refinedNumber = refine(union([number(), string()]), 'refinedNumber',
  (input) => Number(input) >= 0)

export const Order = object({
  post_cost: optional(nullable(refinedNumber)),
  packet: union([integer(), literal('')]),
  delivery_type: union([integer(), literal('')]),
  address: optional(nullable(string())),
  gift: optional(nullable(string())),
  customer: Customer,
  orderItems: optional(array(OrderItem)),
})
