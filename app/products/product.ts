import { defaulted, object, size, string, optional, integer, any, boolean, nullable } from 'superstruct'
import {
  IntegerOrPattern,
  Option,
  ToInteger,
  ToBoolean,
  ToPositiveInteger,
  NumberOrPattern,
  ToFloat,
  PositiveInteger
} from "@/app/form/fields"

export const Product = object({
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
})

export const ProductApi = object({
  productTypeId: optional(ToInteger),
  threads: optional(ToInteger),
  contents: optional(ToInteger),
  fleece: optional(ToBoolean),
  name: size(string(), 1, 255),
  price: ToPositiveInteger,
  dollarPrice: optional(ToFloat),
  dollarRate: optional(ToFloat),
  weight: optional(ToFloat),
  width: optional(ToInteger),
  density: optional(ToInteger),
  widthShop: optional(ToInteger),
  densityShop: optional(ToInteger),
  weightForCount: optional(ToInteger),
  lengthForCount: optional(ToFloat),
  pricePre: optional(ToInteger),
  image: defaulted(string(), ''),
})

export const ProductSelect = object({
  id: integer(),
  productType: optional(object()),
  threads: any(),
  contents: any(),
  fleece: any(),
  name: optional(string()),
  price: optional(integer()),
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
  image: optional(string()),
  createdAt: optional(string()),
  updatedAt: optional(string()),
})


// const intOrDecRegexp = /^\d*(\.\d+)?$/

// export async function validate22(req: NextApiRequest) {
//   const { fields, files } = await getData(req)
//   // console.log('fields', fields)
//   // console.log('files', files)
//   let {
//     product_type_id,
//     threads,
//     contents,
//     fleece,
//     name,
//     price,
//     dollar_price,
//     dollar_rate,
//     weight,
//     width,
//     density,
//     width_shop,
//     density_shop,
//     weight_for_count,
//     length_for_count,
//     price_pre,
//     image,
//   } = fields
//   if (files.image) {
//     const { version, public_id, format } =
//       await uploadImage((files.image as File).filepath as string) as
//       { version: number, public_id: string, format: string }
//     image = `${version}/${public_id}.${format}`
//   }
//   const data = {
//     product_type_id: product_type_id === '' ? undefined : parseInt(String(product_type_id)),
//     threads: threads === '' ? undefined : parseInt(String(threads)),
//     contents: contents === '' ? undefined : parseInt(String(contents)),
//     fleece: fleece === 'true',
//     name,
//     price: parseInt(String(price)),
//     dollar_price: dollar_price ? parseFloat(String(dollar_price)) : undefined,
//     dollar_rate: dollar_rate ? parseFloat(String(dollar_rate)) : undefined,
//     weight: weight ? parseFloat(String(weight)) : undefined,
//     width: width ? parseInt(String(width)) : undefined,
//     density: density ? parseInt(String(density)) : undefined,
//     width_shop: width_shop ? parseInt(String(width_shop)) : undefined,
//     density_shop: density_shop ? parseInt(String(density_shop)) : undefined,
//     weight_for_count: weight_for_count ? parseInt(String(weight_for_count)) : undefined,
//     length_for_count: length_for_count ? parseFloat(String(length_for_count)) : undefined,
//     price_pre: price_pre ? parseInt(String(price_pre)) : undefined,
//     image,
//   }
//   assert(data, Product)
//   return data
// }
