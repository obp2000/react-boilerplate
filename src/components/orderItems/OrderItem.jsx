import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import DropdownList from '../dropdownList/DropdownList'
import Input from '../Shared/Input'
import {useOrderItemOptions, useProductDropdown} from './hooks'
import DeleteOrderItemButton from './DeleteOrderItemButton'

const OrderItem = ({
  orderItemName,
  index,
  fields,
}) => {
  const options = useOrderItemOptions()
  const productDropdownAttrs = useProductDropdown()
  // console.log('orderItemName ', orderItemName)
  // console.log('fields ', fields)
  return <tr>
    <th scope="row">
      {index + 1}
    </th>
    <td className="min-vw-35">
      <Field
        name={[orderItemName, 'product'].join('.')}
        component={DropdownList}
        {...productDropdownAttrs}
        {...{options}}
        containerClassName='form-field'
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.price`}
        type='number'
        {...{options}}
        step={1}
        min={0}
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.amount`}
        type='number'
        {...{options}}
        step={0.1}
        min={0}
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.cost`}
        type="number"
        {...{options}}
        disabled
        component={Input}
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.weight`}
        type="number"
        {...{options}}
        disabled
        component={Input}
      />
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
