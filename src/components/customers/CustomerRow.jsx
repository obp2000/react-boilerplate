import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'
import ShortName from './CustomerName'
import CityName from '../cities/CityName'

const CustomerRow = ({
    id,
    city,
    address,
    created_at,
    updated_at,
    // accessToken,
    options,
    options: {
        city: {
            children: city_props
        }
    },
    deleteObject,
    common_consts,
    ...rest
}) => <tr>
        <td>{id}</td>
        <td>{ShortName(rest, options)}</td>
        <td>{CityName(city, city_props)}</td>
        <td>{address}</td>
        <td>{created_at}</td>
        <td>
            <LinkToEdit {...{id, ...common_consts, ...rest}} />
        </td>
        <td>
            <DeleteButton action={() => deleteObject(id)} {...common_consts} />
        </td>
    </tr>

CustomerRow.propTypes = {
    id: PropTypes.number,
    city: PropTypes.object,
    address: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    options: PropTypes.object,
    children: PropTypes.object,
    deleteObject: PropTypes.func.isRequired,
    common_consts: PropTypes.object
}

export default CustomerRow