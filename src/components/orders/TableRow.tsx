import React from 'react'
import ShortName from '../customers/ShortName'
import Date from '../Shared/date'
import type { Order, OrderOptions, TableRowType } from '../../../interfaces'

const TableRow = ({
	object,
	options
}: TableRowType<Order, OrderOptions>) => <>
		<td scope="row">
			{object.id}
		</td>
		<td scope="row">
			<ShortName object={object?.customer}
				options={options?.customer.children} />
		</td>
		<td scope="row">
			{object.order_items_cost}
		</td>
		<td scope="row">
			<Date dateString={object.created_at} />
		</td>
		<td scope="row">
			<Date dateString={object.updated_at} />
		</td>
	</>

export default TableRow
