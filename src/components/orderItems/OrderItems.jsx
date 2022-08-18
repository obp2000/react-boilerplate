import PropTypes from 'prop-types'
import React from 'react'
import OrderItem from './OrderItem'
import OrderItemsTotals from '../orders/OrderItemsTotals'
import {orderOrderItemOptions} from '../orders/hooks'

const OrderItems = ({fields, options, commonConsts}) => {
  const orderItemOptions = orderOrderItemOptions(options)
  return <>
    {fields.map((orderItemName, index) =>
      <OrderItem key={index} {...{
        orderItemName,
        index,
        fields,
        options: orderItemOptions,
        commonConsts,
      }} />
    )}
    {(fields.length > 1) && <OrderItemsTotals {...{options}} />}
  </>
}

OrderItems.propTypes = {
  fields: PropTypes.object,
  options: PropTypes.object,
  commonConsts: PropTypes.object,
}

export default OrderItems
