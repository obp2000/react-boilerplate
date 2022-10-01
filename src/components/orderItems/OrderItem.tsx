import React from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import { useDropdown as useProductDropdownAttrs } from '../products/hooks'
import DropdownList from '../dropdownList/DropdownList'
import DeleteOrderItemButton from './DeleteOrderItemButton'
import type { OrderItemFormRender } from '../../../interfaces'

type Props = OrderItemFormRender & {
  orderItemName: string
  index: number
}

const OrderItem = ({ orderItemName, ...props }: Props): JSX.Element => {
  const orderItemOptions = props.options?.order_items?.child?.children
  const productOptions = orderItemOptions?.product?.children
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
