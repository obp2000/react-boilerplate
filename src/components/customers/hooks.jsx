import React from 'react'
import createDecorator from 'final-form-submit-listener'
import {useOutletContext} from 'react-router-dom'
import {
    getCustomers as getObjects,
    useCreateCustomerMutation as useCreateObjectMutation,
    useUpdateCustomerMutation as useUpdateObjectMutation,
    useDeleteCustomerMutation as useDeleteObjectMutation,
} from './apiSlice'
import {useObjectsData, useObjects} from '../../services/entityAdapter'
import ObjectFormRender from './CustomerFormRender'
import {validate} from './Validators'
import {useObjectsTable} from '../objectsTable/hooks'
import {useObjectForm} from '../objectForm/hooks'
import CustomerName from './CustomerName'
import {useDropdown as useCityDropdownAttrs} from '../cities/hooks'
import CityName from '../cities/CityName'
import ShortName from './ShortName'

const emptyObject = {}

const indexUrl = '/customers/'

export const customerCityOptions = ({
    city: {
        children
    } = emptyObject
} = emptyObject) => children

export const useCustomerCityOptions = () => {
    const {options} = useOutletContext()
    return customerCityOptions(options)
}

export const useCityDropdown = () => {
    const options = useCustomerCityOptions()
    return useCityDropdownAttrs(options)
}

const tableFieldNames = [
    'id',
    'name',
    'city',
    'address',
    'created_at',
]

const useTableFieldValues = ({
    id,
    city,
    address,
    created_at,
    ...restObject
} = emptyObject) => {
    const options = useCustomerCityOptions()
    return [
        id,
        <ShortName {...restObject} />,
        <CityName {...{...city, options}} />,
        address,
        created_at,
    ]
}

export const useCustomersTable = () => {
	const tableProps = useObjectsTable({indexUrl, getObjects})
  	return {
  		indexUrl,
	    tableFieldNames,
	   	useDeleteObjectMutation,
	    useTableFieldValues,
	    ...tableProps
  	}
}

const deleteValues = [
    'city',
    'options',
    'created_at',
    'updated_at',
]

const preSubmitAction = (values) => {
    if (values.city) {
        values.city_id = values.city.id
    }
    deleteValues.map((deleteValue) => {
        delete values[deleteValue]
    })
}

const submitListener = createDecorator({
    beforeSubmit: (form) => {
        preSubmitAction(form.getState().values)
    },
})

const formInitialValues = (object) => object

export const useCustomerForm = (object) => {
	const decorators = [submitListener]
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
    nick,
    name,
    city: {
        pindex,
        city,
    } = {},
    address
}) => [nick, name, pindex, city, address]

export const useDropdown = (options) => ({
              textField: dropdownListTextField,
              dataKey: 'id',
              searchPath: indexUrl,
              renderValue: ({item}) => <CustomerName {...{...item, options}} />
            })



