import React from 'react'
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
import type {
  Customer,
  CustomerOptions,
  CustomerWithOptions
} from '../../../interfaces'

export const indexUrl = '/customers/'

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const initFormValues = {
  id: undefined,
  nick: undefined,
  name: undefined,
  city: undefined,
  address: undefined,
}

const formInitialValues = ({ object }: CustomerWithOptions) => {
  let objectValues = object ?? initFormValues
  return objectValues
}

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
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

export const useDropdown = (options: CustomerOptions | undefined) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({ item }: { item: Customer }): JSX.Element =>
    <CustomerName object={item} options={options} />,
})


// const deleteValues = [
//   'city',
//   'created_at',
//   'updated_at',
// ]
