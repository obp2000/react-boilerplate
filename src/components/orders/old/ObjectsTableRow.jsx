import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import ShortName from '../customers/ShortName'
import {useOrderCustomerOptions} from './hooks'

const emptyObject = {}

const ObjectsTableRow = ({
  id,
  customer,
  order_items_cost,
  created_at,
  updated_at
} = emptyObject) => {
	const options = useOrderCustomerOptions()
	return <>
		<td scope="row">{id}</td>
		<td scope="row"><ShortName {...{...customer, options}} /></td>
		<td scope="row">{order_items_cost}</td>
		<td scope="row">{created_at}</td>
		<td scope="row">{updated_at}</td>
    </>
}

ObjectsTableRow.propTypes = {
  	id: PropTypes.number,
  	customer: PropTypes.object,
  	order_items_cost: PropTypes.number,
  	created_at: PropTypes.string,
  	updated_at: PropTypes.string,
}

export default ObjectsTableRow
