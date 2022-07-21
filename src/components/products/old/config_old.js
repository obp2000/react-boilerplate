import createDecorator from 'final-form-submit-listener'
import ProductFormRender from './ProductFormRender'
import {validate} from './Validators'
import {calculator} from './Calculator'
import {
    getProducts,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} from './apiSlice'
import {
  densityForCount,
  metersInRoll,
  prices
} from './Calculator'
import ObjectsTableRow from './ObjectsTableRow'

const indexUrl = '/products/'

const redirectUrl = '/products/'

const searchUrl = indexUrl

const calculatedFields = [
  'density_for_count',
  'meters_in_roll',
  'prices',
]

const deleteValues = [
  'new_image',
  'product_type',
  'product_type_options',
  'get_product_type_display',
  'threads_options',
  'get_threads_display',
  'contents_options',
  'get_contents_display',
  'prices',
  'density_for_count',
  'meters_in_roll',
  'created_at',
  'updated_at',
  'PriceCoeffs',
]

const preSubmitAction = (values) => {
  if (values.new_image) {
    values.image = values.new_image
  } else {
    delete values.image
  }
  if (values.product_type) {
    values.product_type_id = values.product_type
  }
  deleteValues.map((deleteValue) => {
    delete values[deleteValue]
  })
  values.toFormData = true
}

const tableFieldNames = [
  'id',
  'name',
  'price',
  'width',
  'density',
  'created_at',
  'updated_at',
]

const emptyObject = {}

const formInitialValues = (
  object,
  {Consts} = emptyObject
) => ({
  ...object,
  ...Consts,
  density_for_count: densityForCount(null, object),
  meters_in_roll: metersInRoll(null, object),
  prices: prices(null, {...object, PriceCoeffs: Consts?.PriceCoeffs})
})

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    preSubmitAction(form.getState().values)
  },
})

const dropdownListTextField = ({
  get_product_type_display: getProductTypeDisplay,
  get_threads_display: getThreadsDisplay,
  get_contents_display: getContentsDisplay,
  name,
}) => [getProductTypeDisplay, getThreadsDisplay, getContentsDisplay, name]

const config = {
  indexUrl,
  redirectUrl,
  decorators: [calculator, submitListener],
  searchUrl,
  tableFieldNames,
  ObjectsTableRow,
  ObjectFormRender: ProductFormRender,
  validate,
  formInitialValues,
  getObjects: getProducts,
  useGetObjectQuery: useGetProductQuery,
  useCreateObjectMutation: useCreateProductMutation,
  useUpdateObjectMutation: useUpdateProductMutation,
  useDeleteObjectMutation: useDeleteProductMutation,
  dropdownListTextField,
  calculatedFields,
}

export default config
