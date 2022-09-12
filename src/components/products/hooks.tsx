import createDecorator from 'final-form-submit-listener'
import type { Decorator } from 'final-form'
import type { FormProps } from 'react-final-form'
import {
  getProducts as getObjects,
  useGetProductQuery as useGetObjectQuery,
  useCreateProductMutation as useCreateObjectMutation,
  useUpdateProductMutation as useUpdateObjectMutation,
  useDeleteProductMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './ProductFormRender'
import { validate } from './Validators'
import {
  calculator,
  densityForCount,
  metersInRoll,
  prices,
} from './Calculator'
// import { useObjectsTable } from '../objectsTable/hooks'
import ProductName from './ProductName'
import TableRow from './tableRow'
import TableLabels from './tableLabels'
import {
  Product,
  ProductFormValues,
  ProductOptions
} from '../../../interfaces'

export const initFormValues: ProductFormValues = {
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

export const indexUrl = '/products/'

export type ProductsTableConfig = {
  indexUrl: string
  getObjects: typeof getObjects
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteObjectMutation
}

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

const deleteValues = [
  'get_product_type_display',
  'get_threads_display',
  'get_contents_display',
  'created_at',
  'updated_at',
  'consts',
  ...calculatedFields
]

const preSubmitAction = (values: ProductFormValues): void => {
  if (values.new_image) {
    values.image = values.new_image
    delete values.new_image
  } else {
    delete values.image
  }
  if (values.product_type) {
    values.product_type_id = values.product_type
    delete values.product_type
  }
  deleteValues.map((deleteValue) => {
    delete values[deleteValue as keyof ProductFormValues]
  })
  values.toFormData = true
}

type ProductWithOptions = {
  object?: Product
  options?: ProductOptions
}

const formInitialValues = ({
  object,
  options
}: ProductWithOptions): ProductFormValues => {
  let objectValues: ProductFormValues = {
    ...object,
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

const submitListener: Decorator = createDecorator({
  beforeSubmit: (form: FormProps) => {
    preSubmitAction(form.getState().values)
  },
})

const formDecorators = (options: ProductOptions): Decorator[] =>
  [calculator(options), submitListener]

const mutators = {}

export type ProductFormConfig = {
  indexUrl: string
  useGetObjectQuery: typeof useGetObjectQuery
  formInitialValues: typeof formInitialValues
  formDecorators: typeof formDecorators
  mutators: typeof mutators
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateObjectMutation
  useCreateObjectMutation: typeof useCreateObjectMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: typeof calculatedFields
}

export const objectFormConfig: ProductFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  mutators,
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
}: Product) => [getProductTypeDisplay, getThreadsDisplay, getContentsDisplay, name]

export const useDropdown = (options: ProductOptions) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({ item }: { item: Product }) =>
    <ProductName object={item} options={options} />,
})
