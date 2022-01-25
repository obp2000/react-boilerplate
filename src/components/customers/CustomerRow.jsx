import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
// import DeleteCustomerButton from './Containers/DeleteCustomerButton'
import DeleteButton from '../Shared/DeleteButton'

const CustomerRow = ({
    id,
    nick,
    name,
    city,
    pindex,
    address,
    created_at,
    updated_at,
    deleteObjectAction,
}) => <tr>
    <td>{id}</td>
    <td>{nick}</td>
    <td>{name}</td>
    <td>{city && city.city}</td>
    <td>{city && city.pindex}</td>
    <td>{address}</td>
    <td>{created_at}</td>
    <td>
        <Link to={"/customers/" + id} className="btn btn-outline-primary btn-sm">Редактировать</Link>
    </td>
    <td>
        <DeleteButton action={() => deleteObjectAction(id)} />
    </td>
</tr>

CustomerRow.propTypes = {
    id: PropTypes.number,
    nick: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    deleteObjectAction: PropTypes.func
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