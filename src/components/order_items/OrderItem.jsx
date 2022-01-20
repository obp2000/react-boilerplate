import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import DeleteButton from '../Shared/DeleteButton'
import ProductField from '../products/Containers/ProductField'

const OrderItem = ({
    order_item_name,
    price,
    amount,
    index,
    row_class_name,
    deleteOrderItemAction
}) => <tr className={row_class_name}>
        <th scope="row" className="col-sm-1">{index+1}</th>
        <td className="col-sm-6">
            <ProductField order_item_name={order_item_name}/>
        </td>
        <td className="col-sm-1">
            <Field name={`${order_item_name}.price`} type="number"
                component={renderField} placeholder="Цена"/>
        </td>
        <td className="col-sm-1">
            <Field name={`${order_item_name}.amount`} type="number"
                component={renderField} placeholder="Количество" step="0.1" />
        </td>
        <td className="col-sm-1 text-right">
            <Field name={`${order_item_name}.cost`} type="number"
                component={renderField} readOnly />
        </td>
        <td className="col-sm-1 text-right">
            <Field name={`${order_item_name}.weight`} type="number"
                component={renderField} readOnly />
        </td>
        <td className="col-sm-1">
            <DeleteButton action={deleteOrderItemAction} />
        </td>
    </tr>

OrderItem.propTypes = {
    order_item_name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    index: PropTypes.number,
    row_class_name: PropTypes.string,
    deleteOrderItemAction: PropTypes.func.isRequired
}

export default OrderItem