import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import Label from '../Shared/Label'

const Samples = () => <tr>
  <td colSpan={5}>
    <Label name="samples" />
  </td>
  <td>
    <Field name="samples_weight"
      type="number"
      disabled
      component={Input} />
  </td>
</tr>

export default Samples
