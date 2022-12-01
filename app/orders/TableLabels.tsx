import 'server-only'

import type { OrderOptionsType } from '@/interfaces/orders'

export default function TableLabels({ options }: OrderOptionsType) {
  if (!options) { return null }
  return <>
    <th scope="col">{options.id.label}</th>
    <th scope="col">{options.customer.label}</th>
    <th scope="col">{options.order_items_cost.label}</th>
    <th scope="col">{options.created_at.label}</th>
    <th scope="col">{options.updated_at.label}</th>
  </>
}
