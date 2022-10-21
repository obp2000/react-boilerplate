import type {
  Customer,
  CustomerWithOptions
} from '../../../interfaces/customers'
import {
  getCustomers as getObjects,
  getCustomer as getObject,
  useCreateCustomerMutation as useCreateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
  useGetCustomerQuery as useGetObjectQuery,
  useUpdateCustomerMutation as useUpdateObjectMutation
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { validate } from './validators'

export const indexUrl = '/customers/'

export const objectsTableConfig = {
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const formInitialValues = ({
  object
}: CustomerWithOptions): Customer | {} => {
  let objectValues = object ?? {}
  return objectValues
}

const validatedFields = {
  notBlank: ['nick'],
}

export const objectFormConfig = {
  getObject,
  useGetObjectQuery,
  formInitialValues,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  validatedFields,
}
