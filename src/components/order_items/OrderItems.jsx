import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import OrderItem from './OrderItem'
import { addOrderItemAction } from '../redux/Orders'
import Label from '../Shared/Label'

const OrderItems = ({
        fields,
        options,
        common_consts
    }) =>
    <>
        <thead>
            <tr>
                <th scope='col'>№</th>
                <th scope='col'><Label name="product" {...{options}} /></th>
                <th scope='col'><Label name="price" {...{options}} /></th>
                <th scope='col'><Label name="amount" {...{options}} /></th>
                <th scope='col'><Label name="cost" {...{options}} /></th>
                <th scope='col'><Label name="weight" {...{options}} /></th>
                <th scope='col'>
                    <Button size='sm' outline onClick={addOrderItemAction(fields)}>
                        {common_consts.add}
                    </Button>
                </th>
            </tr>
        </thead>
        <tbody >
            {fields.map((order_item_name, index) =>
                <OrderItem key={index}
                    {...{order_item_name, fields, index, options, common_consts}}
                />
            )}
        </tbody>
    </>

OrderItems.propTypes = {
    fields: PropTypes.object,
    options: PropTypes.object,
    common_consts: PropTypes.object,
    add: PropTypes.string
}

OrderItems.defaultProps = {
    fields: {},
    options: {}
}

export default OrderItems
