import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {ConditionGte} from '../Shared/FormConditions'

const OrderItemsTotalText = () => {
    const {
        options: {
            order_items_cost: orderItemsCost,
            need_gift: needGift,
            Consts,
        } = {}
    } = useOutletContext()
	return <span>
			{orderItemsCost?.label}
			<ConditionGte when="order_items_cost" gte={Consts?.SUM_FOR_GIFT}>
				{' - '}{needGift?.label}
			</ConditionGte>
		</span>
}

export default OrderItemsTotalText
