import createDecorator from 'final-form-submit-listener'
import productName from './name'
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

const indexUrl = '/products/'

const redirectUrl = '/products/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
  if (values.new_image) {
    values.image = values.new_image
  } else {
    delete values.image
  }
  delete values.new_image
  if (values.product_type) {
    values.product_type_id = values.product_type
    delete values.product_type
  }
  delete values.product_type_options
  delete values.get_product_type_display
  delete values.threads_options
  delete values.get_threads_display
  delete values.contents_options
  delete values.get_contents_display
  delete values.prices
  delete values.density_for_count
  delete values.meters_in_roll
  delete values.created_at
  delete values.updated_at
  delete values.PriceCoeffs
  values.toFormData = true
  // values = objectToFormData(values)
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

const rowData = ({
  id,
  price,
  width,
  density,
  created_at,
  updated_at,
  ...restObject
},
options) => [
  id,
  productName(restObject, options),
  price,
  width,
  density,
  created_at,
  updated_at,
]

const formInitialValues = (object, {Consts} = {}) =>
  ({...object, ...Consts})

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    // console.log('pre.....')
    preSubmitAction(form.getState().values)
  },
})

const config = {
  indexUrl,
  redirectUrl,
  decorators: [calculator, submitListener],
  searchUrl,
  tableFieldNames,
  rowData,
  ObjectFormRender: ProductFormRender,
  validate,
  formInitialValues,
  getObjects: getProducts,
  useGetObjectQuery: useGetProductQuery,
  useCreateObjectMutation: useCreateProductMutation,
  useUpdateObjectMutation: useUpdateProductMutation,
  useDeleteObjectMutation: useDeleteProductMutation,
}

export default config
