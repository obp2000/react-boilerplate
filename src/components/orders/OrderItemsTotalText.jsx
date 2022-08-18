import PropTypes from 'prop-types'
import React from 'react'
import {ConditionGte} from '../Shared/FormConditions'
import {useOrderItemsTotalText} from './hooks'

const OrderItemsTotalText = (props) => {
  	const {
	    orderItemsCostLabel,
	    needGiftLabel,
	    gte,
	 } = useOrderItemsTotalText(props)
  return <span>
    {orderItemsCostLabel}
    <ConditionGte when="order_items_cost" gte={gte}>
      {' - '}{needGiftLabel}
    </ConditionGte>
  </span>
}

OrderItemsTotalText.propTypes = {
  props: PropTypes.object,
}

export default OrderItemsTotalText
