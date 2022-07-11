import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {ConditionGte} from '../Shared/FormConditions'

const OrderItemsTotalText = () => {
	const {options} = useOutletContext()
    const order_items_cost_label = options?.order_items_cost.label
    const need_gift_label = options?.need_gift.label
    const sumForGift = options?.Consts.SUM_FOR_GIFT
	return <span>
			{order_items_cost_label}
			<ConditionGte when="order_items_cost" gte={sumForGift}>
				{' - '}{need_gift_label}
			</ConditionGte>
		</span>

}

export default OrderItemsTotalText
