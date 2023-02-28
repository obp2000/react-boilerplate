'use client'

import { useDropdown as useCustomerDropdownAttrs } from '@/app/customers/helpers'
import { useDropdown as useProductDropdownAttrs } from '@/app/products/helpers'
import Button from '@/app/client/Button'
import Tooltip from '@/app/client/Tooltip'
// import DropdownList from '@/dropdownList/DropdownList'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import Input from '@/formInput/Input'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
import type { Translation } from '@/app/i18n/dictionaries'
// import { Customer } from '@/pages/api/customers/validators'
import { isDisabled } from '@/submitButton/hooks'
import { requiredObject } from '@/validators/validators'
import clsx from 'clsx'
// import type { Mutator } from 'final-form'
// import arrayMutators from 'final-form-arrays'
import { useRouter } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { useState, useTransition, type SyntheticEvent } from 'react'
// import { Field, Form, type FormProps } from 'react-final-form'
// import { FieldArray } from 'react-final-form-arrays'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import NumbersIcon from '@mui/icons-material/Numbers'
import { decorators, postCostCount, type Values } from './calculator'
import { Gift } from './Gift'
import { deleteOrderItem } from './orderItems/helpers'
import initOrderItem from './orderItems/orderItem.json'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
  type UseFormRegister,
  type SubmitHandler,
  type Path,
} from "react-hook-form"
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { Order } from './order'
import { getGetOptionLabel as getGetCustomerOptionLabel } from '@/app/customers/helpers'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { onSearch } from '@/dropdownList/hooks'
import InputAdornment from '@mui/material/InputAdornment'

export type OrderFormProps = {
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
  initialValues: Values
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
  lng,
  isNewObject,
  params,
  initialValues,
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
  const { refresh, push } = useRouter()
  const [isPending, startTransition] = useTransition()
  // const onSubmit: SubmitHandler<Values>  = (values) => mutateObject({
  //   isNewObject,
  //   lng,
  //   values,
  //   indexUrl: '/orders/',
  //   refresh,
  //   push,
  //   id: params.id,
  //   message,
  //   startTransition,
  // })
  const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const methods = useForm<Values>({
    defaultValues: initialValues,
    resolver: superstructResolver(Order)
  })
  const { register, control, handleSubmit, watch, setValue, formState } = methods
  const { errors, isLoading, isValidating, isSubmitting, isDirty, isValid, dirtyFields, touchedFields } = formState || {}
  const busy = isValidating || isSubmitting || isPending
  const [customers, setCustomers] = useState([initialValues.customer || null])
  const [loading, setLoading] = useState(false)
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "orderItems",
  });
  const [orderItemsValues, customer, postCost, packet] = watch(['orderItems', 'customer', 'post_cost', 'packet'])
  console.log('orderItemsValues ', orderItemsValues)
  return <div className={clsx('bg-white shadow-md rounded p-2 text-sm', { 'opacity-70': busy })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="customer"
          control={control}
          render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
            onChange={(_, data) => onChange(data)}
            id='customer'
            size='small'
            getOptionLabel={getGetCustomerOptionLabel(customerLabels)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={customers}
            // filterOptions={(x) => x}
            onInputChange={onSearch('/customers/', setCustomers, setLoading)}
            noOptionsText={notFound}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                inputRef={ref}
                label={`${labels.customer} *`}
                error={errors?.customer ? true : undefined}
                helperText={errors?.customer ? errorMessages[errors.customer.message] : undefined}
                InputProps={{
                  disabled: busy,
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={15} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />}
        />
        <div className="columns-2 text-sm">
          <Controller name="delivery_type"
            control={control}
            render={({ field }) => <FormControl size='small' fullWidth>
              <InputLabel id="delivery_type-label">{labels.delivery_type}</InputLabel>
              <Select
                {...field}
                labelId="delivery_type-label"
                id="delivery_type"
                label={labels.delivery_type}
                disabled={busy}
              >
                <MenuItem value=""><em>------</em></MenuItem>
                {labels.deliveryTypeChoices.map(({ value, display_name }, key) => <MenuItem key={key} value={value}>
                  {display_name}
                </MenuItem>)}
              </Select>
            </FormControl>}
          />
          <Controller name="address"
            control={control}
            render={({ field }) => <TextField {...field}
              id="address"
              label={labels.address}
              variant="outlined"
              size="small"
              disabled={busy}
            />}
          />
        </div>
        <table className="w-full text-left text-sm m-2 text-gray-500 dark:text-gray-400 table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 mx-3 text-center w-1/12">
                <NumbersIcon size={22} />
              </th>
              <th className="py-3 mx-3 text-left w-6/12">
                {labels.orderItem.product}
              </th>
              <th className="py-3 mx-3 text-left w-1/12">
                {labels.orderItem.price}
              </th>
              <th className="py-3 mx-3 text-left w-1/12">
                {labels.orderItem.amount}
              </th>
              <th className="py-3 mx-3 text-left w-1/12">
                {labels.orderItem.cost}
              </th>
              <th className="py-3 mx-3 text-left w-1/12">
                {labels.orderItem.weight}
              </th>
              <th className="py-3 mx-3 text-left w-1/12">
                <Tooltip title={add}>
                  <AddCircleOutlineIcon
                    cursor='pointer'
                    onClick={() => busy ? null : append(initOrderItem)}
                  />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((orderItem, index) => <tr
              key={orderItem.id}
              className="border-b border-gray-200 hover:bg-gray-100">
              <td className="text-left">
                {index + 1}
              </td>
              <td>

              </td>
              <td>
                <Controller name={`orderItems.${index}.price`}
                  control={control}
                  render={({ field }) => <TextField {...field}
                    id={`orderItems.${index}.price`}
                    label={labels.orderItem.price}
                    type="number"
                    step={1}
                    min={0}
                    variant="outlined"
                    size="small"
                    disabled={busy}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₽/{units.meter_short}</InputAdornment>,
                    }}
                  />}
                />
              </td>
              <td>
                <Controller name={`orderItems.${index}.amount`}
                  control={control}
                  render={({ field }) => <TextField {...field}
                    id={`orderItems.${index}.amount`}
                    label={labels.orderItem.amount}
                    type="number"
                    step={0.1}
                    min={0}
                    variant="outlined"
                    size="small"
                    disabled={busy}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{units.meter_short}</InputAdornment>,
                    }}
                  />}
                />
              </td>
              <td>
                <TextField
                  id={`orderItems.${index}.cost`}
                  // label={labels.orderItem.cost}
                  type="number"
                  // variant="outlined"
                  size="small"
                  disabled
                  value={orderItemsValues[index].price * orderItemsValues[index].amount}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                  }}
                />
              </td>
              <td>
                <TextField
                  id={`orderItems.${index}.weight`}
                  label={labels.orderItem.weight}
                  type="number"
                  variant="outlined"
                  size="small"
                  disabled
                  value={orderItemsValues[index].amount * orderItemsValues[index].product?.density * orderItemsValues[index].product?.width / 100}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
                  }}
                />
              </td>
              <td>
                <Tooltip content={textDelete}>
                  <DeleteIcon
                    onClick={deleteOrderItem({
                      index,
                      remove,
                      label,
                      okText,
                      cancelText,
                      busy,
                    })}
                    cursor='pointer' />
                </Tooltip>
              </td>
            </tr>)}
            {(Number(fields?.length) > 1) && <OrderItemsTotals {...{ labels, units, orderItemsValues }} />}
          </tbody>
          <tfoot>
              <Gift {...{ labels, busy, control, units }} />
              <>
                <Samples {...{ labels, units }} />
                <Postals {...{ count, labels, units, busy, control, customer, orderItemsValues, postCost, packet, setValue }} />
                <OrderTotals {...{ labels, units }} />
              </>
            </tfoot>
        </table>
        <Button
          type='submit'
          size='small'
          aria-labelledby={save}
          disabled={busy}
        >
          {save}
        </Button>
      </form>
  </div>
}


// {/*            <Field name="address"
//               label={labels.address}
//               component={FloatingFormGroup}
//               disabled={busy}
//             />*/}

// {/*            <SelectFloatingFormGroup name="delivery_type"
//               label={labels.delivery_type}
//               dataKey='value'
//               textField='display_name'
//               choices={labels.deliveryTypeChoices}
//               disabled={busy}
//             />*/}

// {/*        <Field name="customer"
//             label={labels.customer}
//             component={DropdownListFormGroup}
//             {...useCustomerDropdownAttrs()}
//             required
//             validate={requiredObject(Customer, errorMessages)}
//             messages={{ emptyList: notFound, emptyFilter: notFound }}
//             labels={customerLabels}
//             disabled={busy}
//         />*/}

                      // <Field name={`${orderItem}.price`}
                      //   label={labels.orderItem.price}
                      //   type='number'
                      //   step={1}
                      //   min={0}
                      //   component={Input}
                      //   className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      //   disabled={busy}
                      // />

                      // <Field name={`${orderItem}.amount`}
                      //   label={labels.orderItem.amount}
                      //   type='number'
                      //   step={0.1}
                      //   min={0}
                      //   component={Input}
                      //   className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      //   disabled={busy}
                      // />


                      // <Field name={`${orderItem}.cost`}
                      //   label={labels.orderItem.cost}
                      //   type='number'
                      //   disabled
                      //   component={Input}
                      //   className='w-20 text-right'
                      // />

                      // <Field name={`${orderItem}.weight`}
                      //   label={labels.orderItem.weight}
                      //   type='number'
                      //   disabled
                      //   component={Input}
                      //   className='w-20 text-right'
                      // />

                      // <Field name={[orderItem, 'product'].join('.')}
                      //   label={labels.orderItem.product}
                      //   component={DropdownList}
                      //   {...useProductDropdownAttrs()}
                      //   messages={{ emptyList: notFound, emptyFilter: notFound }}
                      //   labels={productLabels}
                      //   disabled={busy}
                      // />
                      //