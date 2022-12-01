import { Field } from 'react-final-form'
import Input from '@/formInput/Input'
import Label from '@/inputLabel/Label'

export default function OrderTotals() {
  return <tr>
    <td colSpan={4}>
      <Label name="total_sum" />
    </td>
    <td>
      <Field name="total_sum" disabled component={Input} />
    </td>
    <td>
      <Field name="total_weight" disabled component={Input} />
    </td>
  </tr>
}
