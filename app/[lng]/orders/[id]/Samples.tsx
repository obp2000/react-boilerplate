import { Field } from 'react-final-form'
import Input from '@/formInput/Input'
import Label from '@/inputLabel/Label'

export default function Samples() {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={5}>
      <Label name="samples" />
    </td>
    <td>
      <Field name="samples_weight" disabled component={Input} className='text-right w-20' />
    </td>
  </tr>
}
