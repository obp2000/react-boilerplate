import React from 'react'
import { Field } from 'react-final-form'
import type { FieldArrayRenderProps } from 'react-final-form-arrays'
import Input from '../formInput/Input'
import { orderOrderItemOptions } from '../orders/hooks'
import { useDropdown as useProductDropdownAttrs } from '../products/hooks'
import { orderItemProductOptions } from './hooks'

import DropdownList from '../dropdownList/DropdownList'
import DeleteOrderItemButton from './DeleteOrderItemButton'
import {
  OrderOptions,
  CommonConsts,
  OrderItem,
} from '../../../interfaces'

type OrderItemProps = FieldArrayRenderProps<OrderItem, HTMLElement> & {
  orderItemName: string
  index: number
  options: OrderOptions
  commonConsts: CommonConsts
}

const OrderItem = ({
  orderItemName,
  ...props
}: OrderItemProps): JSX.Element => {
  const orderItemOptions = orderOrderItemOptions(props.options)
  const productOptions = orderItemProductOptions(orderItemOptions)
  const options = { options: orderItemOptions }
  return <tr>
    <th scope="row">
      {props.index + 1}
    </th>
    <td className="min-vw-35">
      <Field
        name={[orderItemName, 'product'].join('.')}
        component={DropdownList}
        {...useProductDropdownAttrs(productOptions)}
        options={props.options}
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

export default OrderItem
