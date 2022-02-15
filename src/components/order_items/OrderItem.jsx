import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
// import NumberField from '../Shared/NumberField'
import Input from '../Shared/Input'
import DeleteButton from '../Shared/DeleteButton'
import ProductField from '../products/ProductField'

const OrderItem = ({
    order_item_name,
    price,
    amount,
    index,
    // row_class_name,
    // deleteOrderItemAction,
    fields
}) => <tr>
        <th scope="row">
            {index+1}
        </th>
        <td className="min-vw-35">
            <Field name={`${order_item_name}.product`} label="Наименование"
                containerClassName='form-field'
                component={ProductField} />
        </td>
        <td>
            <Field name={`${order_item_name}.price`} label="Цена, руб./м"
                type='number' step={1} min={0} component={Input} />
        </td>
        <td>
            <Field name={`${order_item_name}.amount`} label="Количество"
                type='number' step={0.1} min={0} component={Input} />
        </td>
        <td>
            <Field name={`${order_item_name}.cost`} type="number"
                disabled component={Input} />
        </td>
        <td>
            <Field name={`${order_item_name}.weight`} type="number"
                disabled component={Input} />
        </td>
        <td>
            <DeleteButton action={() => fields.remove(index)} />
        </td>
    </tr>

OrderItem.propTypes = {
    order_item_name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    index: PropTypes.number,
    fields: PropTypes.object
    // row_class_name: PropTypes.string,
    // deleteOrderItemAction: PropTypes.func.isRequired
}

export default OrderItem