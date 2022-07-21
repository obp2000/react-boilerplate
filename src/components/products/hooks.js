import React from 'react'
import createDecorator from 'final-form-submit-listener'
import {
    getProducts as getObjects,
    // useGetCustomerQuery,
    // useLazyGetCustomerQuery,
    useCreateProductMutation as useCreateObjectMutation,
    useUpdateProductMutation as useUpdateObjectMutation,
    useDeleteProductMutation as useDeleteObjectMutation,
} from './apiSlice'
import {useObjectsData, useObjects} from '../../services/entityAdapter'
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

const emptyObject = {}

const indexUrl = '/products/'

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
} = emptyObject) => [
    id,
    <ProductName {...restObject} />,
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
	    ...tableProps
  	}
}

export const calculatedFields = [
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

export const useProductForm = (object) => {
	const decorators = [calculator, submitListener]
	const mutators = emptyObject
	const formAttrs = useObjectForm({
		indexUrl,
		object,
		formInitialValues,
		validate,
		useUpdateObjectMutation,
		useCreateObjectMutation,
	})
    return {
    	decorators,
    	mutators,
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
    renderValue: ({item}) => <ProductName {...{...item, options}} />
})
