import PropTypes from 'prop-types'
import React from 'react'
import OrderItem from './OrderItem'
import OrderItemsTableFieldNames from './OrderItemsTableFieldNames'
import AddOrderItemButton from './AddOrderItemButton'
import OrderItemsTotals from '../orders/OrderItemsTotals'

const OrderItems = ({fields}) => <>
    {fields.map((orderItemName, index) =>
      <OrderItem key={index} {...{orderItemName, index, fields}} />
    )}
    {(fields.length > 1) && <OrderItemsTotals />}
  </>

OrderItems.propTypes = {
  fields: PropTypes.object,
}

export default OrderItems
