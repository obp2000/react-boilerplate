import React from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import { ConditionGte } from '../Shared/FormConditions'
import { OrderOptions } from '../../../interfaces'

type GiftProps = {
  options: OrderOptions
}

const Gift = ({ options }: GiftProps): JSX.Element => <tr>
  <td colSpan={3}>
    <Field
      name="gift"
      component={FloatingFormGroup}
      {...{ options }}
    />
  </td>
  <td colSpan={2} />
  <td>
    <Field
      name="gift_weight"
      type="number"
      disabled
      component={Input}
    />
  </td>
</tr>

const GiftIfNeeded = ({ options }: GiftProps): JSX.Element =>
  <ConditionGte when="order_items_cost" gte={options?.Consts.SUM_FOR_GIFT}>
    <Gift {...{ options }} />
  </ConditionGte>

export default GiftIfNeeded
