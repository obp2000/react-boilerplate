import {
    getCustomer as getObject,
    getCustomers as getObjects,
    useCreateCustomerMutation as useCreateObjectMutation,
    useDeleteCustomerMutation as useDeleteObjectMutation,
    useGetCustomerQuery as useGetObjectQuery,
    useUpdateCustomerMutation as useUpdateObjectMutation
} from './apiSlice'
import objectFormRender from './CustomerFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { useFormInitialValues } from './hooks'

export const objectsTableConfig = {
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

const validatedFields = {
  notBlank: ['nick'],
}

export const objectFormConfig = {
  getObject,
  useGetObjectQuery,
  useFormInitialValues,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  validatedFields,
}
