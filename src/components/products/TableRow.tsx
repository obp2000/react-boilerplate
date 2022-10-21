import { FC, useContext } from 'react'
import { TableRowType } from '../../../interfaces/objectsTable'
import type { Product, ProductOptionsType } from '../../../interfaces/products'
import { OptionsContext } from '../layout/Layout'
import Date from '../Shared/Date'
import ProductName from './ProductName'

const TableRow: FC<TableRowType<Product>> = ({ object }) => {
  const { options } = useContext(OptionsContext) as ProductOptionsType
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

export default TableRow