import { useContext } from 'react'
import type { OrderOptionsType } from '@/interfaces/orders'
import { MainContext } from '@/options/context'
import { ConditionGte } from '@/shared/FormConditions'

export default function OrderItemsTotalText() {
  const { options } = useContext(MainContext) as OrderOptionsType
  return <span>
    {options?.order_items_cost.label}
    <ConditionGte
      when="order_items_cost" gte={options?.Consts?.SUM_FOR_GIFT}>
      {' - '}{options?.need_gift.label}
    </ConditionGte>
  </span>
}
