import { Translation } from '@/app/i18n/dictionaries'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { ConditionGte } from '@/objectForm/FormConditions'
import { Field } from 'react-final-form'
import consts from './consts.json'

function Gift({
  labels,
  busy,
}: {
  labels: Translation['order']
  busy: boolean
}) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td />
    <td>
      <Field name="gift"
        label={labels.gift}
        component={FloatingFormGroup}
        disabled={busy}
      />
    </td>
    <td colSpan={3} />
    <td>
      <Field name="gift_weight"
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
  </tr>
}

export default function GiftIfNeeded({
  labels,
  busy,
}: {
  labels: Translation['order']
  busy: boolean
}) {
  return <ConditionGte
    when="order_items_cost"
    gte={consts.SUM_FOR_GIFT}>
    <Gift {...{ labels, busy }} />
  </ConditionGte>
}
