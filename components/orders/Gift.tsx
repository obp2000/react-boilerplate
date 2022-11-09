import { FC, useContext } from 'react'
import { Field } from 'react-final-form'
import type { OrderOptionsType } from '@/interfaces/orders'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { MainContext } from '@/services/context'
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

const GiftIfNeeded = (): JSX.Element => {
  const { options } = useContext(MainContext) as OrderOptionsType
  return <ConditionGte
    when="order_items_cost"
    gte={options?.Consts.SUM_FOR_GIFT}>
    <Gift />
  </ConditionGte>
}

export default GiftIfNeeded
