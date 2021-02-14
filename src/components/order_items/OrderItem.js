import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'redux-form'
// import ProductCombobox from '../products/Containers/ProductCombobox'
import comboboxComponent from '../renderCombobox'
// import renderField from '../RenderField'
import NumberField from '../Shared/NumberField'
import DeleteButton from '../Shared/DeleteButton'

const OrderItem = ({index, 
                    order_item_name, 
                    fields, 
                    price, 
                    amount, 
                    cost,
                    weight,
                    density, 
                    width, 
                    _destroy,
                    onChangeProduct,
                    onSelectProduct,
                    products}) => {
    return <tr className={((_destroy == true)
        ? 'd-none'
        : 'd-flex')}>
        <th scope="row" className="col-sm-1">{index + 1}</th>
        <td className="col-sm-6">
            <Field name={`${order_item_name}.product`}   
                   component={comboboxComponent} 
                   data={products.search_products}
                   textField='name'
                   onChange={onChangeProduct}
                   onSelect={obj => onSelectProduct(obj, order_item_name)}
                   inputProps={{
                        style: {fontSize: "14px"}
                   }}         
            />
        </td>
        <td className="col-sm-1">
            <NumberField name={`${order_item_name}.price`} label="Цена"/>
        </td>
        <td className="col-sm-1">
            <NumberField name={`${order_item_name}.amount`} label="Количество" step="0.1" />
        </td>
        <td className="col-sm-1 text-right">
            {cost.toFixed(2)}
        </td>
        <td className="col-sm-1 text-right">
            {weight.toFixed(0)}
        </td>
        <td className="col-sm-1">
            <DeleteButton action={() => fields.remove(index)} />
        </td>
    </tr>
}

OrderItem.propTypes = {
    index: PropTypes.number,
    order_item_name: PropTypes.string,
    fields: PropTypes.object,
    cost: PropTypes.number,
    weight: PropTypes.number,
    onChangeProduct: PropTypes.func,
    onSelectProduct: PropTypes.func,
    products: PropTypes.object
}

OrderItem.defaultProps = {
    fields: {},
    cost: 0,
    weight: 0
}

export default OrderItem
