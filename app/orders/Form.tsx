'use client'

import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import { useOnSubmit } from '@/app/form/hooks'
import type { Translation } from '@/app/i18n/dictionaries'
import { getGetOptionLabel as getGetProductOptionLabel } from '@/app/products/helpers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import NumbersIcon from '@mui/icons-material/Numbers'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import clsx from 'clsx'
import { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import {
    Controller,
    useFieldArray, useForm, type SubmitHandler,
} from "react-hook-form"
import {
    needGift, orderItemsAmount,
    orderItemsCost,
    orderItemsWeight, totalSum,
    totalWeight
} from './calculator'
import consts from './consts.json'
import type { Values, OrderObject as Order, OrderItem, NewOrderItem } from '@/interfaces/orders'
import { Order as ValidatonSchema } from './order'
import OrdeItem from './orderItems/OrderItem'
import Postals from './Postals'
import CustomerField from './CustomerField'
import tables from '@/app/objectPage/tables.json'
import { Prisma } from '.prisma/client'

export type OrderFormProps = {
  params: ParsedUrlQuery
  initialValues: Values
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
  initialValues: {
    customer: initCustomer,
    ...defaultValues
  },
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
      isValidating,
      isSubmitting
    } } = useForm<Values>({
      defaultValues,
      resolver: superstructResolver(ValidatonSchema)
    })
  const busy = isSubmitting || isPending
  // const getCustomerOptionLabel = getGetCustomerOptionLabel(customerLabels)
  // const [customers, setCustomers] = useState([initialValues.customer])
  // const [loading, setLoading] = useState(false)
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
  // const initProducts = defaultValues.orderItems.map(({ product }) => product)
  console.log('errors ', errors)
  // console.log('fields ', fields)
  return <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('p-2', { 'opacity-70': busy })}>
    <Grid container spacing={2}>
      <Grid xs={12}>
        <CustomerField {...{
          customer: initCustomer,
          label: labels.customer,
          labels: customerLabels,
          busy,
          errors,
          errorMessages,
          setValue,
          notFound
        }} />
      </Grid>
      <Grid xs={3}>
        <Controller name="deliveryType"
          control={control}
          render={({ field }) => <FormControl size='small' fullWidth>
            <InputLabel id="deliveryType-label">{labels.deliveryType}</InputLabel>
            <Select
              {...field}
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
            <TableCell><NumbersIcon /></TableCell>
            <TableCell>{labels.orderItem.product}</TableCell>
            <TableCell>{labels.orderItem.price}</TableCell>
            <TableCell>{labels.orderItem.amount}</TableCell>
            <TableCell align='right'>{labels.orderItem.cost}, ₽</TableCell>
            <TableCell align='right'>{labels.orderItem.weight}, {units.gram_short}</TableCell>
            <TableCell>
              <Tooltip title={add}>
                <IconButton disabled={busy} onClick={() =>
                append(tables.orders.select.object.orderItems.initObject as NewOrderItem & OrderItem)
              }>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map(({id, product}, index) => <OrdeItem
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
          {(Number(fields?.length) > 1) && <TableRow>
            <TableCell>
              <span>
                {labels.orderItemsCost}
                {needGift(orderItemsValues) &&
                  <span className='text-red-500'> - {labels.needGift}</span>}
              </span>
            </TableCell>
            <TableCell>
              <Controller name="gift"
                control={control}
                render={({ field }) => <TextField {...field}
                  id="gift"
                  label={labels.gift}
                  size="small"
                  fullWidth
                  disabled={busy}
                />}
              />
            </TableCell>
            <TableCell />
            <TableCell align='center'>
              {orderItemsAmount(orderItemsValues).toFixed(2)}{units.meter_short}
            </TableCell>
            <TableCell align='right'>
              {orderItemsCost(orderItemsValues).toFixed(2)}
            </TableCell>
            <TableCell align='center' colSpan={2}>
              {orderItemsWeight(orderItemsValues).toFixed(0)}{needGift(orderItemsValues) &&
                ' + ' + consts.GIFT_WEIGHT}
            </TableCell>
          </TableRow>}
          <TableRow>
            <TableCell colSpan={5}>
              {labels.samples}
            </TableCell>
            <TableCell align='right'>
              {consts.SAMPLES_WEIGHT}
            </TableCell>
          </TableRow>
          <Postals {...{
            count,
            labels,
            units,
            busy,
            control,
            customer,
            orderItemsValues,
            postCost,
            packet,
            setValue
          }} />
          <TableRow>
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
            <TableCell colSpan={2} />
            <TableCell align="right">
              {labels.totalSum}
            </TableCell>
            <TableCell align='right'>
              {totalSum({ orderItemsValues, postCost, packet }).toFixed(2)}₽
            </TableCell>
            <TableCell align='right'>
              {totalWeight(orderItemsValues)}{units.gram_short}
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
