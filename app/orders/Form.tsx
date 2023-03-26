'use client'

import { useOnSubmit } from '@/app/form/hooks'
import type { Translation } from '@/app/i18n/dictionaries'
import { getGetOptionLabel as getGetProductOptionLabel } from '@/app/products/helpers'
import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
// import NumbersIcon from '@mui/icons-material/Numbers'
import tables from '@/app/objectPage/tables.json'
import type { NewOrderItem, OrderObject as Order, Values } from '@/interfaces/orders'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import {
  Controller,
  useFieldArray, useForm, type SubmitHandler
} from "react-hook-form"
import consts from './consts.json'
import CustomerField from './CustomerField'
import { Order as ValidatonSchema } from './order'
import OrdeItem, { cost, weight } from './orderItems/OrderItem'
import Postals, { totalPostals } from './Postals'
import Chip from '@/app/useClient/Chip'

export function orderItemsAmount(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce(
    (sum: number, { amount }) => {
      sum += Number(amount)
      return sum
    }, 0)
}

export function orderItemsCost(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce((sum: number, orderItem) => {
    sum += cost(orderItem)
    return sum
  }, 0)
}

export function orderItemsWeight(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce((sum: number, orderItem) => {
    sum += weight(orderItem)
    return sum
  }, 0)
}

export function needGift(orderItems?: Order['orderItems']) {
  return orderItemsCost(orderItems) >= consts.SUM_FOR_GIFT
}

export function totalSum({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: Order['orderItems']
  postCost: Order['postCost']
  packet: Order['packet']
}) {
  return orderItemsCost(orderItemsValues) +
    totalPostals({ orderItemsValues, postCost, packet })
}

export function totalWeight(orderItemsValues?: Order['orderItems']) {
  return orderItemsWeight(orderItemsValues) +
    consts.SAMPLES_WEIGHT +
    consts.PACKET_WEIGHT +
    (needGift(orderItemsValues) ? consts.GIFT_WEIGHT : 0)
}


// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

export type OrderFormProps = {
  params: ParsedUrlQuery
  initialValues: Order
  accessToken: string
  save: string
  add: string
  textDelete: string
  notFound: string
  count: string
  message: string
  errorMessages: Translation['errorMessages']
  label: string
  okText: string
  cancelText: string
  units: Translation['units']
  labels: Translation['order']
  customerLabels: Translation['customer']
  productLabels: Translation['product']
}

export default function FormComp({
  params,
  initialValues,
  accessToken,
  save,
  add,
  textDelete,
  notFound,
  count,
  message,
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
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onSubmit: SubmitHandler<Values> = useOnSubmit({
    params,
    table: 'orders',
    accessToken,
    startTransition,
    setSuccess,
    setErrorMessage,
  })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isLoading,
      isSubmitting
    } } = useForm<Order>({
      defaultValues: initialValues,
      resolver: superstructResolver(ValidatonSchema)
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
  // <MenuItem value=""><em>------</em></MenuItem>
  const toValues = ({
    customer,
    orderItems,
    createdAt,
    ...values
  }: Order) => {
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
  return <form onSubmit={handleSubmit(toValues)}>
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
                ({ value, display_name }, key) => <MenuItem key={key} value={value}>
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
                  append(tables.orders.initOrderItem as unknown as Order['orderItems'][number])
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
              <span>
                {labels.orderItemsCost}
                {giftNeeded && <Chip label={labels.needGift} color='warning' />}
              </span>
            </TableCell>
            <TableCell>
              {giftNeeded && <Controller name="gift"
                control={control}
                render={({ field }) => <TextField {...field}
                  id="gift"
                  label={labels.gift}
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
            <TableCell align='right' colSpan={giftNeeded ? 1 : 1}>
              {orderItemsWeight(orderItemsValues).toFixed(0)}{giftNeeded &&
                ' + ' + consts.GIFT_WEIGHT}
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
                type='submit'
                size='small'
                variant='outlined'
                aria-labelledby={save}
                disabled={busy}
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
    <Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
      <Alert severity={success ? "success" : "error"} elevation={6}
        variant="filled" sx={{ width: '100%' }}>
        {success ? message : errorMessage}
      </Alert>
    </Snackbar>
  </form>
}


// {/*        <Controller name="customer"
//           control={control}
//           render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
//             onChange={(_, data) => onChange(data)}
//             id='customer'
//             size='small'
//             getOptionLabel={getCustomerOptionLabel}
//             renderOption={(props, customer) => <li {...props} key={customer?.id || -1}>
//               {getCustomerOptionLabel(customer)}
//             </li>}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             options={customers}
//             // filterOptions={(x) => x}
//             onInputChange={onSearch('/customers/', setCustomers, setLoading)}
//             noOptionsText={notFound}
//             renderInput={(params) => <TextField {...params} {...field}
//               inputRef={ref}
//               label={`${labels.customer} *`}
//               disabled={busy}
//               error={errors?.customer ? true : undefined}
//               helperText={errors?.customer
//                 ? errorMessages[errors.customer.message as keyof Translation['errorMessages']]
//                 : undefined}
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: <>
//                   {loading ? <CircularProgress color="inherit" size={15} /> : null}
//                   {params.InputProps.endAdornment}
//                 </>,
//               }}
//             />}
//           />}
//         />*/}
