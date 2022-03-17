import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
// import NumberField from '../Shared/NumberField'
import Input from '../Shared/Input'
import DeleteButton from '../Shared/DeleteButton'
import DropdownList from '../Shared/DropdownList'
import { Actions } from '../redux/Products'
import ProductName from '../products/ProductName'

const OrderItem = ({
    order_item_name,
    price,
    amount,
    index,
    // row_class_name,
    // deleteOrderItemAction,
    fields,
    options: {
        product: {
            label: product_label,
            children: product_props = {}
        } = {},
        price: {
            label: price_label
        } = {},
        amount: {
            label: amount_label
        } = {},
        cost: {
            label: cost_label
        } = {},
        weight: {
            label: weight_label
        } = {}
    } = {},
    common_consts
}) => <tr>
        <th scope="row">
            {index+1}
        </th>
        <td className="min-vw-35">
            <Field  name={`${order_item_name}.product`}
                    label={product_label}
                    containerClassName='form-field'
                    component={DropdownList}
                    dataKey='id'
                    textField={item => ProductName(item, product_props)}
                    search_path={Actions.getSearchPath()}
                    renderListItem={({ item }) => ProductName(item, product_props)}
                    renderValue={({ item }) => ProductName(item, product_props)}
                    />
        </td>
        <td>
            <Field  name={`${order_item_name}.price`}
                    type='number'
                    label={price_label}
                    step={1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.amount`}
                    type='number'
                    label={amount_label}
                    step={0.1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.cost`}
                    type="number"
                    label={cost_label}
                    disabled
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.weight`}
                    type="number"
                    label={weight_label}
                    disabled
                    component={Input} />
        </td>
        <td>
            <DeleteButton action={() => fields.remove(index)} {...common_consts} />
        </td>
    </tr>

OrderItem.propTypes = {
    order_item_name: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    index: PropTypes.number,
    fields: PropTypes.object,
    product_label: PropTypes.string,
    price_label: PropTypes.string,
    amount_label: PropTypes.string,
    cost_label: PropTypes.string,
    weight_label: PropTypes.string,
    common_consts: PropTypes.object
    // options: PropTypes.object
    // row_class_name: PropTypes.string,
    // deleteOrderItemAction: PropTypes.func.isRequired
}

export default OrderItem