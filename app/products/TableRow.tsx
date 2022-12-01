import 'server-only'

import Date from '@/Date'
import type { ProductOptionsType, ProductType } from '@/interfaces/products'
import ProductName from '@/app/products/ProductName'

export default function TableRow({
  object,
  options
}: Required<ProductType> & ProductOptionsType) {
  return <>
    <td scope="row">
      {object?.id}
    </td>
    <td scope="row">
      <ProductName {...{ object, options }} />
    </td>
    <td scope="row">
      {object?.price}
    </td>
    <td scope="row">
      {object?.width}
    </td>
    <td scope="row">
      {object?.density}
    </td>
    <td scope="row">
      <Date dateString={object?.created_at} />
    </td>
    <td scope="row">
      <Date dateString={object?.updated_at} />
    </td>
  </>
}
