import type { OrderItem as OrderItemType } from '@/interfaces/orderItems'
import type { FieldArrayRenderProps } from 'react-final-form-arrays'
import OrderItem from './OrderItem'

export default function OrderItems({
  fields
}: FieldArrayRenderProps<OrderItemType, HTMLElement>) {
  return <>
    {fields.map((orderItemName, index) =>
      <OrderItem key={index} {...{ orderItemName, index }} />)}
  </>
}
