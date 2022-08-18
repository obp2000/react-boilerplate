import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import Input from '../Shared/Input'
import OrderItemsTotalText from './OrderItemsTotalText'

const OrderItemsTotals = (props) => <tr>
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

OrderItemsTotals.propTypes = {
  props: PropTypes.object,
}

export default OrderItemsTotals
