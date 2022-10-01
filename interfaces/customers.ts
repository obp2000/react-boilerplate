import type { IndexUrl, CustomerWithOptions } from './index'
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
