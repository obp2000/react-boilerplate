import React from 'react'
import AddOrderItemButton from './AddOrderItemButton'
import { OrderItemFormRender } from '../../../interfaces'

const TableLabels = (props: OrderItemFormRender): JSX.Element => {
    const options = props.options?.order_items?.child?.children
    return <tr>
        <th scope="col">
            №
        </th>
        <th scope="col">
            {options?.product.label}
        </th>
        <th scope="col">
            {options?.price.label}
        </th>
        <th scope="col">
            {options?.amount.label}
        </th>
        <th scope="col">
            {options?.cost.label}
        </th>
        <th scope="col">
            {options?.weight.label}
        </th>
        <th scope='col'>
            <AddOrderItemButton {...props} />
        </th>
    </tr>

}

export default TableLabels
