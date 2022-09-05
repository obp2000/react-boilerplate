import {Field} from 'react-final-form'
// import type {FormProps} from 'react-final-form'
import Input from '../Shared/Input'
import {orderOrderItemOptions} from '../orders/hooks'
import {useDropdown as useProductDropdownAttrs} from '../products/hooks'
import {orderItemProductOptions} from './hooks'

import DropdownList from '../dropdownList/DropdownList'
import DeleteOrderItemButton from './DeleteOrderItemButton'
import {
  OrderOptions,
  CommonConsts
} from '../../../interfaces'

type OrderItemProps = {
  orderItemName: string
  index: number
  fields: any
  options: OrderOptions
  commonConsts: CommonConsts
  onSubmit: () => void
}

const OrderItem = ({
  orderItemName,
  ...props
}: OrderItemProps): JSX.Element => {
  const options = {options: orderOrderItemOptions(props.options)}
  // console.log('fields ', fields)
  return <tr>
    <th scope="row">
      {props.index + 1}
    </th>
    <td className="min-vw-35">
      <Field
        name={[orderItemName, 'product'].join('.')}
        component={DropdownList}
        {...useProductDropdownAttrs(orderItemProductOptions(orderOrderItemOptions(props.options)))}
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
