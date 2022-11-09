import { calculator } from './calculator'
import { useFormInitialValues } from './hooks'
import objectFormRender from './ProductFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import type { Product } from '@/interfaces/products'

export const objectsTableConfig = {
  TableRow,
  TableLabels,
}

export const calculatedFields = [
  'density_for_count',
  'meters_in_roll',
  'prices',
]

const validatedFields = {
  notBlank: ['name', 'price'],
}

export const modFormValues = ({
  id,
  product_type,
  get_product_type_display,
  get_threads_display,
  get_contents_display,
  created_at,
  updated_at,
  consts,
  density_for_count,
  meters_in_roll,
  prices,
  imageOrig,
  ...values
}: Product): Partial<Product> => {
  if (product_type) {
    values.product_type_id = product_type
  }
  return values
}

export const objectFormConfig = {
  useFormInitialValues,
  formDecorators: [calculator],
  objectFormRender,
  validatedFields,
  modFormValues,
}


// const formDecorators = (options: ProductOptions): Decorator[] =>
//   [calculator(options)]
