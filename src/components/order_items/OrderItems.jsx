import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import OrderItem from './OrderItem'
import Label from '../Shared/Label'
// import AddOrderItemButton from './AddOrderItemButton'
import { deleteOrderItemAction, addOrderItemAction } from '../redux/Orders'
import { tableFieldNames } from '../redux/OrderItems'
// import { selectCommonConsts } from '../redux/CommonConsts'
import { productLabels } from '../redux/Products'
import { getTableLabels } from '../redux/Router'

const OrderItems = ({ fields, options, add, ...consts }) => {
    // console.log('fields ', fields)
    const deleteObjectAction = deleteOrderItemAction(fields)
    const orderItemProps = options?.order_items?.child?.children
    const productProps = orderItemProps?.product?.children
    const tableLabels = getTableLabels(tableFieldNames, orderItemProps)
    const product_labels = productLabels(productProps)
    return <>
        <thead>
            <tr>
                <th scope="col">
                    №
                </th>
                {tableLabels.map((label, key) =>
                    <th scope="col" key={key}>
                        {label}
                    </th>
                )}
                <th scope='col'>
                    <Button size='sm'
                            outline
                            onClick={addOrderItemAction(fields)}>
                        {add}
                    </Button>
                </th>
            </tr>
        </thead>
        <tbody >
            {fields.map((order_item_name, index) =>
                <OrderItem key={index}
                    {...{order_item_name,
                        index,
                        product_labels,
                        tableLabels,
                        deleteObjectAction,
                        ...consts
                    }}
                />
            )}
        </tbody>
    </>
}

OrderItems.propTypes = {
    fields: PropTypes.object,
}

export default OrderItems
