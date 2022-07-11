import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {useOutletContext} from 'react-router-dom'
import productsConfig from '../products/config'
import DropdownList from '../Shared/DropdownList'
import Input from '../Shared/Input'
import DeleteOrderItemButton from './DeleteOrderItemButton'
import ProductName from '../products/ProductName'
import {useOrderItemOptions, orderItemProductOptions} from './options'

const OrderItem = ({
  orderItemName,
  index,
  fields,
}) => {
  const options = useOrderItemOptions()
  const productOptions = orderItemProductOptions(options)
  const renderProduct = ({item}) =>
    <ProductName {...item} options={productOptions} />
  return <tr>
    <th scope="row">
      {index+1}
    </th>
    <td className="min-vw-35">
      <Field name={`${orderItemName}.product`}
        // placeholder={options?.product?.label}
        options={options}
        containerClassName='form-field'
        component={DropdownList}
        textField={({
          get_product_type_display: getProductTypeDisplay,
          get_threads_display: getThreadsDisplay,
          get_contents_display: getContentsDisplay,
          name,
        }) => [
            getProductTypeDisplay,
            getThreadsDisplay,
            getContentsDisplay,
            name,
          ]}
        searchPath={productsConfig.searchUrl}
        renderListItem={renderProduct}
        renderValue={renderProduct}
      />
    </td>
    <td>
      <Field name={`${orderItemName}.price`}
        type='number'
        options={options}
        step={1}
        min={0}
        component={Input} />
    </td>
    <td>
      <Field name={`${orderItemName}.amount`}
        type='number'
        options={options}
        step={0.1}
        min={0}
        component={Input} />
    </td>
    <td>
      <Field name={`${orderItemName}.cost`}
        type="number"
        options={options}
        disabled
        component={Input} />
    </td>
    <td>
      <Field name={`${orderItemName}.weight`}
        type="number"
        options={options}
        disabled
        component={Input} />
    </td>
    <td>
      <DeleteOrderItemButton {...{index, fields}} />
    </td>
  </tr>
}

OrderItem.propTypes = {
  orderItemName: PropTypes.string,
  index: PropTypes.number,
  fields: PropTypes.object,
}

export default OrderItem
