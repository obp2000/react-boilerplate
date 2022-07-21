import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import ProductName from './ProductName'

const emptyObject = {}

const ObjectsTableRow = ({
  id,
  price,
  width,
  density,
  created_at,
  updated_at,
  ...restObject
} = emptyObject) => {
	return <>
		<td scope="row">{id}</td>
		<td scope="row"><ProductName {...restObject} /></td>
		<td scope="row">{price}</td>
		<td scope="row">{width}</td>
		<td scope="row">{density}</td>
		<td scope="row">{created_at}</td>
		<td scope="row">{updated_at}</td>
    </>
}

ObjectsTableRow.propTypes = {
  	id: PropTypes.number,
  	price: PropTypes.number,
  	width: PropTypes.number,
  	density: PropTypes.number,
  	created_at: PropTypes.string,
  	updated_at: PropTypes.string,
		restObject: PropTypes.object,
}

export default ObjectsTableRow
