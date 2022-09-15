import React from 'react'
import { useOptionsOuery } from '../options/hooks'

type Props = {
    indexUrl: string
}

const TableLabels = ({ indexUrl }: Props): JSX.Element => {
    const { options } = useOptionsOuery(indexUrl)
    return <>
        <th scope="col">
            {options?.id.label}
        </th>
        <th scope="col">
            {options?.name.label}
        </th>
        <th scope="col">
            {options?.price.label}
        </th>
        <th scope="col">
            {options?.width.label}
        </th>
        <th scope="col">
            {options?.density.label}
        </th>
        <th scope="col">
            {options?.created_at.label}
        </th>
        <th scope="col">
            {options?.updated_at.label}
        </th>
    </>
}

export default TableLabels

