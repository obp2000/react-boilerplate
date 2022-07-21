import PropTypes from 'prop-types'
import React from 'react'
import {useCustomerCityOptions} from './hooks'
import CityName from '../cities/CityName'
import ShortName from './ShortName'

const emptyObject = {}

const ObjectsTableRow = ({
    id,
    city,
    address,
    created_at,
    ...restObject
} = emptyObject) => {
	const options = useCustomerCityOptions()
	return <>
		<td scope="row">{id}</td>
		<td scope="row"><ShortName {...restObject} /></td>
		<td scope="row"><CityName {...{...city, options}} /></td>
		<td scope="row">{address}</td>
		<td scope="row">{created_at}</td>
    </>
}

ObjectsTableRow.propTypes = {
	id: PropTypes.number,
	city: PropTypes.object,
	address: PropTypes.string,
	created_at: PropTypes.string,
	restObject: PropTypes.object,
}

export default ObjectsTableRow
