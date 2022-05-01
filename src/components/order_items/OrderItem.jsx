import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import { config as productsConfig } from '../redux/Products'
import ProductName from '../products/ProductName'
import DropdownList from '../Shared/DropdownList'
import Input from '../Shared/Input'
import { DeleteOrderItemButton } from '../Shared/DeleteButton'

const OrderItem = ({
    order_item_name,
    index,
    product_labels,
    tableLabels,
    deleteObjectAction,
    ...consts
}) => <tr>
        <th scope="row">
            {index+1}
        </th>
        <td className="min-vw-35">
            <Field  name={`${order_item_name}.product`}
                    label={tableLabels[0]}
                    containerClassName='form-field'
                    component={DropdownList}
                    dataKey='id'
                    textField={item => ProductName(item, product_labels)}
                    search_path={productsConfig.searchUrl}
                    renderListItem={({ item }) => ProductName(item, product_labels)}
                    renderValue={({ item }) => ProductName(item, product_labels)}
            />
        </td>
        <td>
            <Field  name={`${order_item_name}.price`}
                    type='number'
                    label={tableLabels[1]}
                    step={1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.amount`}
                    type='number'
                    label={tableLabels[2]}
                    step={0.1}
                    min={0}
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.cost`}
                    type="number"
                    label={tableLabels[3]}
                    disabled
                    component={Input} />
        </td>
        <td>
            <Field  name={`${order_item_name}.weight`}
                    type="number"
                    label={tableLabels[4]}
                    disabled
                    component={Input} />
        </td>
        <td>
            <DeleteOrderItemButton {...{id: index,
                                        deleteObjectAction,
                                       ...consts}} />
        </td>
    </tr>

OrderItem.propTypes = {
    order_item_name: PropTypes.string,
    index: PropTypes.number,
    product_labels: PropTypes.object,
    tableLabels: PropTypes.array,
    deleteObjectAction: PropTypes.func
}

export default OrderItem
