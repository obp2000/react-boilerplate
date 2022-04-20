import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import OrderItem from './OrderItem'
import Label from '../Shared/Label'
// import AddOrderItemButton from './AddOrderItemButton'
import { deleteOrderItemAction, addOrderItemAction } from '../redux/Orders'
import { selectTableLabels, selectProductProps } from '../redux/OrderItems'
import { selectCommonConsts } from '../redux/CommonConsts'
import { selectProductLabels } from '../redux/Products'

const OrderItems = ({ fields }) => {
    // console.log('fields ', fields)
    const deleteObjectAction = deleteOrderItemAction(fields)
    const tableLabels = useSelector(selectTableLabels)
    const product_labels = useSelector(selectProductLabels(selectProductProps))
    return <>
        <thead>
            <tr>
                {Object.values(tableLabels).map((label, key) =>
                    <th scope="col" key={key}>
                        {label}
                    </th>
                )}
                <th scope='col'>
                    <Button size='sm'
                            outline
                            onClick={addOrderItemAction(fields)}>
                        {useSelector(selectCommonConsts).add}
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
                        deleteObjectAction
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
