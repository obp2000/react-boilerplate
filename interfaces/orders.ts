import type { Decorator, Mutator } from 'final-form'
import type { IndexUrl, OrderWithOptions } from './index'
import {
  getOrders,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '../src/components/orders/apiSlice'
import TableRow from '../src/components/orders/TableRow'
import TableLabels from '../src/components/orders/TableLabels'
import { validate } from '../src/components/orders/validators'
import objectFormRender from '../src/components/orders/OrderFormRender'

export type TableConfig = IndexUrl & {
  getObjects: typeof getOrders
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteOrderMutation
}

export type FormConfig = IndexUrl & {
  useGetObjectQuery: typeof useGetOrderQuery
  formInitialValues: OrderWithOptions
  formDecorators: Decorator[]
  mutators: { [index: string]: Mutator }
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateOrderMutation
  useCreateObjectMutation: typeof useCreateOrderMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: string[]
}
