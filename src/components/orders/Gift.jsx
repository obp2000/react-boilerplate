import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {useOutletContext} from 'react-router-dom'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import {ConditionGte} from '../Shared/FormConditions'

const Gift = () => <tr>
  <td colSpan={3}>
    <Field name="gift" component={FloatingFormGroup} />
  </td>
  <td colSpan={2}/>
  <td>
    <Field name="gift_weight" type="number" disabled component={Input} />
  </td>
</tr>

export default Gift

export const GiftIfNeeded = () =>  {
  const {options} = useOutletContext()
  return <ConditionGte
          when="order_items_cost"
          gte={options?.Consts.SUM_FOR_GIFT}>
          <Gift />
        </ConditionGte>
}
