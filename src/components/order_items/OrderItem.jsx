import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import { Actions } from '../redux/Products'
import ProductName from '../products/ProductName'
import DropdownList from '../Shared/DropdownList'
import Input from '../Shared/Input'
import DeleteButton from '../Shared/DeleteButton'

const OrderItem = ({
    order_item_name,
    index,
    product_labels,
    tableLabels,
    deleteObjectAction,
}) => <tr>
        <th scope="row">
            {index+1}
        </th>
        <td className="min-vw-35">
            <Field  name={`${order_item_name}.product`}
                    label={tableLabels.product_label}
                    containerClassName='form-field'
                    component={DropdownList}
                    dataKey='id'
                    textField={item => ProductName(item, product_labels)}
                    search_path={Actions.search_url}
                    renderListItem={({ item }) => ProductName(item, product_labels)}
                    renderValue={({ item }) => ProductName(item, product_labels)}
            />
        </td>
        <td>
            <Field  name={`${order_item_name}.price`}
                    type='number'
                    label={tableLabels.price_label}
                    step={1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.amount`}
                    type='number'
                    label={tableLabels.amount_label}
                    step={0.1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.cost`}
                    type="number"
                    label={tableLabels.cost_label}
                    disabled
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.weight`}
                    type="number"
                    label={tableLabels.weight_label}
                    disabled
                    component={Input} />
        </td>
        <td>
            <DeleteButton {...{id: index, deleteObjectAction}} />
        </td>
    </tr>

OrderItem.propTypes = {
    order_item_name: PropTypes.string,
    index: PropTypes.number,
    product_labels: PropTypes.object,
    tableLabels: PropTypes.object,
    deleteObjectAction: PropTypes.func
}

export default OrderItem
