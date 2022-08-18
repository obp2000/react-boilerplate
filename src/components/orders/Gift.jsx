import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import {ConditionGte} from '../Shared/FormConditions'
import {useGiftIfNeeded} from './hooks'

const Gift = () => <tr>
  <td colSpan={3}>
    <Field
      name="gift"
      component={FloatingFormGroup}
    />
  </td>
  <td colSpan={2}/>
  <td>
    <Field
      name="gift_weight"
      type="number"
      disabled
      component={Input}
    />
  </td>
</tr>

export default Gift

export const GiftIfNeeded = (props) => {
  const {gte} = useGiftIfNeeded(props)
  return <ConditionGte when="order_items_cost" gte={gte}>
    <Gift />
  </ConditionGte>
}
