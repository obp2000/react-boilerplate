import React from 'react'
import type {FormProps} from 'react-final-form'
import type {FieldArrayRenderProps} from 'react-final-form-arrays'
import OrderItem from './OrderItem'
import OrderItemsTotals from '../orders/OrderItemsTotals'
import {orderOrderItemOptions} from '../orders/hooks'
import {OrderOptions, CommonConsts} from '../../../interfaces'

type Props = {
  // fields: any
  options: OrderOptions
  commonConsts: CommonConsts
  index: number
}

const OrderItems = ({fields, options, commonConsts}: Props): JSX.Element => {
  const orderItemOptions = orderOrderItemOptions(options)
  return <>
    {fields.map((orderItemName: string, index: number): JSX.Element =>
      <OrderItem key={index} {...{
        orderItemName,
        index,
        fields,
        options: orderItemOptions,
        commonConsts,
      }} />
    )}
    {(fields.length > 1) && <OrderItemsTotals {...{options}} />}
  </>
}

export default OrderItems
