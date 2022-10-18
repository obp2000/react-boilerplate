import React, { useContext } from 'react'
import { OptionsContext } from '../layout/Layout'
import ProductName from './ProductName'
import Date from '../Shared/Date'
import { TableRowType } from '../../../interfaces/objectsTable'
import type { Product, ProductOptionsType } from '../../../interfaces/products'

const TableRow = ({ object }: TableRowType<Product>) => {
	const { options } = useContext(OptionsContext) as ProductOptionsType
	return <>
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
}

export default TableRow
