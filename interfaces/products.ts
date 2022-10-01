import type { Decorator } from 'final-form'
import type { IndexUrl, ProductWithOptions } from './index'
import {
  getProducts,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../src/components/products/apiSlice'
import TableRow from '../src/components/products/TableRow'
import TableLabels from '../src/components/products/TableLabels'
import { validate } from '../src/components/products/validators'
import objectFormRender from '../src/components/products/ProductFormRender'

export type TableConfig = IndexUrl & {
  getObjects: typeof getProducts
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteProductMutation
}

export type FormConfig = IndexUrl & {
  useGetObjectQuery: typeof useGetProductQuery
  formInitialValues: ProductWithOptions
  formDecorators: Decorator[]
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateProductMutation
  useCreateObjectMutation: typeof useCreateProductMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: string[]
}
