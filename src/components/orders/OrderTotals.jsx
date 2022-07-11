import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import Label from '../Shared/Label'

const OrderTotals = () => <tr>
        <td colSpan={4}>
            <Label name="total_sum" />
        </td>
        <td>
            <Field name="total_sum"
              type="number"
              disabled
              component={Input} />
        </td>
        <td>
            <Field name="total_weight"
                  type="number"
                  disabled
                  component={Input} />
        </td>
    </tr>

export default OrderTotals
