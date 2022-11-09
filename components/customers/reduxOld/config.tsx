import {
  getCustomer as getObject,
  getCustomers as getObjects,
  useCreateCustomerMutation as useCreateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
  useGetCustomerQuery as useGetObjectQuery,
  useUpdateCustomerMutation as useUpdateObjectMutation,
  url as indexUrl,
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { useFormInitialValues } from './hooks'
import type { Customer } from '@/interfaces/customers'

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

const validatedFields = {
  notBlank: ['nick'],
}

const modFormValues = ({
  id,
  city,
  created_at,
  updated_at,
  ...values
}: Customer): Partial<Customer> => {
  if (city) {
    values.city_id = city.id
  }
  return values
}

export const objectFormConfig = {
  indexUrl,
  getObject,
  useGetObjectQuery,
  useFormInitialValues,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  validatedFields,
  modFormValues,
}
