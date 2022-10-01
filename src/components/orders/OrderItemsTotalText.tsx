import React from 'react'
import { ConditionGte } from '../Shared/FormConditions'
import { OrderOptionsType } from '../../../interfaces'

const OrderItemsTotalText =
    ({ options }: OrderOptionsType): JSX.Element => <span>
        {options?.order_items_cost.label}
        <ConditionGte when="order_items_cost"
            gte={options?.Consts?.SUM_FOR_GIFT}>
            {' - '}{options?.need_gift.label}
        </ConditionGte>
    </span>

export default OrderItemsTotalText
