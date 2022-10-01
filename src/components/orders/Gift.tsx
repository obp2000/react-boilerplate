import React from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import { ConditionGte } from '../Shared/FormConditions'
import { OrderOptionsType } from '../../../interfaces'

const Gift = ({ options }: OrderOptionsType): JSX.Element => <tr>
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

const GiftIfNeeded = ({ options }: OrderOptionsType): JSX.Element =>
  <ConditionGte when="order_items_cost" gte={options?.Consts.SUM_FOR_GIFT}>
    <Gift {...{ options }} />
  </ConditionGte>

export default GiftIfNeeded
