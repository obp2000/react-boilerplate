import { Field } from 'react-final-form'
import Input from '@/formInput/Input'
import Label from '@/inputLabel/Label'

export default function OrderTotals() {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={4}>
      <Label name="total_sum" />
    </td>
    <td>
      <Field name="total_sum" disabled component={Input} className='text-right w-20' />
    </td>
    <td>
      <Field name="total_weight" disabled component={Input} className='text-right w-20' />
    </td>
  </tr>
}
