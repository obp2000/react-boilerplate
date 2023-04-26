import {
    ToBoolean,
    ToFloat,
    ToInteger,
    ToPositiveInteger
} from "@/app/_objects/structFields"
import {
    defaulted,
    nullable,
    object,
    optional,
    size,
    string
} from "superstruct"

export const struct = object({
    productTypeId: optional(nullable(ToInteger)),
    threads: optional(nullable(ToInteger)),
    contents: optional(nullable(ToInteger)),
    fleece: optional(nullable(ToBoolean)),
    name: size(string(), 1, 255),
    price: ToPositiveInteger,
    dollarPrice: optional(nullable(ToFloat)),
    dollarRate: optional(nullable(ToFloat)),
    weight: optional(nullable(ToFloat)),
    width: optional(nullable(ToInteger)),
    density: optional(nullable(ToInteger)),
    widthShop: optional(nullable(ToInteger)),
    densityShop: optional(nullable(ToInteger)),
    weightForCount: optional(nullable(ToInteger)),
    lengthForCount: optional(nullable(ToFloat)),
    pricePre: optional(nullable(ToInteger)),
    image: defaulted(string(), ''),
  })
