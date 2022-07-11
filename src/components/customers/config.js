import React from 'react'
import createDecorator from 'final-form-submit-listener'
import CustomerFormRender from './CustomerFormRender'
import { validate } from './Validators'
import {
    getCustomers,
    useGetCustomerQuery,
    useLazyGetCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} from './apiSlice'
import CityName from './CityName'
import ShortName from './ShortName'

const emptyObject = {}

const indexUrl = '/customers/'

const redirectUrl = '/customers/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
    if (values.city) {
        values.city_id = values.city.id
        delete values.city
    }
    delete values.options
    delete values.created_at
    delete values.updated_at
}

const tableFieldNames = [
    'id',
    'name',
    'city',
    'address',
    'created_at',
]

const rowData = ({
    id,
    city,
    address,
    created_at,
    ...restObject
} = emptyObject) => [
    id,
    <ShortName {...restObject} />,
    <CityName {...city} />,
    address,
    created_at,
]

const formInitialValues = (object) => object

const submitListener = createDecorator({
    beforeSubmit: (form) => {
        // console.log('pre.....')
        preSubmitAction(form.getState().values)
    },
})

const config = {
    indexUrl,
    redirectUrl,
    decorators: [submitListener],
    searchUrl,
    tableFieldNames,
    rowData,
    ObjectFormRender: CustomerFormRender,
    validate,
    formInitialValues,
    getObjects: getCustomers,
    useGetObjectQuery: useGetCustomerQuery,
    useLazyGetObjectQuery: useLazyGetCustomerQuery,
    useCreateObjectMutation: useCreateCustomerMutation,
    useUpdateObjectMutation: useUpdateCustomerMutation,
    useDeleteObjectMutation: useDeleteCustomerMutation,
}

export default config
