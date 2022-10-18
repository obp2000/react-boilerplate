import { Field } from 'react-final-form'
import type { OrderItemForm } from '../../../interfaces/orderItems'
import DropdownList from '../dropdownList/DropdownList'
import Input from '../formInput/Input'
import { useDropdown as useProductDropdownAttrs } from '../products/hooks'
import DeleteOrderItemButton from './DeleteOrderItemButton'

const OrderItem = ({ orderItemName, index }: OrderItemForm) => <tr>
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
      name={`${orderItemName}.price`}
      step={1}
      min={0}
      component={Input}
    />
  </td>
  <td>
    <Field
      name={`${orderItemName}.amount`}
      step={0.1}
      min={0}
      component={Input}
    />
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

export default OrderItem
