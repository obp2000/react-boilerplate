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
import TableRow from './TableRow'
import TableLabels from './TableLabels'
import type { Product, ProductWithOptions } from '../../../interfaces/products'

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

const formInitialValues = ({ object, options }: ProductWithOptions) => {
  let { image, ...objectMod } = object ?? {}
  let objectValues: Partial<Product> = {
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

const validatedFields = {
  notBlank: ['name', 'price'],
}

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
  validatedFields,
}
