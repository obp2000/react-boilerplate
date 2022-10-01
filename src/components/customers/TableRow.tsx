import React from 'react'
import ShortName from './ShortName'
import CityName from '../cities/CityName'
import Date from '../Shared/date'
import type { Customer, CustomerOptions, TableRowType } from '../../../interfaces'

const TableRow = ({
    object,
    options,
}: TableRowType<Customer, CustomerOptions>): JSX.Element => <>
        <td scope="row">
            {object.id}
        </td>
        <td scope="row">
            <ShortName {...{ object, options }} />
        </td>
        <td scope="row">
            <CityName object={object.city} options={options?.city.children} />
        </td>
        <td scope="row">
            {object.address}
        </td>
        <td scope="row">
            <Date dateString={object.created_at} />
        </td>
        <td scope="row">
            <Date dateString={object.updated_at} />
        </td>
    </>

export default TableRow
