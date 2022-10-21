import { FC, useContext } from 'react'
import type { TableRowType } from '../../../interfaces/objectsTable'
import type { Order, OrderOptionsType } from '../../../interfaces/orders'
import ShortName from '../customers/ShortName'
import { OptionsContext } from '../layout/Layout'
import Date from '../Shared/Date'

const TableRow: FC<TableRowType<Order>> = ({ object }) => {
  const { options } = useContext(OptionsContext) as OrderOptionsType
  return <>
    <td scope="row">
      {object.id}
    </td>
    <td scope="row">
      <ShortName object={object?.customer}
        options={options?.customer.children} />
    </td>
    <td scope="row">
      {object.order_items_cost}
    </td>
    <td scope="row">
      <Date dateString={object.created_at} />
    </td>
    <td scope="row">
      <Date dateString={object.updated_at} />
    </td>
  </>
}

export default TableRow
