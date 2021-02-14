import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import DeleteButton from '../Shared/DeleteButton'

const Order = ({
        id,
        created_at,
        updated_at,
        sum,
        customer: {
            nick = '',
            name = ''
        },
        deleteOrderAction
        // customer
}) => {
    return <tr>
        <th scope="row">{id}</th>
        <td>{`${nick} (${name})`}</td>
        <td>{sum ? parseInt(sum, 0) : 0}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <Link to={"/orders/" + id} className="btn btn-outline-primary btn-sm">Редактировать</Link>
        </td>
        <td>
            <DeleteButton action={() => deleteOrderAction(id)} />
        </td>
    </tr>
}

Order.propTypes = {
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    sum: PropTypes.number,
    customer: PropTypes.shape({nick: PropTypes.string, name: PropTypes.string}),
    deleteOrderAction: PropTypes.func
    // customer: PropTypes.string
}

export default Order