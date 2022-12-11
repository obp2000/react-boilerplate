import { modFormValues } from '@/app/customers/[id]/config'
import TableLabels from '@/app/customers/TableLabels'
import TableRow from '@/app/customers/TableRow'
import { ValidatedFields } from '.'
import type { City, CityOptions } from './cities'
import type { FieldProps } from './options'

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

export type TableConfig = {
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
}

export type FormConfig = {
  // objectFormRender: typeof objectFormRender
  validatedFields: ValidatedFields
  modFormValues: typeof modFormValues
}

export type CustomerFormValues = Customer | {}

export type CustomerSubmitValues =
  Pick<Customer, 'nick' | 'name' | 'city_id' | 'address'>
