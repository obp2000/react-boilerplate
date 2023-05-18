'use client'

import { useMutate } from '@/app/_objects/hooks'
import { getGetOptionLabel as getGetProductOptionLabel } from '@/app/product/helpers'
import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import tables from '@/app/_tables/tables.json'
import type { OrderFormProps, SerializedOrderObject, Values } from '@/interfaces/orders'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

export default function FormComp({
  lng,
  table,
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
  const onSubmit: SubmitHandler<Values> = useMutate({ lng, table, id })
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
  const busy = isSubmitting || isPending
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
  function toValues({
    customer,
    orderItems,
    createdAt,
    ...values
  }: SerializedOrderObject) {
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
  }
  const submitHandler = handleSubmit(toValues)
  const onSubmitButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    submitHandler()
  }, [submitHandler, busy])
  return <>
    <Grid container spacing={2} sx={{ p: 2, opacity: busy ? 0.7 : 'inherit' }}>
      <Grid xs={12}>
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
      </Grid>
      <Grid xs={3}>
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
      </Grid>
      <Grid xs={8}>
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
      </Grid>
    </Grid>
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>{labels.orderItem.product}</StyledTableCell>
            <StyledTableCell>{labels.orderItem.price}</StyledTableCell>
            <StyledTableCell>{labels.orderItem.amount}</StyledTableCell>
            <StyledTableCell align='right'>{labels.orderItem.cost}, ₽</StyledTableCell>
            <StyledTableCell align='right'>{labels.orderItem.weight}, {units.gram_short}</StyledTableCell>
            <StyledTableCell>
              <Tooltip title={add}>
                <IconButton color='inherit' disabled={busy} onClick={() =>
                  append(tables.orders.initOrderItem as unknown as OrderItems[number])
                }>
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
          {((Number(fields?.length) > 1) || giftNeeded) && <TableRow>
            <TableCell>
              {labels.orderItemsCost}
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell />
            <TableCell align='center'>
              {orderItemsAmount(orderItemsValues).toFixed(2)}{units.meter_short}
            </TableCell>
            <TableCell align='right'>
              {orderItemsCost(orderItemsValues).toFixed(2)}
            </TableCell>
            <TableCell align='right' colSpan={giftNeeded ? 2 : 1}>
              {orderItemsWeight(orderItemsValues).toFixed(0)}{giftNeeded &&
                ` + ${consts.GIFT_WEIGHT}(${labels.gift})`}
            </TableCell>
          </TableRow>}
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
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                size='small'
                variant='outlined'
                aria-labelledby={save}
                disabled={busy || !isDirty}
                onClick={() => startTransition(onSubmitButtonClick)}
              >
                {save}
              </Button>
            </TableCell>
            <TableCell />
            <TableCell align="right">
              {labels.totalSum}
            </TableCell>
            <TableCell align='right'>
              {totalSum({ orderItemsValues, postCost, packet }).toFixed(2)}₽
            </TableCell>
            <TableCell align='right'>
              {totalWeight(orderItemsValues).toFixed(0)}{units.gram_short}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
}
