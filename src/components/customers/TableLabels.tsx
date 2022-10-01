import React from 'react'
import type { CustomerOptions } from '../../../interfaces'

type Props = {
    options?: CustomerOptions
}

const TableLabels = ({ options }: Props): JSX.Element | null => {
    if (!options) { return null }
    return <>
        <th scope="col">
            {options.id.label}
        </th>
        <th scope="col">
            {options.name.label}
        </th>
        <th scope="col">
            {options.city.label}
        </th>
        <th scope="col">
            {options.address.label}
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
