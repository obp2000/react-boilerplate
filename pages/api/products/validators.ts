import { uploadImage } from '@/services/cloudinary'
import { getData } from '@/services/formidable'
import type { File } from "formidable"
import type { NextApiRequest } from 'next'
import { assert, coerce, integer, string } from 'superstruct'
import { Product } from '@/app/products/product'
// import defaultProduct from '@/app/products/product.json'

export async function validate(req: NextApiRequest) {
  const { fields, files } = await getData(req)
  // console.log('fields', fields)
  // console.log('files', files)
  let {
    name,
    threads,
    contents,
    price,
    weight,
    width,
    density,
    dollar_price,
    dollar_rate,
    width_shop,
    density_shop,
    weight_for_count,
    length_for_count,
    price_pre,
    image,
    product_type_id,
    fleece,
  } = fields
  if (files.image) {
    const { version, public_id, format } =
      await uploadImage((files.image as File).filepath as string) as
      { version: number, public_id: string, format: string }
    image = `${version}/${public_id}.${format}`
  }
  const data = {
    product_type_id: product_type_id === '' ? undefined : parseInt(String(product_type_id)),
    threads: threads === '' ? undefined : parseInt(String(threads)),
    contents: contents === '' ? undefined : parseInt(String(contents)),
    fleece: fleece === 'true',
    name,
    price: parseInt(String(price)),
    weight: weight ? parseFloat(String(weight)) : undefined,
    width: width ? parseInt(String(width)) : undefined,
    density: density ? parseInt(String(density)) : undefined,
    dollar_price: dollar_price ? parseFloat(String(dollar_price)) : undefined,
    dollar_rate: dollar_rate ? parseFloat(String(dollar_rate)) : undefined,
    width_shop: width_shop ? parseInt(String(width_shop)) : undefined,
    density_shop: density_shop ? parseInt(String(density_shop)) : undefined,
    weight_for_count: weight_for_count ? parseInt(String(weight_for_count)) : undefined,
    length_for_count: length_for_count ? parseFloat(String(length_for_count)) : undefined,
    price_pre: price_pre ? parseInt(String(price_pre)) : undefined,
    image,
  }
  assert(data, Product)
  return data
}


  // const data = {
  //   name,
  //   threads: threads ? parseInt(String(threads)) : undefined,
  //   contents: contents ? parseInt(String(contents)) : undefined,
  //   price: parseInt(String(price)),
  //   weight: weight ? Number(weight) : undefined,
  //   width: width ? Number(width) : undefined,
  //   density: density ? parseInt(String(density)) : undefined,
  //   dollar_price: dollar_price ? Number(dollar_price) : undefined,
  //   dollar_rate: dollar_rate ? Number(dollar_rate) : undefined,
  //   width_shop: width_shop ? parseInt(String(width_shop)) : undefined,
  //   density_shop: density_shop ? parseInt(String(density_shop)) : undefined,
  //   weight_for_count: weight_for_count ? parseInt(String(weight_for_count)) : undefined,
  //   length_for_count: length_for_count ? Number(length_for_count) : undefined,
  //   price_pre: price_pre ? parseInt(String(price_pre)) : undefined,
  //   image,
  //   product_type_id: product_type_id ? parseInt(String(product_type_id)) : undefined,
  //   fleece: !!fleece,
  // }

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