import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import OrderItemsTotalText from './OrderItemsTotalText'

const OrderItemsTotals = () => <tr>
        <td colSpan={3}>
          <OrderItemsTotalText />
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
