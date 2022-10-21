import { FC, useContext } from 'react'
import type { OrderItemOptionsType } from '../../../interfaces/orderItems'
import { OptionsContext } from '../layout/Layout'
import AddOrderItemButton from './AddOrderItemButton'

const TableLabels: FC = () => {
  const { options } = useContext(OptionsContext) as OrderItemOptionsType
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

export default TableLabels
