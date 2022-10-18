import {
  getCustomers as getObjects,
  useGetCustomerQuery as useGetObjectQuery,
  useCreateCustomerMutation as useCreateObjectMutation,
  useUpdateCustomerMutation as useUpdateObjectMutation,
  useDeleteCustomerMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import { validate } from './validators'
import TableRow from './TableRow'
import TableLabels from './TableLabels'
import type { CustomerWithOptions } from '../../../interfaces/customers'

export const indexUrl = '/customers/'

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

const formInitialValues = ({ object }: CustomerWithOptions) => {
  let objectValues = object ?? {}
  return objectValues
}

const validatedFields = {
  notBlank: ['nick'],
}

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  validatedFields,
}
