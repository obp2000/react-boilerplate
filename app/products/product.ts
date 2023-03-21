import { defaulted, object, size, string, union } from 'superstruct'
import {
  OptionalInteger,
  OptionalOption,
  OptionalFloat,
  OptionalBoolean,
  PositiveInteger,
} from "@/app/form/fields"

export const Product = object({
  productTypeId: OptionalOption,
  threads: OptionalOption,
  contents: OptionalOption,
  fleece: OptionalBoolean,
  name: size(string(), 1, 255),
  price: PositiveInteger,
  dollarPrice: OptionalFloat,
  dollarRate: OptionalFloat,
  weight: OptionalFloat,
  width: OptionalInteger,
  density: OptionalInteger,
  width_shop: OptionalInteger,
  densityShop: OptionalInteger,
  weightForCount: OptionalInteger,
  lengthForCount: OptionalFloat,
  pricePre: OptionalInteger,
  image: defaulted(string(), ''),
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
