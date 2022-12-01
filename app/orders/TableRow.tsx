import 'server-only'

import ShortName from '@/app/customers/ShortName'
import Date from '@/Date'
import type { OrderOptionsType, OrderType } from '@/interfaces/orders'

export default function TableRow({
  object,
  options
}: Required<OrderType> & OrderOptionsType) {
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
