import React from 'react'
import { Field } from 'react-final-form'
import Input from '../formInput/Input'
import OrderItemsTotalText from './OrderItemsTotalText'
import { OrderOptionsType } from '../../../interfaces'

const OrderItemsTotals = (props: OrderOptionsType): JSX.Element => <tr>
    <td colSpan={3}>
        <OrderItemsTotalText {...props} />
    </td>
    <td>
        <Field name="order_items_amount"
            type="number"
            disabled
            component={Input} />
    </td>
    <td>
        <Field name="order_items_cost"
            type="number"
            disabled
            component={Input} />
    </td>
    <td>
        <Field name="order_items_weight"
            type="number"
            disabled
            component={Input} />
    </td>
</tr>

export default OrderItemsTotals
