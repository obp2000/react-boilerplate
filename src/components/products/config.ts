import type {
  ProductWithOptions,
  FormInitialValues
} from '../../../interfaces/products'
import {
  getProducts as getObjects,
  getProduct as getObject,
  useCreateProductMutation as useCreateObjectMutation,
  useDeleteProductMutation as useDeleteObjectMutation,
  useGetProductQuery as useGetObjectQuery,
  useUpdateProductMutation as useUpdateObjectMutation
} from './apiSlice'
import {
  calculator,
  densityForCount,
  metersInRoll,
  prices
} from './calculator'
import objectFormRender from './ProductFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { validate } from './validators'

export const indexUrl = '/products/'

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

export const formInitialValues = ({
  object, options
}: ProductWithOptions): FormInitialValues | {} => {
  let { image: imageOrig, ...objectMod } = object ?? {}
  let objectValues = {
    imageOrig,
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
  getObject,
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
