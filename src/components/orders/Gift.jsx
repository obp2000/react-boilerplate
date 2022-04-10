import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'

const Condition = ({ when, is, children }) =>
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>

const Gift = props => <tr>
        <td>
            <Field name="need_gift" component="input"
                type="checkbox" hidden />
        </td>
        <td>
            <Field name="gift" {...props} component={FloatingFormGroup} />
        </td>
        <td/>
        <td/>
        <td/>
        <td>
            <Field name="gift_weight" type="number" disabled
                component={Input} />
        </td>
    </tr>

const GiftIfNeeded = props =>
    <Condition when="need_gift" is={true}>
        <Gift {...props} />
    </Condition>

export default GiftIfNeeded
