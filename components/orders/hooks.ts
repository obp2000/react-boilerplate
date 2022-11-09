import { useContext } from 'react'
import type {
  OrderType,
  OrderOptionsType,
  OrderFormValues
} from '@/interfaces/orders'
import { formInitialOrderItems } from '@/orderItems/config'
import {
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight,
  postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight
} from './calculator'
import { MainContext } from '@/services/context'

export const useFormInitialValues = ({
  object,
}: OrderType): OrderFormValues => {
  const { options } = useContext(MainContext) as OrderOptionsType
  const orderItems = {
    order_items: formInitialOrderItems(object?.order_items),
  }
  let objectValues = {
    ...object,
    consts: options?.Consts,
    samples_weight: options?.Consts.SAMPLES_WEIGHT,
    packet_weight: options?.Consts.PACKET_WEIGHT,
    gift_weight: options?.Consts.GIFT_WEIGHT,
    ...orderItems,
    order_items_amount: orderItemsAmount(null, orderItems),
    order_items_cost: orderItemsCost(null, orderItems),
    order_items_weight: orderItemsWeight(null, orderItems),
  }
  objectValues = {
    ...objectValues,
    post_cost_with_packet: postCostWithPacket(null, objectValues),
    post_discount: postDiscount(null, objectValues),
    total_postals: totalPostals(null, objectValues),
  }
  return {
    ...objectValues,
    total_sum: totalSum(null, objectValues),
    total_weight: totalWeight(null, objectValues),
  }
}
