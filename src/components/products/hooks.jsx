import React, {useMemo} from 'react'
import createDecorator from 'final-form-submit-listener'
import {
  getProducts as getObjects,
  useGetProductQuery as useGetObjectQuery,
  useCreateProductMutation as useCreateObjectMutation,
  useUpdateProductMutation as useUpdateObjectMutation,
  useDeleteProductMutation as useDeleteObjectMutation,
} from './apiSlice'
import ObjectFormRender from './ProductFormRender'
import {validate} from './Validators'
import {
  calculator,
  densityForCount,
  metersInRoll,
  prices,
} from './Calculator'
import {useObjectsTable} from '../objectsTable/hooks'
import {useObjectForm} from '../objectForm/hooks'
import ProductName from './ProductName'
import blank from '../../assets/img/blank.png'

const emptyObject = {}

export const indexUrl = '/products/'

export const useFleece = ({
  fleece,
  options,
}) => ({
  fleece,
  label: options?.fleece?.label.toLowerCase(),
})

export const useProductName = ({
  get_product_type_display: getProductTypeDisplay,
  threads,
  get_threads_display: getThreadsDisplay,
  contents,
  get_contents_display: getContentsDisplay,
  name,
  options,
  ...product
}) => ({
  productType: getProductTypeDisplay ? getProductTypeDisplay + ' ' : '',
  threads: threads === null ? '' : getThreadsDisplay + ' ',
  contents: contents === null ? '' : getContentsDisplay + ' ',
  fleeceProps: {...product, options},
  name,
})

const tableFieldNames = [
  'id',
  'name',
  'price',
 	'width',
  'density',
  'created_at',
  'updated_at',
]

const useTableFieldValues = ({
  id,
  price,
  width,
  density,
  created_at,
  updated_at,
  ...restObject
} = emptyObject,
options
) => [
  id,
  <ProductName {...restObject} options={options} key={id} />,
  price,
  width,
  density,
  created_at,
  updated_at,
]

export const useProductsTable = () => {
  const tableProps = useObjectsTable({indexUrl, getObjects})
  	return {
  		indexUrl,
	    tableFieldNames,
	   	useDeleteObjectMutation,
	    useTableFieldValues,
	    ...tableProps,
  	}
}

export const calculatedFields = [
  'density_for_count',
  'meters_in_roll',
  'prices',
]

const deleteValues = calculatedFields

const preSubmitAction = (values) => {
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
    delete values[deleteValue]
  })
  values.toFormData = true
}

const formInitialValues = ({
  get_product_type_display,
  get_threads_display,
  get_contents_display,
  created_at,
  updated_at,
  ...rest
} = emptyObject,
{Consts} = emptyObject
) => {
  return {
    ...rest,
    density_for_count: densityForCount(null, rest),
    meters_in_roll: metersInRoll(null, rest),
    prices: prices(null, {...rest, ...Consts}),
  }
}

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    preSubmitAction(form.getState().values)
  },
})

const formDecorators = (options) => [calculator(options), submitListener]

export const useProductForm = () => {
  const mutators = emptyObject
  const formAttrs = useObjectForm({
    indexUrl,
    useGetObjectQuery,
    formInitialValues,
    formDecorators,
    validate,
    useUpdateObjectMutation,
    useCreateObjectMutation,
  })
  return {
    	mutators,
    calculatedFields,
    	render: ObjectFormRender,
    	...formAttrs,
  }
}

const dropdownListTextField = ({
  get_product_type_display: getProductTypeDisplay,
  get_threads_display: getThreadsDisplay,
  get_contents_display: getContentsDisplay,
  name,
}) => [getProductTypeDisplay, getThreadsDisplay, getContentsDisplay, name]

export const useDropdown = (options) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({item}) => <ProductName {...item} options={options} />,
})

export const useProductImage = ({
  initialValues: {
    image = String(blank),
  },
  options,
} = emptyObject) => {
  return {
    image,
    label: options?.image.label,
  }
}
