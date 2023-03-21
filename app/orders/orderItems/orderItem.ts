import { integer, object, optional, coerce, any, union, string, number, literal } from 'superstruct'
import { OptionalInteger, OptionalFloat, OptionalDate, OptionalDigitPattern } from "@/app/form/fields"

// const optionalObject = coerce(optional(object()), object(), ({ id }) => ({ id }))

export const OrderItem = object({
    id: optional(integer()),
    // product: optionalObject,
    productId: optional(integer()),
    amount: coerce(union([number(), OptionalDigitPattern, literal('')]),
        union([string(), literal('')]),
        (value) => value === '' ? 0 : parseFloat(value)),
    price: coerce(union([integer(), OptionalDigitPattern]),
        string(),
        (value) => value === '' ? 0 : parseInt(value)),
    cost: optional(any()),
    weight: optional(any()),
})
