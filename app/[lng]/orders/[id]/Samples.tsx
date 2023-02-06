import { Field } from 'react-final-form'
import Input from '@/formInput/Input'
import Label from '@/inputLabel/Label'
import { Translation } from '@/app/i18n/dictionaries'

export default function Samples({ labels }: { labels: Translation['order'] }) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={5}>
      <Label name="samples"
        label={labels.samples}
      />
    </td>
    <td>
      <Field name="samples_weight"
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
  </tr>
}
