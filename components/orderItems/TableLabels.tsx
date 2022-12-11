import type { OrderItemOptionsType } from '@/interfaces/orderItems'
import { MainContext } from '@/options/context'
import { useContext } from 'react'
import AddOrderItemButton from './AddOrderItemButton'

export default function TableLabels() {
  const { options } = useContext(MainContext) as OrderItemOptionsType
  return <tr>
    <th scope="col">№</th>
    <th scope="col">{options?.product.label}</th>
    <th scope="col">{options?.price.label}</th>
    <th scope="col">{options?.amount.label}</th>
    <th scope="col">{options?.cost.label}</th>
    <th scope="col">{options?.weight.label}</th>
    <th scope='col'><AddOrderItemButton /></th>
  </tr>
}
