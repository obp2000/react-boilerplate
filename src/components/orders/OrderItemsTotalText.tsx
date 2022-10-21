import { FC, useContext } from 'react'
import type { OrderOptionsType } from '../../../interfaces/orders'
import { OptionsContext } from '../layout/Layout'
import { ConditionGte } from '../Shared/FormConditions'

const OrderItemsTotalText: FC = () => {
  const { options } = useContext(OptionsContext) as OrderOptionsType
  return <span>
    {options?.order_items_cost.label}
    <ConditionGte
      when="order_items_cost" gte={options?.Consts?.SUM_FOR_GIFT}>
      {' - '}{options?.need_gift.label}
    </ConditionGte>
  </span>
}

export default OrderItemsTotalText
