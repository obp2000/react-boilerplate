import {
  object,
  size,
  string,
  optional,
  boolean,
  nullable,
  any } from 'superstruct'
import {
  IntegerOrPattern,
  Option,
  NumberOrPattern,
  PositiveInteger
} from '@/app/_objects/structFields'

export const struct = object({
  productTypeId: optional(nullable(Option)),
  threads: optional(nullable(Option)),
  contents: optional(nullable(Option)),
  fleece: optional(nullable(boolean())),
  name: size(string(), 1, 255),
  price: PositiveInteger,
  dollarPrice: optional(nullable(NumberOrPattern)),
  dollarRate: optional(nullable(NumberOrPattern)),
  weight: optional(nullable(NumberOrPattern)),
  width: optional(nullable(IntegerOrPattern)),
  density: optional(nullable(IntegerOrPattern)),
  widthShop: optional(nullable(IntegerOrPattern)),
  densityShop: optional(nullable(IntegerOrPattern)),
  weightForCount: optional(nullable(IntegerOrPattern)),
  lengthForCount: optional(nullable(NumberOrPattern)),
  pricePre: optional(nullable(IntegerOrPattern)),
  image: optional(string()),
  createdAt: any(),
})
