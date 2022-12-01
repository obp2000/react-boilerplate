import DropdownList from '@/dropdownList/DropdownList'
import Input from '@/formInput/Input'
import type { OrderItemForm } from '@/interfaces/orderItems'
import { useDropdown as useProductDropdownAttrs } from '@/app/products/hooks'
import { Field } from 'react-final-form'
import DeleteOrderItemButton from './DeleteOrderItemButton'

export default function OrderItem({ orderItemName, index }: OrderItemForm) {
  return <tr>
    <th scope="row">
      {index + 1}
    </th>
    <td className="min-vw-35">
      <Field
        name={[orderItemName, 'product'].join('.')}
        component={DropdownList}
        {...useProductDropdownAttrs()}
        containerClassName='form-field'
      />
    </td>
    <td>
      <Field
        name={`${orderItemName}.price`} step={1} min={0} component={Input} />
    </td>
    <td>
      <Field
        name={`${orderItemName}.amount`} step={0.1} min={0} component={Input} />
    </td>
    <td>
      <Field name={`${orderItemName}.cost`} disabled component={Input} />
    </td>
    <td>
      <Field name={`${orderItemName}.weight`} disabled component={Input} />
    </td>
    <td>
      <DeleteOrderItemButton {...{ index }} />
    </td>
  </tr>
}
