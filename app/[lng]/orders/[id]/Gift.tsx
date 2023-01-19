import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { ConditionGte } from '@/objectForm/FormConditions'
import { Field } from 'react-final-form'
import consts from './consts.json'

function Gift() {
  return <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td />
    <td>
      <Field name="gift" component={FloatingFormGroup} />
    </td>
    <td colSpan={3} />
    <td>
      <Field name="gift_weight" disabled component={Input} className='text-right w-20' />
    </td>
  </tr>
}

export default function GiftIfNeeded() {
  return <ConditionGte
    when="order_items_cost"
    gte={consts.SUM_FOR_GIFT}>
    <Gift />
  </ConditionGte>
}
