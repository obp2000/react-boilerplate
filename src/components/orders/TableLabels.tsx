import React from 'react'
import type { OrderOptionsType } from '../../../interfaces'

const TableLabels = ({ options }: OrderOptionsType): JSX.Element | null => {
    if (!options) { return null }
    return <>
        <th scope="col">
            {options.id.label}
        </th>
        <th scope="col">
            {options.customer.label}
        </th>
        <th scope="col">
            {options.order_items_cost.label}
        </th>
        <th scope="col">
            {options.created_at.label}
        </th>
        <th scope="col">
            {options.updated_at.label}
        </th>
    </>
}

export default TableLabels
