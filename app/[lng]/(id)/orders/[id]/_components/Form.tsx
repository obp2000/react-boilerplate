'use client'

import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { useFieldArray, useForm } from "react-hook-form"

import Autocomplete from '@/app/_objects/Autocomplete'
import Select from '@/app/_objects/Select'
import {
  floatValue, inputDecimal
} from '@/app/_objects/formHelpers'
import { struct } from './struct'
import Button from '@/app/components/Button'
import { toastSuccess } from '@/app/components/toast'
import { getGetCustomerFullName } from '@/app/[lng]/customers/_components/helpers'
import { getGetProductFullName } from '@/app/[lng]/products/_components/helpers'
import { orderItemsCost } from "./OrderItemsTotals"
import PostCostButton from './PostCostButton'
import PostCostWithPacket from './PostCostWithPacket'
import PostDiscount from './PostDiscount'
import TotalPostals from './TotalPostals'
import TotalSum from './TotalSum'
import TotalWeight from './TotalWeight'
import consts from './consts.json'
import deliveryTypeChoices from './deliveryType.json'
import AddButton from './orderItems/AddButton'
import OrdeItem from './orderItems/OrderItem'
import packetChoices from './packet.json'

import type {
  OrderFormProps,
  SerializedOrderObject,
} from '@/interfaces/orders'
import { mutate } from './actions'

const OrderItemsTotals = dynamic(() => import('./OrderItemsTotals'), {
  ssr: false,
})

function needGift(orderItems?:
  SerializedOrderObject['orderItems']) {
  return orderItemsCost(orderItems) >= consts.SUM_FOR_GIFT
}

export default function FormComp({
  mutateArgs: {
    lng,
    table,
    id,
  },
  initialValues,
  labels: {
    save,
    errorMessages,
    units,
    add,
    textDelete,
    notFound,
    count,
    label,
    okText,
    cancelText,
    labels,
    customer,
    product,
  }
}: OrderFormProps) {
  const [isPending, startTransition] = useTransition()
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    register,
    watch,
    setValue,
    formState,
  } = useForm({
    defaultValues: initialValues,
    resolver: superstructResolver(struct)
  })
  const getProductFullName = getGetProductFullName(product)
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'orderItems',
  })
  const [
    orderItems,
  ] = watch([
    'orderItems',
  ])
  const giftNeeded = needGift(orderItems)
  console.log('errors ', formState.errors)
  const busy = isPending
  const { push } = useRouter()
  const action = useCallback((formData: FormData) => {
    startTransition(async () => {
      // console.log('prev formData ', formData.getAll)
      // formData.set('cityId', formData.get('city') ? formData.get('city'). : null)
      formData.delete('customer')
      console.log('prev formData ', formData)
      const res = await mutate({
        formData,
        lng,
        table,
        id,
      })
      if (res.success) {
        toastSuccess(String(res.message))
        push(`/${lng}/${table}`)
      }
    })
  }, [id, lng, table, push])
  return <form action={action}>
    <div className={`grid grid-cols-3 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
      <Autocomplete
        {...{
          name: "customer",
          control,
          table: 'customers',
          label: `${labels.customer} *`,
          init: initialValues.customer,
          getOptionLabel: getGetCustomerFullName(customer),
          busy,
          errorMessages,
          notFound,
          className: 'col-span-3',
          register,
          setValue,
        }} />
      <Select
        {...{
          name: 'deliveryType',
          register,
          label: labels.deliveryType,
          choices: deliveryTypeChoices,
          disabled: busy,
          choiceLabels: labels.deliveryTypeLabels,
          defaultValue: initialValues.deliveryType,
        }} />
      <TextField {...register('address')}
        className='col-span-2'
        label={labels.address}
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
            initOrderItem,
            getProductOptionLabel: getProductFullName,
            control,
            register,
            errorMessages,
            units,
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
                {...register('postCost', { setValueAs: floatValue })}
                label={labels.postCost}
                type="number"
                variant="outlined"
                size="small"
                disabled={busy}
                inputProps={inputDecimal}
              />
              <Select
                {...{
                  name: 'packet',
                  register,
                  label: labels.packet,
                  choices: packetChoices,
                  disabled: busy,
                  choiceLabels: labels.packetLabels,
                  defaultValue: initialValues.packet,
                }} />
              <PostCostWithPacket {...{ watch, label: labels.postCostWithPacket }} />
              <PostDiscount {...{ watch, label: labels.postDiscount }} />
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
            {consts.PACKET_WEIGHT}({labels.packet}) + {consts.SAMPLES_WEIGHT}({labels.samples})
          </td>
        </tr>
        <tr className='border-b dark:border-neutral-500'>
          <td className='whitespace-nowrap px-6 py-4' />
          <td className='whitespace-nowrap px-6 py-4'>
            <Button
              type='submit'
              aria-labelledby={save}
              disabled={busy || !formState.isDirty}
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
  </form>
}
