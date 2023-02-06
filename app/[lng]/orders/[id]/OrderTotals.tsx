import { Field } from 'react-final-form'
import Input from '@/formInput/Input'
import Label from '@/inputLabel/Label'
import { Translation } from '@/app/i18n/dictionaries'

export default function OrderTotals({ labels }: { labels: Translation['order'] }) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={4}>
      <Label name="total_sum"
        label={labels.total_sum}
      />
    </td>
    <td>
      <Field name="total_sum"
        label={labels.total_sum}
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
    <td>
      <Field name="total_weight"
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
  </tr>
}
