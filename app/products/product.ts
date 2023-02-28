import {
  boolean,
  integer,
  number,
  object,
  optional,
  string,
  union,
  literal,
  size,
  min,
  coerce,
  pattern,
  refine,
  nullable,
  create
} from 'superstruct'

// const intOrDecRegexp = /^\d*(\.\d+)?$/
const refinedNumber = refine(union([number(), string()]), 'refinedNumber',
  (input) => Number(input) >= 0)
// const MyNumber = coerce(integer(), string(), (value) => parseInt(value))

export const Product = object({
  product_type_id: union([integer(), literal('')]),
  threads: union([integer(), literal('')]),
  contents: union([integer(), literal('')]),
  fleece: optional(boolean()),
  name: size(string(), 1, 255),
  price: refine(union([integer(), string()]), 'positiveInteger',
    (input) => Number(input) > 0),
  dollar_price: optional(nullable(refinedNumber)),
  dollar_rate: optional(nullable(refinedNumber)),
  weight: optional(nullable(refinedNumber)),
  width: optional(nullable(refinedNumber)),
  density: optional(nullable(refinedNumber)),
  width_shop: optional(nullable(refinedNumber)),
  density_shop: optional(nullable(refinedNumber)),
  weight_for_count: optional(nullable(refinedNumber)),
  length_for_count: optional(nullable(refinedNumber)),
  price_pre: optional(nullable(refinedNumber)),
  image: union([string(), object()]),
})
