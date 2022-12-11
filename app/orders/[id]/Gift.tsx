import { FC, useContext } from 'react'
import { Field } from 'react-final-form'
import type { OrderOptionsType } from '@/interfaces/orders'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { MainContext } from '@/options/context'
import { ConditionGte } from '@/shared/FormConditions'

const Gift: FC = () => <tr>
  <td colSpan={3}>
    <Field name="gift" component={FloatingFormGroup} />
  </td>
  <td colSpan={2} />
  <td>
    <Field name="gift_weight" disabled component={Input} />
  </td>
</tr>

export default function GiftIfNeeded() {
  const { options } = useContext(MainContext) as OrderOptionsType
  return <ConditionGte
    when="order_items_cost"
    gte={options?.Consts.SUM_FOR_GIFT}>
    <Gift />
  </ConditionGte>
}
