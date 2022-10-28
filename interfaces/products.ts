import type { Decorator } from 'final-form'
import {
  getProducts,
  getProduct,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation
} from '../components/products/apiSlice'
import { useFormInitialValues } from '../components/products/hooks'
import objectFormRender from '../components/products/ProductFormRender'
import TableLabels from '../components/products/TableLabels'
import TableRow from '../components/products/TableRow'
import type { FieldLabel } from './inputLabel'
import type { FieldProps } from './options'

export type ProductConsts = {
  PriceCoeffs: number[]
}

export type Product = {
  id: number
  name: string
  product_type: number
  product_type_id?: number
  get_product_type_display: string
  threads: number
  get_threads_display: string
  contents: number
  get_contents_display: string
  fleece: boolean
  price: number
  weight: number
  width: number
  density: number
  dollar_price: number
  dollar_rate: number
  width_shop: number
  density_shop: number
  weight_for_count: number
  length_for_count: number
  price_pre: number
  image: string
  created_at: string
  updated_at: string
  density_for_count?: number | string
  meters_in_roll?: number | string
  prices?: string
  toFormData?: boolean
  consts?: ProductConsts
  imageOrig?: string
}

export type ProductTypeChoice = {
  id: number
  name: string
}

export type ThreadsChoice = {
  value?: number
  display_name: string
}

export type ContentsChoice = {
  value?: number
  display_name: string
}

export type ProductOptions = {
  id: FieldProps
  name: FieldProps
  product_type: {
    label: string
    choices: ProductTypeChoice[]
  }
  get_product_type_display: FieldProps
  threads: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: ThreadsChoice[]
  }
  get_threads_display: FieldProps
  contents: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: ContentsChoice[]
  }
  get_contents_display: FieldProps
  fleece: FieldProps
  price: FieldProps
  weight: FieldProps
  width: FieldProps
  density: FieldProps
  dollar_price: FieldProps
  dollar_rate: FieldProps
  width_shop: FieldProps
  density_shop: FieldProps
  weight_for_count: FieldProps
  length_for_count: FieldProps
  price_pre: FieldProps
  image: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
  prices: FieldLabel
  density_for_count: FieldLabel
  meters_in_roll: FieldLabel
  Consts: ProductConsts
}

export type ProductOptionsType = {
  options?: ProductOptions
}

export type ProductType = {
  object?: Product
}

export type ProductWithOptions = ProductType & ProductOptionsType

export type TableConfig = {
  getObjects: typeof getProducts
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteProductMutation
}

export type FormConfig = {
  getObject: typeof getProduct
  useGetObjectQuery: typeof useGetProductQuery
  useFormInitialValues: typeof useFormInitialValues
  formDecorators: Decorator[]
  useUpdateObjectMutation: typeof useUpdateProductMutation
  useCreateObjectMutation: typeof useCreateProductMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: string[]
}

export type FormInitialValues = Omit<Product, 'image'> & {
  imageOrig: string
}

export type ProductFormValues = FormInitialValues | {}
