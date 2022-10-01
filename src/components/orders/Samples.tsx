import React from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import Label from '../inputLabel/Label'
import { OrderOptionsType } from '../../../interfaces'

const Samples = ({ options }: OrderOptionsType): JSX.Element => <tr>
    <td colSpan={5}>
        <Label name="samples" {...{ options }} />
    </td>
    <td>
        <Field name="samples_weight"
            type="number"
            disabled
            component={Input} />
    </td>
</tr>

export default Samples