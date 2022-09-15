import React from 'react'
import createDecorator from 'final-form-submit-listener'
import type { Decorator } from 'final-form'
import type { FormProps } from 'react-final-form'
import {
  getCustomers as getObjects,
  useGetCustomerQuery as useGetObjectQuery,
  useCreateCustomerMutation as useCreateObjectMutation,
  useUpdateCustomerMutation as useUpdateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import { validate } from './validators'
import CustomerName from './CustomerName'
import TableRow from './TableRow'
import TableLabels from './TableLabels'
import {
  Customer,
  CustomerFormValues,
  CustomerOptions,
} from '../../../interfaces'

export const initFormValues: CustomerFormValues = {
  id: undefined,
  nick: undefined,
  name: undefined,
  city: undefined,
  address: undefined,
}

export const indexUrl = '/customers/'

export type CustomersTableConfig = {
  indexUrl: string
  getObjects: typeof getObjects
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteObjectMutation
}

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const calculatedFields = []

const deleteValues = [
  'city',
  'created_at',
  'updated_at',
]

const preSubmitAction = (values: CustomerFormValues): void => {
  values.city_id = values.city?.id
  deleteValues.map((deleteValue) => {
    delete values[deleteValue as keyof CustomerFormValues]
  })
}

const submitListener: Decorator = createDecorator({
  beforeSubmit: (form: FormProps): void => {
    preSubmitAction(form.getState().values)
  },
})

type CustomerWithOptions = {
  object?: Customer
  options?: CustomerOptions
}

const formInitialValues = ({
  object
}: CustomerWithOptions): CustomerFormValues => {
  let objectValues = object || initFormValues
  return objectValues
}

const formDecorators: Decorator[] = [submitListener]

// const formDecorators = (): Decorator[] => [submitListener]

const mutators = {}

export type CustomerFormConfig = {
  indexUrl: string
  useGetObjectQuery: typeof useGetObjectQuery
  formInitialValues: typeof formInitialValues
  formDecorators: typeof formDecorators
  mutators: typeof mutators
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateObjectMutation
  useCreateObjectMutation: typeof useCreateObjectMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: typeof calculatedFields
}

export const objectFormConfig: CustomerFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  mutators,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
}

const dropdownListTextField = ({
  nick,
  name,
  city,
  address,
}: Customer): string[] => [
    String(nick),
    String(name),
    String(city?.pindex),
    String(city?.city),
    String(address)
  ]

export const useDropdown = (options: CustomerOptions) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({ item }: { item: Customer }): JSX.Element =>
    <CustomerName object={item} options={options} />,
})
