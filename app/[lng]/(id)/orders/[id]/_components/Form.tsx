'use client'

import { useMutate } from '@/app/_objects/hooks'
import Button from '@/app/components/Button'
import { struct } from '@/app/order/struct'
import {
  getGetOptionLabel as getGetProductOptionLabel
} from '@/app/product/helpers'
import type {
  OrderFormProps,
  SerializedOrderObject,
  Values
} from '@/interfaces/orders'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import dynamic from 'next/dynamic'
import { useCallback, useTransition } from 'react'
import {
  useFieldArray,
  useForm,
  type SubmitHandler,
  type FieldErrors
} from "react-hook-form"
import Address from './Address'
import CustomerField from './CustomerField'
import DeliveryType from './DeliveryType'
import { orderItemsCost } from "./OrderItemsCost"
import Packet from './Packet'
import PostCost from './PostCost'
import PostCostButton from './PostCostButton'
import PostCostWithPacket from './PostCostWithPacket'
import PostDiscount from './PostDiscount'
import TotalPostals from './TotalPostals'
import TotalSum from './TotalSum'
import TotalWeight from './TotalWeight'
import consts from './consts.json'
import AddButton from './orderItems/AddButton'
import OrdeItem from './orderItems/OrderItem'

const OrderItemsTotals = dynamic(() => import('./OrderItemsTotals'), {
  ssr: false,
})

function needGift(orderItems?:
  SerializedOrderObject['orderItems']) {
  return orderItemsCost(orderItems) >= consts.SUM_FOR_GIFT
}

export default function FormComp({
  mutateArgs,
  initialValues,
  save,
  add,
  textDelete,
  notFound,
  count,
  errorMessages,
  label,
  okText,
  cancelText,
  units,
  labels,
  customerLabels,
  productLabels,
}: OrderFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
    } } = useForm({
      defaultValues: initialValues,
      resolver: superstructResolver(struct)
    })
  const getProductOptionLabel = getGetProductOptionLabel(productLabels)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orderItems',
  })
  const [
    orderItems,
  ] = watch([
    'orderItems',
  ])
  const giftNeeded = needGift(orderItems)
  console.log('errors ', errors)
  // console.log('fields ', fields)
  const toValues = useCallback(({
    customer,
    orderItems,
    createdAt,
    ...values
  }: SerializedOrderObject) => {
    const orderItemsUnchecked = orderItems.map(({
      product,
      ...orderItemValues
    }) => ({
      productId: product?.id,
      ...orderItemValues
    })
    )
    return onSubmit({
      customerId: customer?.id,
      orderItems: orderItemsUnchecked,
      ...values
    })
  }, [onSubmit])
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(toValues)()
  }, [handleSubmit, toValues])
  const busy = isPending
  return <>
    <div className={`grid grid-cols-3 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
      <CustomerField {...{
        labels,
        customerLabels,
        busy,
        errors,
        errorMessages,
        notFound,
        control,
        initialValues
      }} />
      <DeliveryType {...{ control, labels, busy }} />
      <Address {...{ control, labels, busy }} />
    </div>
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                {labels.orderItem.product}
              </th>
              <th scope='col' className='px-6 py-4'>
                {labels.orderItem.price}
              </th>
              <th scope='col' className='px-6 py-4'>
                {labels.orderItem.amount}
              </th>
              <th scope='col' className='px-6 py-4' align='right'>
                {labels.orderItem.cost}, ₽
              </th>
              <th scope='col' className='px-6 py-4' align='right'>
                {labels.orderItem.weight}, {units.gram_short}
              </th>
              <th scope='col' className='px-6 py-4'>
                <AddButton {...{ add, append, busy }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((initOrderItem, index) => <OrdeItem
              key={initOrderItem.id}
              {...{
                index,
                getProductOptionLabel,
                control,
                errors: errors?.orderItems?.[index] as FieldErrors['root'],
                errorMessages,
                labels,
                units,
                productLabels,
                busy,
                initOrderItem,
                orderItem: orderItems[index],
                label,
                okText,
                cancelText,
                textDelete,
                notFound,
                remove,
                setValue,
              }}
            />)}
            {((Number(fields?.length) > 1) || giftNeeded) &&
              <OrderItemsTotals {...{
                control,
                labels,
                busy,
                watch,
                units,
                giftNeeded,
              }} />}
            <tr className='border-b dark:border-neutral-500 mt-1'>
              <td className='whitespace-nowrap px-6 py-4' align='right' />
              <td className='whitespace-nowrap px-6 py-4'>
                <div className={`grid grid-cols-4 gap-1 ${busy ? 'opacity-70' : ''}`}>
                  <PostCost {...{ control, labels, busy }} />
                  <Packet {...{ control, labels, busy }} />
                  <PostCostWithPacket {...{ watch, labels }} />
                  <PostDiscount {...{ watch, labels }} />
                </div>
              </td>
              <td className='whitespace-nowrap py-4' align='left'>
                <PostCostButton {...{
                  watch,
                  labels,
                  busy,
                  setValue,
                  count,
                  giftNeeded,
                }} />
              </td>
              <td className='whitespace-nowrap px-6 py-4' />
              <td className='whitespace-nowrap px-6 py-4' align='right'>
                <TotalPostals {...{ watch }} />
              </td>
              <td className='whitespace-nowrap px-6 py-4' align='left' colSpan={2}>
                {consts.PACKET_WEIGHT}({labels.packet}) + {consts.SAMPLES_WEIGHT}({labels.samples})
              </td>
            </tr>
            <tr className='border-b dark:border-neutral-500'>
              <td className='whitespace-nowrap px-6 py-4' />
              <td className='whitespace-nowrap px-6 py-4'>
                <Button
                  aria-labelledby={save}
                  disabled={busy || !isDirty}
                  onClick={() => startTransition(onSubmitButtonClick)}
                >
                  {save}
                </Button>
              </td>
              <td className='whitespace-nowrap px-6 py-4' />
              <td className='whitespace-nowrap px-6 py-4' align="right">
                {labels.totalSum}
              </td>
              <td className='whitespace-nowrap px-6 py-4' align='right'>
                <TotalSum {...{ watch }} />
              </td>
              <td className='whitespace-nowrap px-6 py-4' align='right'>
                <TotalWeight {...{ watch, giftNeeded }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}
