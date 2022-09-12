import React from 'react'
import ProductName from './ProductName'
import Date from '../Shared/date'
import { Product } from '../../../interfaces'
import { useOptionsOuery } from '../options/hooks'

type Props = {
	object: Product
	indexUrl: string
}

const TableRow = ({ object, indexUrl }: Props) => {
	const { options } = useOptionsOuery(indexUrl)
	return <>
		<td scope="row">
			{object?.id}
		</td>
		<td scope="row">
			<ProductName {...{ object, options }} />,
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
