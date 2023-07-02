'use client'

import Select from '@/app/_objects/Select'
import { useMutate } from '@/app/_objects/hooks'
import Button from '@/app/components/Button'
import { getGetOptionLabel } from '@/app/customer/helpers'
import deliveryTypeChoices from '@/app/order/deliveryType.json'
import packetChoices from '@/app/order/packet.json'
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
import { TextField } from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback, useTransition } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler
} from "react-hook-form"
import renderCustomer from './Customer'
import { orderItemsCost } from "./OrderItemsTotals"
import PostCostButton from './PostCostButton'
import PostCostWithPacket from './PostCostWithPacket'
import PostDiscount from './PostDiscount'
import TotalPostals from './TotalPostals'
import TotalSum from './TotalSum'
import TotalWeight from './TotalWeight'
import consts from './consts.json'
import AddButton from './orderItems/AddButton'
import OrdeItem from './orderItems/OrderItem'
import { inputDecimal } from '@/app/_objects/formHelpers'

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
  labels: {
    customer,
    deliveryType,
    deliveryTypeLabels,
    address,
    postCost,
    packet,
    packetLabels,
    postCostWithPacket,
    postDiscount,
    samples,
    orderItem: {
      product,
      price,
      amount,
      cost,
      weight,
    },
    ...labels
  },
  customerLabels,
  productLabels,
}: OrderFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
      isValid
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
  // const getCustomerOptionLabel = getGetOptionLabel(customerLabels)
  return <>
    <div className={`grid grid-cols-3 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
      <Controller
        name="customer"
        control={control}
        render={renderCustomer({
          label: customer,
          getOptionLabel: getGetOptionLabel(customerLabels),
          busy,
          errorMessages,
          notFound,
        })} />
      <Select
        {...{
          name: 'deliveryType',
          control,
          label: deliveryType,
          choices: deliveryTypeChoices,
          busy,
          choiceLabels: deliveryTypeLabels,
        }} />
      <TextField {...register('address')}
        className='col-span-2'
        label={address}
        size="small"
        disabled={busy}
      />
    </div>
    <table className="min-w-full text-sm border-collapse">
      <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
        <tr>
          <th scope='col' className='px-6 py-4'>
            #
          </th>
          <th scope='col' className='px-6 py-4'>
            {product}
          </th>
          <th scope='col' className='px-6 py-4'>
            {price}
          </th>
          <th scope='col' className='px-6 py-4'>
            {amount}
          </th>
          <th scope='col' className='px-6 py-4' align='right'>
            {cost}, ₽
          </th>
          <th scope='col' className='px-6 py-4' align='right'>
            {weight}, {units.gram_short}
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
            register,
            errorMessages,
            units,
            productLabels,
            busy,
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
            register,
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
              <TextField
                {...register('postCost')}
                label={postCost}
                type="number"
                variant="outlined"
                size="small"
                disabled={busy}
                inputProps={inputDecimal}
              />
              <Select
                {...{
                  name: 'packet',
                  control,
                  label: packet,
                  choices: packetChoices,
                  busy,
                  choiceLabels: packetLabels,
                }} />
              <PostCostWithPacket {...{ watch, label: postCostWithPacket }} />
              <PostDiscount {...{ watch, label: postDiscount }} />
            </div>
          </td>
          <td className='whitespace-nowrap py-4' align='left'>
            <PostCostButton {...{
              watch,
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
            {consts.PACKET_WEIGHT}({packet}) + {consts.SAMPLES_WEIGHT}({samples})
          </td>
        </tr>
        <tr className='border-b dark:border-neutral-500'>
          <td className='whitespace-nowrap px-6 py-4' />
          <td className='whitespace-nowrap px-6 py-4'>
            <Button
              aria-labelledby={save}
              disabled={busy || !isDirty || !isValid}
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
  </>
}
