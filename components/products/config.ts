import {
  getProduct as getObject,
  getProducts as getObjects,
  useCreateProductMutation as useCreateObjectMutation,
  useDeleteProductMutation as useDeleteObjectMutation,
  useGetProductQuery as useGetObjectQuery,
  useUpdateProductMutation as useUpdateObjectMutation
} from './apiSlice'
import { calculator } from './calculator'
import { useFormInitialValues } from './hooks'
import objectFormRender from './ProductFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'

export const objectsTableConfig = {
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const calculatedFields = [
  'density_for_count',
  'meters_in_roll',
  'prices',
]

const validatedFields = {
  notBlank: ['name', 'price'],
}

export const objectFormConfig = {
  getObject,
  useGetObjectQuery,
  useFormInitialValues,
  formDecorators: [calculator],
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
  validatedFields,
}



// const formDecorators = (options: ProductOptions): Decorator[] =>
//   [calculator(options)]
