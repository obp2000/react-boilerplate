import {
  integer,
  object,
  optional,
  size,
  string,
  number,
  boolean,
  date,
} from 'superstruct'

// const Connect = object({
//   id: optional(integer())
// })

// const Disconnect = object({
//   disconnect: boolean()
// })

// const ProductType = object({
//   connect: Connect
// })

export const Product = object({
  name: size(string(), 1, 255),
  threads: optional(integer()),
  contents: optional(integer()),
  price: integer(),
  weight: optional(number()),
  width: optional(integer()),
  density: optional(integer()),
  dollar_price: optional(number()),
  dollar_rate: optional(number()),
  width_shop: optional(integer()),
  density_shop: optional(integer()),
  weight_for_count: optional(integer()),
  length_for_count: optional(number()),
  price_pre: optional(integer()),
  image: optional(string()),
  // productType: ProductType || Disconnect,
  product_type_id: optional(integer()),
  fleece: optional(boolean()),
})


  // threads              Int?
  // contents             Int?
  // price                Int
  // weight               Decimal?               @db.Decimal(4, 2)
  // width                Int?
  // density              Int?
  // dollar_price         Decimal?               @db.Decimal(4, 2)
  // dollar_rate          Decimal?               @db.Decimal(5, 2)
  // width_shop           Int?
  // density_shop         Int?
  // weight_for_count     Int?
  // length_for_count     Decimal?               @db.Decimal(5, 2)
  // price_pre            Int?
  // image                String                 @db.VarChar(100)
  // created_at           DateTime               @db.Timestamptz(6)
  // updated_at           DateTime               @db.Timestamptz(6)
  // product_type_id      Int?
  // fleece               Boolean?
  // orderItems           OrderItem[]
  // productType          ProductType?


  // name: 'Тёмно-синяя s1',
  // threads: 1,
  // contents: 0,
  // price: 365,
  // weight: null,
  // width: 177,
  // density: 183,
  // dollar_price: 11,
  // dollar_rate: 60,
  // width_shop: null,
  // density_shop: null,
  // weight_for_count: null,
  // length_for_count: null,
  // price_pre: null,
  // image: 'product/image/30/D26HG70HzgPM-Gvf0cbStgfPeoVeQgroa-hGRIb-RI-oRp36Hrh3hrRrCn3F46xXsiLCztMo.jpg',
  // created_at: 2022-02-04T21:38:59.481Z,
  // productType: {
  //   id: 2,
  //   name: 'Футер',
  //   created_at: 2021-06-02T21:10:10.338Z,
  //   updated_at: 2021-06-02T21:10:10.338Z
  // },
  // fleece: true