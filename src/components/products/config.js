import React from 'react'
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
import ProductName from './ProductName'
import {
  densityForCount,
  metersInRoll,
  prices
} from './Calculator'

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
}) => [
  id,
  <ProductName {...restObject} />,
  price,
  width,
  density,
  created_at,
  updated_at,
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
