import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'
import { ShortName } from '../customers/CustomerName'

const OrderRow = ({
    id,
    customer,
    order_items_cost,
    created_at,
    updated_at,
    options: {
        customer: {
            children: customer_props = {}
        } = {}
    } = {},
    deleteObject,
    common_consts,
    ...rest
}) => <tr>
        <th scope="row">{id}</th>
        <td>{ShortName(customer, customer_props)}</td>
        <td>{order_items_cost}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <LinkToEdit {...{id, ...common_consts, ...rest}} />
        </td>
        <td>
            <DeleteButton action={() => deleteObject(id)} {...common_consts} />
        </td>
    </tr>

OrderRow.propTypes = {
    id: PropTypes.number,
    customer: PropTypes.shape({ nick: PropTypes.string, name: PropTypes.string }),
    order_items_cost: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    customer_props: PropTypes.object,
    deleteObject: PropTypes.func,
    common_consts: PropTypes.object
}

export default OrderRow