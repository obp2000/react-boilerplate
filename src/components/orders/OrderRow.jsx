import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from '../Shared/DeleteButton'

const OrderRow = ({
    id,
    created_at,
    updated_at,
    order_items_cost,
    customer: {
        nick = '',
        name = ''
    },
    deleteObjectAction
}) => {
    return <tr>
        <th scope="row">{id}</th>
        <td>{`${nick} (${name})`}</td>
        <td>{order_items_cost}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <Link to={"/orders/" + id} className="btn btn-outline-primary btn-sm">Редактировать</Link>
        </td>
        <td>
            <DeleteButton action={() => deleteObjectAction(id)} />
        </td>
    </tr>
}

OrderRow.propTypes = {
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    order_items_cost: PropTypes.number,
    customer: PropTypes.shape({ nick: PropTypes.string, name: PropTypes.string }),
    deleteObjectAction: PropTypes.func
}

export default OrderRow