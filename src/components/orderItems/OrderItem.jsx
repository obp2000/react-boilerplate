import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import {useProductDropdown} from './hooks'
import {orderOrderItemOptions} from '../orders/hooks'
import DeleteOrderItemButton from './DeleteOrderItemButton'

const OrderItem = ({
  orderItemName,
  ...props
}) => {
  const options = {options: props.options}
  // console.log('fields ', fields)
  return <tr>
    <th scope="row">
      {props.index + 1}
    </th>
    <td className="min-vw-35">
      <Field
        name={[orderItemName, 'product'].join('.')}
        {...useProductDropdown(props)}
        containerClassName='form-field'
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.price`}
        type='number'
        {...options}
        step={1}
        min={0}
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.amount`}
        type='number'
        {...options}
        step={0.1}
        min={0}
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.cost`}
        type="number"
        {...options}
        disabled
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.weight`}
        type="number"
        {...options}
        disabled
        component={Input}
      />
    </td>
    <td>
      <DeleteOrderItemButton {...props} />
    </td>
  </tr>
}

OrderItem.propTypes = {
  orderItemName: PropTypes.string,
  props: PropTypes.object,
}

export default OrderItem
