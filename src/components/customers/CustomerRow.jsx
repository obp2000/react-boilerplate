import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'

const CustomerRow = ({
    id,
    nick,
    name,
    city,
    pindex,
    address,
    created_at,
    updated_at,
    // accessToken,
    deleteObject,
    ...rest
}) => <tr>
    <td>{id}</td>
    <td>{nick}</td>
    <td>{name}</td>
    <td>{city && city.city}</td>
    <td>{city && city.pindex}</td>
    <td>{address}</td>
    <td>{created_at}</td>
    <td>
        <LinkToEdit {...{id, ...rest}} />
    </td>
    <td>
        <DeleteButton action={() => deleteObject(id)} />
    </td>
</tr>

CustomerRow.propTypes = {
    id: PropTypes.number,
    nick: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    // accessToken: PropTypes.string,
    deleteObject: PropTypes.func.isRequired
}

CustomerRow.defaultProps = {
    id: 0,
    nick: '',
    name: '',
    address: '',
    created_at: '',
    updated_at: ''
}

export default CustomerRow