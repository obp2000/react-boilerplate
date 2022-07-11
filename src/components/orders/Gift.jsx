import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'

const Gift = () => <tr>
  <td colSpan={3}>
{/*    <Field name="need_gift"
      component="input"
      type="checkbox"
      hidden />*/}
    <Field name="gift" component={FloatingFormGroup} />
  </td>
  <td colSpan={2}/>
  <td>
    <Field name="gift_weight" type="number" disabled component={Input} />
  </td>
</tr>

export default Gift
