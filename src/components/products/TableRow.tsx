import React from 'react'
import ProductName from './ProductName'
import Date from '../Shared/date'
import { Product, ProductOptions, TableRowType } from '../../../interfaces'

const TableRow = ({
	object,
	options,
}: TableRowType<Product, ProductOptions>) => <>
		<td scope="row">
			{object?.id}
		</td>
		<td scope="row">
			<ProductName {...{ object, options }} />
		</td>
		<td scope="row">
			{object?.price}
		</td>
		<td scope="row">
			{object?.width}
		</td>
		<td scope="row">
			{object?.density}
		</td>
		<td scope="row">
			<Date dateString={object?.created_at} />
		</td>
		<td scope="row">
			<Date dateString={object?.updated_at} />
		</td>
	</>

export default TableRow
