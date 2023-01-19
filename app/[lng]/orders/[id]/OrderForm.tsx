'use client'

import { useTranslation } from '@/app/i18n/client'
import { useDropdown as useCustomerDropdownAttrs } from '@/app/[lng]/customers/hooks'
import { useDropdown as useProductDropdownAttrs } from '@/app/[lng]/products/hooks'
import Button from '@/client/Button'
import Tooltip from '@/client/Tooltip'
import DropdownList from '@/dropdownList/DropdownList'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { mutateObject } from '@/objectForm/client'
import Layout from '@/objectForm/Layout'
import { MainContext } from '@/options/context'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { validate } from '@/validators/validators'
import type { Decorator } from 'final-form'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-calculate'
import { useRouter } from 'next/navigation'
import { Field, Form, type FormProps } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { AiOutlineDelete, AiOutlineFieldNumber, AiOutlinePlusCircle } from 'react-icons/ai'
import { Localization } from 'react-widgets'
import { calculations, postCostCount, Values } from './calculator'
import GiftIfNeeded from './Gift'
import options from './options.json'
import { useOnClickDeleteButton } from './orderItems/hooks'
import initOrderItem from './orderItems/initOrderItem.json'
import orderItemOptions from './orderItems/options.json'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'
import validatedFields from './validatedFields.json'
import { useDisabled } from '@/submitButton/hooks'
import type { Mutator } from 'final-form'

type Props = Partial<FormProps> &
{
  id: string
  lng: string
  save: string
  add: string
  textDelete: string
  notFound: string
  count: string
}

export default function FormComp({
  id,
  initialValues,
  lng,
  save,
  add,
  textDelete,
  notFound,
  count,
}: Props) {
  // const {initialValues, orderItemsContext, ...rest} = useForm(props)
  const { t } = useTranslation(lng)
  const { refresh, push } = useRouter()
  const onSubmit = (values: Values) => mutateObject({
    modValues: values,
    indexUrl: 'orders',
    refresh,
    push,
    t,
    id,
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    validate: validate(validatedFields),
    onSubmit,
    decorators: [createDecorator(...calculations) as Decorator<Values>],
    mutators: { postCostCount, ...arrayMutators } as Record<string, Mutator<Values>>,
  }} >
    {(props) => <MainContext.Provider value={{ options }}>
      <div className="bg-white shadow-md rounded p-2 text-sm">
        <form onSubmit={props.handleSubmit}>
          <Localization messages={{ emptyList: notFound, emptyFilter: notFound }} >
            <Field name="customer"
              component={DropdownListFormGroup}
              {...useCustomerDropdownAttrs()} lng={lng} />
          </Localization>
          <div className="columns-2 text-sm">
            <SelectFloatingFormGroup name="delivery_type"
              dataKey='value' textField='display_name' />
            <Field name="address" component={FloatingFormGroup} />
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
                      {orderItemOptions.product.label}
                    </th>
                    <th className="py-3 mx-3 text-left w-1/12">
                      {orderItemOptions.price.label}
                    </th>
                    <th className="py-3 mx-3 text-left w-1/12">
                      {orderItemOptions.amount.label}
                    </th>
                    <th className="py-3 mx-3 text-left w-1/12">
                      {orderItemOptions.cost.label}
                    </th>
                    <th className="py-3 mx-3 text-left w-1/12">
                      {orderItemOptions.weight.label}
                    </th>
                    <th className="py-3 mx-3 text-left w-1/12">
                      <Tooltip content={add}>
                        <AiOutlinePlusCircle
                          cursor='pointer'
                          onClick={() => fields.push(initOrderItem)} />
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <MainContext.Provider value={{ options: orderItemOptions } as
                    { options: typeof orderItemOptions }}>
                    {fields.map((orderItemName, index) => <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="text-left">
                        {index + 1}
                      </td>
                      <td>
                        <Localization messages={{ emptyList: notFound, emptyFilter: notFound }} >
                          <Field name={[orderItemName, 'product'].join('.')}
                            component={DropdownList}
                            {...useProductDropdownAttrs()}
                          />
                        </Localization>
                      </td>
                      <td>
                        <Field name={`${orderItemName}.price`}
                          step={1} min={0} component={Input}
                          className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                      </td>
                      <td>
                        <Field name={`${orderItemName}.amount`}
                          step={0.1} min={0} component={Input}
                          className='w-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                      </td>
                      <td>
                        <Field name={`${orderItemName}.cost`}
                          disabled component={Input} className='w-20 text-right' />
                      </td>
                      <td>
                        <Field name={`${orderItemName}.weight`}
                          disabled component={Input} className='w-20 text-right' />
                      </td>
                      <td>
                        <Tooltip content={textDelete}>
                          <AiOutlineDelete
                            // aria-labelledby={t('delete')}
                            onClick={useOnClickDeleteButton({ index, fields, t })}
                            cursor='pointer' />
                        </Tooltip>
                      </td>
                    </tr>)}
                  </MainContext.Provider>
                  {(Number(fields?.length) > 1) && <OrderItemsTotals />}
                </tbody>
              </>}
            </FieldArray>
            <tfoot>
              <GiftIfNeeded />
              <>
                <Samples />
                <Postals {...{ count }} />
                <OrderTotals />
              </>
            </tfoot>
          </table>
          <Button
            type='submit'
            size='sm'
            aria-labelledby={save}
            disabled={useDisabled(props)} >
            {save}
          </Button>
        </form>
      </div>
    </MainContext.Provider>}
  </Form>
}
