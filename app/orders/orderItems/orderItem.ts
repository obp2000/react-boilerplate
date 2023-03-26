import { integer, object, optional, any, nullable } from 'superstruct'
import { NumberOrPattern, ToFloat } from "@/app/form/fields"
import { ProductSelect } from '@/app/products/product'

export const OrderItem = object({
    id: optional(integer()),
    product: optional(ProductSelect),
    amount: optional(nullable(NumberOrPattern)),
    price: optional(nullable(NumberOrPattern)),
    cost: optional(any()),
    weight: optional(any()),
})

export const OrderItemApi = object({
    id: optional(integer()),
    productId: optional(integer()),
    amount: ToFloat,
    price: ToFloat,
    cost: optional(any()),
    weight: optional(any()),
})
