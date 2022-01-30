import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'

const OrderRow = ({
    id,
    created_at,
    updated_at,
    order_items_cost,
    customer: {
        nick = '',
        name = ''
    },
    deleteObject,
    ...rest
}) => {
    return <tr>
        <th scope="row">{id}</th>
        <td>{`${nick} (${name})`}</td>
        <td>{order_items_cost}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <LinkToEdit {...{id, ...rest}} />
        </td>
        <td>
            <DeleteButton action={() => deleteObject(id)} />
        </td>
    </tr>
}

OrderRow.propTypes = {
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    order_items_cost: PropTypes.number,
    customer: PropTypes.shape({ nick: PropTypes.string, name: PropTypes.string }),
    deleteObject: PropTypes.func
}

export default OrderRow