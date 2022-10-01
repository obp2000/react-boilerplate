import React from 'react'
import type { ProductOptions } from '../../../interfaces'

type Props = {
    options?: ProductOptions
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
            {options.price.label}
        </th>
        <th scope="col">
            {options.width.label}
        </th>
        <th scope="col">
            {options.density.label}
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

