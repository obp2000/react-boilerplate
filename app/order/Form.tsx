'use client'

import { useMutate } from '@/app/_objects/hooks'
import {
  getGetOptionLabel as getGetProductOptionLabel
} from '@/app/product/helpers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { AddCircleOutlined } from '@mui/icons-material'
import tables from '@/app/_tables/tables.json'
import type {
  OrderFormProps,
  SerializedOrderObject,
  Values
} from '@/interfaces/orders'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import Tooltip from '@/app/components/Tooltip'
import { useCallback, useTransition } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler
} from "react-hook-form"
import consts from './consts.json'
import CustomerField from './CustomerField'
import { struct } from './struct'
import OrdeItem, { cost, weight } from './orderItems/OrderItem'
import Postals, { totalPostals } from './Postals'
import Button from '@/app/components/Button'

type OrderItems = SerializedOrderObject['orderItems']

export function orderItemsAmount(orderItems?: OrderItems) {
  return (orderItems || []).reduce(
    (sum: number, { amount }) => {
      sum += Number(amount)
      return sum
    }, 0)
}

export function orderItemsCost(orderItems?: OrderItems) {
  return (orderItems || []).reduce((sum: number, orderItem) => {
    sum += cost(orderItem)
    return sum
  }, 0)
}

export function orderItemsWeight(orderItems?: OrderItems) {
  return (orderItems || []).reduce((sum: number, orderItem) => {
    sum += weight(orderItem)
    return sum
  }, 0)
}

export function needGift(orderItems?: OrderItems) {
  return orderItemsCost(orderItems) >= consts.SUM_FOR_GIFT
}

export function totalSum({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: OrderItems
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
}) {
  return orderItemsCost(orderItemsValues) +
    totalPostals({ orderItemsValues, postCost, packet })
}

export function totalWeight(orderItemsValues?: OrderItems) {
  return orderItemsWeight(orderItemsValues) +
    consts.SAMPLES_WEIGHT +
    consts.PACKET_WEIGHT +
    (needGift(orderItemsValues) ? consts.GIFT_WEIGHT : 0)
}

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
// }))

export default function FormComp({
  tablePath,
  id,
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
  // const [pindex, setPindex] = useState<string | null | undefined>(initCustomer?.city?.pindex)
  // const [currentCustomer, setCurrentCustomer] = useState(initCustomer)
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate({ tablePath, id })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
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
    customer,
    orderItemsValues,
    postCost,
    packet
  ] = watch([
    'customer',
    'orderItems',
    'postCost',
    'packet'
  ])
  const giftNeeded = needGift(orderItemsValues)
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
  const busy = isSubmitting || isPending
  return <>
    <div className={`grid grid-cols-3 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
      <div className='col-span-3'>
        <CustomerField {...{
          label: labels.customer,
          labels: customerLabels,
          busy,
          errors,
          errorMessages,
          notFound,
          control,
          initialValues
        }} />
      </div>
      <div>
        <Controller name="deliveryType"
          control={control}
          render={({ field: { value, ...field } }) => <FormControl size='small' fullWidth>
            <InputLabel id="deliveryType-label">{labels.deliveryType}</InputLabel>
            <Select
              {...field}
              value={value || ''}
              labelId="deliveryType-label"
              id="deliveryType"
              label={labels.deliveryType}
              disabled={busy}
            >
              <MenuItem value=""><em>------</em></MenuItem>
              {labels.deliveryTypeChoices.map(
                ({ value, display_name }) => <MenuItem key={value} value={value}>
                  {display_name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
      </div>
      <div className='col-span-2'>
        <Controller name="address"
          control={control}
          render={({ field }) => <TextField {...field}
            id="address"
            label={labels.address}
            size="small"
            fullWidth
            disabled={busy}
          />}
        />
      </div>
    </div>
    <div className='shadow-md mt-2'>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                      <Tooltip title={add}>
                        <IconButton color='inherit' disabled={busy} onClick={() =>
                          append(tables.orders.initOrderItem as unknown as OrderItems[number])
                        }>
                          <AddCircleOutlined />
                        </IconButton>
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map(({ id, product }, index) => <OrdeItem
                    key={id}
                    {...{
                      index,
                      product,
                      getProductOptionLabel,
                      control,
                      errors,
                      errorMessages,
                      labels,
                      units,
                      productLabels,
                      busy,
                      orderItemsValues,
                      label,
                      okText,
                      cancelText,
                      textDelete,
                      notFound,
                      remove,
                      setValue,
                    }}
                  />)}
                  {((Number(fields?.length) > 1) || giftNeeded) && <tr className='border-b dark:border-neutral-500'>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {labels.orderItemsCost}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {giftNeeded && <Controller name="gift"
                        control={control}
                        render={({ field }) => <TextField {...field}
                          id="gift"
                          label={`${labels.needGift}!`}
                          size="small"
                          fullWidth
                          disabled={busy}
                        />}
                      />}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4' />
                    <td className='whitespace-nowrap px-6 py-4' align='center'>
                      {orderItemsAmount(orderItemsValues).toFixed(2)}{units.meter_short}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4' align='right'>
                      {orderItemsCost(orderItemsValues).toFixed(2)}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4' align='right' colSpan={giftNeeded ? 2 : 1}>
                      {orderItemsWeight(orderItemsValues).toFixed(0)}{giftNeeded &&
                        ` + ${consts.GIFT_WEIGHT}(${labels.gift})`}
                    </td>
                  </tr>}
                  <Postals {...{
                    count,
                    labels,
                    units,
                    busy,
                    control,
                    pindex: customer?.city?.pindex,
                    orderItemsValues,
                    postCost,
                    packet,
                    setValue,
                  }} />
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
                      {totalSum({ orderItemsValues, postCost, packet }).toFixed(2)}₽
                    </td>
                    <td className='whitespace-nowrap px-6 py-4' align='right'>
                      {totalWeight(orderItemsValues).toFixed(0)}{units.gram_short}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
