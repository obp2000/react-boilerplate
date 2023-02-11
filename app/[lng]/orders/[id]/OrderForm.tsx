'use client'

import { useDropdown as useCustomerDropdownAttrs } from '@/app/[lng]/customers/helpers'
import { useDropdown as useProductDropdownAttrs } from '@/app/[lng]/products/helpers'
import Button from '@/client/Button'
import Tooltip from '@/client/Tooltip'
import DropdownList from '@/dropdownList/DropdownList'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
import { Translation } from '@/app/i18n/dictionaries'
import { Customer } from '@/pages/api/customers/validators'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { isDisabled } from '@/submitButton/hooks'
import { requiredObject } from '@/validators/validators'
import clsx from 'clsx'
import type { Mutator } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { useRouter } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { useTransition } from 'react'
import { Field, Form, type FormProps } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { AiOutlineDelete, AiOutlineFieldNumber, AiOutlinePlusCircle } from 'react-icons/ai'
import { decorators, postCostCount, type Values } from './calculator'
import GiftIfNeeded from './Gift'
import { deleteOrderItem } from './orderItems/helpers'
import initOrderItem from './orderItems/initOrderItem.json'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'

export type OrderFormProps = FormProps['initialValues'] &
{
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
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
  labels,
  customerLabels,
  productLabels,
}: OrderFormProps) {
  // const {initialValues, orderItemsContext, ...rest} = useForm(props)
  // const lng = String(params.lng) || fallbackLng
  const { refresh, push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: Values) => mutateObject({
    isNewObject,
    lng,
    modValues: values,
    indexUrl: '/orders/',
    refresh,
    push,
    id: params.id,
    message,
    startTransition,
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    onSubmit,
    decorators,
    mutators: { postCostCount, ...arrayMutators } as Record<string, Mutator<Values>>,
  }} >
    {({ handleSubmit, submitting, initialValues, ...props }) => {
      const busy = submitting || isPending
      return <div className={clsx('bg-white shadow-md rounded p-2 text-sm',
        { 'opacity-70': busy })}>
        <form onSubmit={handleSubmit}>
          <Field name="customer"
            label={labels.customer}
            component={DropdownListFormGroup}
            {...useCustomerDropdownAttrs()}
            required
            validate={requiredObject(Customer, errorMessages)}
            messages={{ emptyList: notFound, emptyFilter: notFound }}
            labels={customerLabels}
            disabled={busy}
          />
          <div className="columns-2 text-sm">
            <SelectFloatingFormGroup name="delivery_type"
              label={labels.delivery_type}
              dataKey='value'
              textField='display_name'
              choices={labels.deliveryTypeChoices}
              disabled={busy}
            />
            <Field name="address"
              label={labels.address}
              component={FloatingFormGroup}
              disabled={busy}
            />
          </div>
          <table className="w-full text-left text-sm m-2 text-gray-500 dark:text-gray-400 table-fixed">
            <FieldArray name="orderItems">
              {({ fields }) => <>
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 mx-3 text-center w-1/12">
                      <AiOutlineFieldNumber size={22} />
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
                      <Tooltip content={add}>
                        <AiOutlinePlusCircle
                          cursor='pointer'
                          onClick={() => busy ? null : fields.push(initOrderItem)}
                        />
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((orderItemName, index) => <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="text-left">
                      {index + 1}
                    </td>
                    <td>
                      <Field name={[orderItemName, 'product'].join('.')}
                        label={labels.orderItem.product}
                        component={DropdownList}
                        {...useProductDropdownAttrs()}
                        messages={{ emptyList: notFound, emptyFilter: notFound }}
                        labels={productLabels}
                        disabled={busy}
                      />
                    </td>
                    <td>
                      <Field name={`${orderItemName}.price`}
                        label={labels.orderItem.price}
                        type='number'
                        step={1}
                        min={0}
                        component={Input}
                        className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        disabled={busy}
                      />
                    </td>
                    <td>
                      <Field name={`${orderItemName}.amount`}
                        label={labels.orderItem.amount}
                        type='number'
                        step={0.1}
                        min={0}
                        component={Input}
                        className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        disabled={busy}
                      />
                    </td>
                    <td>
                      <Field name={`${orderItemName}.cost`}
                        label={labels.orderItem.cost}
                        type='number'
                        disabled
                        component={Input}
                        className='w-20 text-right'
                      />
                    </td>
                    <td>
                      <Field name={`${orderItemName}.weight`}
                        label={labels.orderItem.weight}
                        type='number'
                        disabled
                        component={Input}
                        className='w-20 text-right'
                      />
                    </td>
                    <td>
                      <Tooltip content={textDelete}>
                        <AiOutlineDelete
                          // aria-labelledby={t('delete')}
                          onClick={deleteOrderItem({
                            index,
                            fields,
                            label,
                            okText,
                            cancelText,
                            busy,
                          })}
                          cursor='pointer' />
                      </Tooltip>
                    </td>
                  </tr>)}
                  {(Number(fields?.length) > 1) && <OrderItemsTotals {...{ labels }} />}
                </tbody>
              </>}
            </FieldArray>
            <tfoot>
              <GiftIfNeeded {...{ labels, busy }} />
              <>
                <Samples {...{ labels }} />
                <Postals {...{ count, labels, busy }} />
                <OrderTotals {...{ labels }} />
              </>
            </tfoot>
          </table>
          <Button
            type='submit'
            size='sm'
            aria-labelledby={save}
            disabled={isDisabled(props || busy)} >
            {save}
          </Button>
        </form>
      </div>
    }}
  </Form>
}
