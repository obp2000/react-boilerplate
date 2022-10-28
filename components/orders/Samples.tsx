import { FC } from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import Label from '../inputLabel/Label'

const Samples: FC = () => <tr>
  <td colSpan={5}>
    <Label name="samples" />
  </td>
  <td>
    <Field name="samples_weight" disabled component={Input} />
  </td>
</tr>

export default Samples
