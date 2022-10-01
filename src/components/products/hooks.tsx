import React from 'react'
import {
  getProducts as getObjects,
  useGetProductQuery as useGetObjectQuery,
  useCreateProductMutation as useCreateObjectMutation,
  useUpdateProductMutation as useUpdateObjectMutation,
  useDeleteProductMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './ProductFormRender'
import { validate } from './validators'
import {
  calculator,
  densityForCount,
  metersInRoll,
  prices,
} from './calculator'
import ProductName from './ProductName'
import TableRow from './TableRow'
import TableLabels from './TableLabels'
import type {
  Product,
  ProductFormValues,
  ProductOptions,
  ProductWithOptions,
} from '../../../interfaces'

export const indexUrl = '/products/'

export const objectsTableConfig = {
  indexUrl,
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

export const initFormValues = {
  id: undefined,
  name: undefined,
  product_type: undefined,
  threads: undefined,
  contents: undefined,
  fleece: undefined,
  price: undefined,
  weight: undefined,
  width: undefined,
  density: undefined,
  dollar_price: undefined,
  dollar_rate: undefined,
  width_shop: undefined,
  density_shop: undefined,
  weight_for_count: undefined,
  length_for_count: undefined,
  price_pre: undefined,
  image: undefined,
  density_for_count: undefined,
  meters_in_roll: undefined,
  prices: undefined,
  consts: undefined,
}

const formInitialValues = ({ object, options }: ProductWithOptions) => {
  let { image, ...objectMod } = object ?? {}
  let objectValues: ProductFormValues = {
    ...objectMod,
    consts: options?.Consts,
  }
  objectValues = {
    ...objectValues,
    density_for_count: densityForCount(null, objectValues),
    meters_in_roll: metersInRoll(null, objectValues),
    prices: prices(null, objectValues),
  }
  return objectValues
}

// const formDecorators = (options: ProductOptions): Decorator[] =>
//   [calculator(options)]

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators: [calculator],
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
}

const dropdownListTextField = ({
  get_product_type_display: getProductTypeDisplay,
  get_threads_display: getThreadsDisplay,
  get_contents_display: getContentsDisplay,
  name,
}: Product) => [
    getProductTypeDisplay,
    getThreadsDisplay,
    getContentsDisplay,
    name]

export const useDropdown = (options: ProductOptions | undefined) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({ item }: { item: Product }) =>
    <ProductName object={item} options={options} />,
})



// const deleteValues = [
//   'get_product_type_display',
//   'get_threads_display',
//   'get_contents_display',
//   'created_at',
//   'updated_at',
//   'consts',
//   ...calculatedFields
// ]
