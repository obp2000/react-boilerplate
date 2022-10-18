import type { FormRenderProps } from 'react-final-form'
import type { IndexUrl } from './index'
import type { FieldProps } from './options'
import type { City, CityOptions } from './cities'
import type { CommonConstsType } from './commonConsts'
import {
  getCustomers,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from '../src/components/customers/apiSlice'
import TableRow from '../src/components/customers/TableRow'
import TableLabels from '../src/components/customers/TableLabels'
import { validate } from '../src/components/customers/validators'
import objectFormRender from '../src/components/customers/CustomerFormRender'

export type Customer = {
  id: number
  nick: string
  name: string
  city: City
  city_id?: number
  address: string
  created_at: string
  updated_at: string
}

export type CustomerCityOptions = {
  type: 'nested object'
  required: boolean
  read_only: boolean
  label: string
  children: CityOptions
}

export type CustomerOptions = {
  id: FieldProps
  nick: FieldProps
  name: FieldProps
  city: CustomerCityOptions
  address: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
}

export type CustomerOptionsType = {
  options?: CustomerOptions
}

export type CustomerType = {
  object?: Customer
}

export type CustomerWithOptions = CustomerType & CustomerOptionsType

export type TableConfig = IndexUrl & {
  getObjects: typeof getCustomers
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteCustomerMutation
}

export type FormConfig = IndexUrl & {
  useGetObjectQuery: typeof useGetCustomerQuery
  formInitialValues: CustomerWithOptions
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateCustomerMutation
  useCreateObjectMutation: typeof useCreateCustomerMutation
  objectFormRender: typeof objectFormRender
}

export type CustomerFormProps = FormRenderProps & CustomerType
