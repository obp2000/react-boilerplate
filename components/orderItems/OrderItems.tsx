import { FC } from 'react'
import type { FieldArrayRenderProps } from 'react-final-form-arrays'
import OrderItem from './OrderItem'
import type { OrderItem as OrderItemType } from '@/interfaces/orderItems'

const OrderItems: FC<FieldArrayRenderProps<OrderItemType, HTMLElement>> =
  ({ fields }) => <>
    {fields.map((orderItemName, index) =>
      <OrderItem key={index} {...{ orderItemName, index }} />)}
  </>

export default OrderItems
