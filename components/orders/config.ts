import arrayMutators from 'final-form-arrays'
import {
  getOrder as getObject,
  getOrders as getObjects,
  useCreateOrderMutation as useCreateObjectMutation,
  useDeleteOrderMutation as useDeleteObjectMutation,
  useGetOrderQuery as useGetObjectQuery,
  useUpdateOrderMutation as useUpdateObjectMutation
} from './apiSlice'
import { calculator, postCostCount } from './calculator'
import { useFormInitialValues } from './hooks'
import objectFormRender from './OrderFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'

export const objectsTableConfig = {
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const calculatedFields = [
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

const validatedFields = {
  notBlank: ['customer'],
}

export const objectFormConfig = {
  getObject,
  useGetObjectQuery,
  useFormInitialValues,
  formDecorators: [calculator],
  mutators: { postCostCount, ...arrayMutators },
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
  validatedFields,
}
